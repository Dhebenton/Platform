// hooks/useBarCharts.js
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API = 'https://backend.hypeify.io'

export function usePages(period = '30d') {
  const { siteId } = useParams()
  const resolvedSiteId = siteId ?? 'bear-essentials'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/stats/${resolvedSiteId}/pages?period=${period}`)
      .then(r => r.json())
      .then(d => setData(d.data ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [resolvedSiteId, period])

  return { data, loading }
}

export function useSources(period = '30d') {
  const { siteId } = useParams()
  const resolvedSiteId = siteId ?? 'bear-essentials'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/stats/${resolvedSiteId}/sources?period=${period}`)
      .then(r => r.json())
      .then(d => setData(d.data ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [resolvedSiteId, period])

  return { data, loading }
}ss