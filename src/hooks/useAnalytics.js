import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API = 'https://backend.hypeify.io'

export function useAnalytics(period = '30d', metric = 'page_views') {
  const { siteId } = useParams()
  const resolvedSiteId = siteId ?? 'bear-essentials'

  const [stats, setStats] = useState(null)
  const [timeseries, setTimeseries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch stats (all metrics) — only on mount / period change
  useEffect(() => {
    if (!resolvedSiteId) return
    setLoading(true)
    setError(null)

    fetch(`${API}/stats/${resolvedSiteId}?period=${period}`)
      .then(r => r.json())
      .then(data => setStats(data.metrics))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [resolvedSiteId, period])

  // Fetch timeseries separately — refetches when metric changes
  useEffect(() => {
    if (!resolvedSiteId) return

    fetch(`${API}/stats/${resolvedSiteId}/timeseries?metric=${metric}&period=${period}`)
      .then(r => r.json())
      .then(data => setTimeseries(data.data ?? []))
      .catch(() => setTimeseries([]))
  }, [resolvedSiteId, period, metric])

  return { stats, timeseries, loading, error, siteId: resolvedSiteId }
}