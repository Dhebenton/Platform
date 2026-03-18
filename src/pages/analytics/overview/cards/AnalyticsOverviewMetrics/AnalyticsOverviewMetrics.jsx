import { useState } from 'react'
import './AnalyticsOverviewMetrics.css'
import AnalyticsChart from './MainChart'
import { AnalyticsOverviewChartTab } from './MetricsTabs'
import { useAnalytics } from '../../../../../hooks/useAnalytics'

const METRIC_MAP = {
  visitors:        { query: 'unique_visitors', isPercent: false },
  views:           { query: 'page_views',      isPercent: false },
  duration:        { query: 'page_views',      isPercent: false },
  'bounce-rate':   { query: 'bounce_rate',     isPercent: true  },
  'event-count':   { query: 'page_views',      isPercent: false },
  'organic-traffic': { query: 'organic_traffic', isPercent: false },
}

export default function AnalyticsOverviewMetrics() {
  const [activeMetric, setActiveMetric] = useState('visitors')
  const { query, isPercent } = METRIC_MAP[activeMetric]
  const { stats, timeseries, loading } = useAnalytics('30d', query)

  return (
    <div className='analytics-overview-metrics-wrap padding-bottom-64 f-col a-c g36 full-width'>
      <div className='metrics-tabs-wrap f-row small-padding-horizontal j-s-b'>
        <AnalyticsOverviewChartTab
          metric='visitors'
          active={activeMetric === 'visitors'}
          onClick={() => setActiveMetric('visitors')}
          loading={loading}
          value={stats?.unique_visitors?.value}
          delta={stats?.unique_visitors?.delta}
        />
        <AnalyticsOverviewChartTab
          metric='views'
          active={activeMetric === 'views'}
          onClick={() => setActiveMetric('views')}
          loading={loading}
          value={stats?.page_views?.value}
          delta={stats?.page_views?.delta}
        />
        <AnalyticsOverviewChartTab
          metric='duration'
          active={activeMetric === 'duration'}
          onClick={() => setActiveMetric('duration')}
          loading={loading}
          value={stats?.session_duration?.value}
          delta={stats?.session_duration?.delta}
        />
        <AnalyticsOverviewChartTab
          metric='bounce-rate'
          active={activeMetric === 'bounce-rate'}
          onClick={() => setActiveMetric('bounce-rate')}
          loading={loading}
          value={stats?.bounce_rate?.value}
          delta={stats?.bounce_rate?.delta}
          redDelta
        />
        <AnalyticsOverviewChartTab
          metric='event-count'
          active={activeMetric === 'event-count'}
          onClick={() => setActiveMetric('event-count')}
          loading={loading}
          value={stats?.event_count?.value}
          delta={stats?.event_count?.delta}
        />
        <AnalyticsOverviewChartTab
          metric='organic-traffic'
          active={activeMetric === 'organic-traffic'}
          onClick={() => setActiveMetric('organic-traffic')}
          loading={loading}
          value={stats?.organic_traffic?.value}
          delta={stats?.organic_traffic?.delta}
        />
      </div>
      <AnalyticsChart data={timeseries} loading={loading} isPercent={isPercent} />
    </div>
  )
}