import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API = 'https://backend.hypeify.io'
const TTL = 15 * 60 * 1000 // 15 minutes

const cache = {}

function getCached(key) {
  const entry = cache[key]
  if (!entry) return null
  if (Date.now() - entry.timestamp > TTL) return null
  return entry.data
}

function setCached(key, data) {
  cache[key] = { data, timestamp: Date.now() }
}

export function useAnalytics(period = '30d', metric = 'page_views') {
  const { siteId } = useParams()
  const resolvedSiteId = siteId ?? 'bear-essentials'

  const [stats, setStats] = useState(null)
  const [timeseries, setTimeseries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!resolvedSiteId) return
    const key = `stats:${resolvedSiteId}:${period}`
    const cached = getCached(key)
    if (cached) {
      setStats(cached)
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    fetch(`${API}/stats/${resolvedSiteId}?period=${period}`)
      .then(r => r.json())
      .then(data => {
        setCached(key, data.metrics)
        setStats(data.metrics)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [resolvedSiteId, period])

  useEffect(() => {
    if (!resolvedSiteId) return
    const key = `timeseries:${resolvedSiteId}:${period}:${metric}`
    const cached = getCached(key)
    if (cached) {
      setTimeseries(cached)
      return
    }
    fetch(`${API}/stats/${resolvedSiteId}/timeseries?metric=${metric}&period=${period}`)
      .then(r => r.json())
      .then(data => {
        setCached(key, data.data ?? [])
        setTimeseries(data.data ?? [])
      })
      .catch(() => setTimeseries([]))
  }, [resolvedSiteId, period, metric])

  return { stats, timeseries, loading, error, siteId: resolvedSiteId }
}

export function usePages(period = '30d') {
  const { siteId } = useParams()
  const resolvedSiteId = siteId ?? 'bear-essentials'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const key = `pages:${resolvedSiteId}:${period}`
    const cached = getCached(key)
    if (cached) {
      setData(cached)
      setLoading(false)
      return
    }
    setLoading(true)
    fetch(`${API}/stats/${resolvedSiteId}/pages?period=${period}`)
      .then(r => r.json())
      .then(d => {
        setCached(key, d.data ?? [])
        setData(d.data ?? [])
      })
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
    const key = `sources:${resolvedSiteId}:${period}`
    const cached = getCached(key)
    if (cached) {
      setData(cached)
      setLoading(false)
      return
    }
    setLoading(true)
    fetch(`${API}/stats/${resolvedSiteId}/sources?period=${period}`)
      .then(r => r.json())
      .then(d => {
        setCached(key, d.data ?? [])
        setData(d.data ?? [])
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [resolvedSiteId, period])

  return { data, loading }
}