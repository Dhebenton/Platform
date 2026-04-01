import { useState, useCallback, useRef } from 'react'
import { useApp } from '../context/AppContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export function useChat() {
  const app = useApp()
  const session = app?.session

  const [sessionId, setSessionId] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sessionIdRef = useRef(null)
  const sessionRef = useRef(session)
  sessionRef.current = session

  const ensureSession = useCallback(async () => {
    if (sessionIdRef.current) return sessionIdRef.current

    const token = sessionRef.current?.access_token
    const res = await fetch(`${API_URL}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: 'New chat' }),
    })

    if (!res.ok) throw new Error('Failed to create session')
    const data = await res.json()
    sessionIdRef.current = data.id
    setSessionId(data.id)
    return data.id
  }, [])

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || loading) return
    setError(null)
    setLoading(true)

    const assistantId = crypto.randomUUID()

    try {
      const id = await ensureSession()
      const token = sessionRef.current?.access_token

      const res = await fetch(`${API_URL}/sessions/${id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.error('[useChat] response error body:', text)
        throw new Error(`Failed to send message: ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let currentEvent = null

      // Add assistant placeholder
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (line.startsWith('event: ')) {
            currentEvent = line.slice(7).trim()
            continue
          }

          if (line.startsWith('data: ')) {
            const raw = line.slice(6).trim()
            if (!raw) continue

            let parsed
            try {
              parsed = JSON.parse(raw)
            } catch (e) {
              console.warn('[useChat] failed to parse SSE data:', raw)
              continue
            }

            // Handle single-chunk response: { userMessage, assistantMessage }
            if (parsed.assistantMessage) {
              setMessages(prev => prev.map(m =>
                m.id === assistantId
                  ? { ...parsed.assistantMessage, id: assistantId }
                  : m
              ))
              currentEvent = null
              continue
            }

            // Handle streamed SSE events
            if (currentEvent === 'token' || parsed.token !== undefined) {
              setMessages(prev => prev.map(m =>
                m.id === assistantId
                  ? { ...m, content: m.content + parsed.token }
                  : m
              ))
            } else if (currentEvent === 'done' || parsed.role === 'assistant') {
              setMessages(prev => prev.map(m =>
                m.id === assistantId
                  ? { ...parsed, id: assistantId }
                  : m
              ))
            } else if (currentEvent === 'error') {
              console.error('[useChat] server stream error:', parsed)
              setError(parsed.error || 'Stream error')
            }

            currentEvent = null
          }
        }
      }

    } catch (err) {
      console.error('[useChat] sendMessage error:', err)
      setError(err.message)
      setMessages(prev => prev.filter(m => m.id !== assistantId || m.content))
    } finally {
      setLoading(false)
    }
  }, [loading, ensureSession])

  const addUserMessage = useCallback((content) => {
    const msg = { id: crypto.randomUUID(), role: 'user', content }
    setMessages(prev => [...prev, msg])
  }, [])

  return { messages, loading, error, sendMessage, addUserMessage }
}