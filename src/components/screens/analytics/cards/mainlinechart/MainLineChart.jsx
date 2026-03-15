import { useState } from 'react'
import LineChart from './Chart'
import './MainLineChart.css'
import { useAnalytics } from '../../../../../hooks/useAnalytics'
import {
  BounceRateTab,
  EventCountTab,
  OrganisTrafficTab,
  PageViewsTab,
  SessionDurationTab,
  UniqueVisitorsTab
} from './metric-tab/MetricTab'

const METRIC_MAP = {
  unique_visitors:  { query: 'unique_visitors',  isPercent: false },
  page_views:       { query: 'page_views',        isPercent: false },
  session_duration: { query: 'page_views',        isPercent: false },
  bounce_rate:      { query: 'bounce_rate',       isPercent: true  },
  event_count:      { query: 'page_views',        isPercent: false },
  organic_traffic:  { query: 'organic_traffic',   isPercent: false },
}

export default function MainChartLine() {
  const [activeMetric, setActiveMetric] = useState('unique_visitors')
  const { query, isPercent } = METRIC_MAP[activeMetric]
  const { stats, timeseries, loading } = useAnalytics('30d', query)

  return (
    <div className="card main-line-chart-card f-col g36">
      <div className="f-row main-line-chart-tab-wrap">
        <UniqueVisitorsTab
          active={activeMetric === 'unique_visitors'}
          onClick={() => setActiveMetric('unique_visitors')}
          loading={loading}
          value={stats?.unique_visitors.value}
          delta={stats?.unique_visitors.delta}
        />
        <div className="seperator"></div>
        <PageViewsTab
          active={activeMetric === 'page_views'}
          onClick={() => setActiveMetric('page_views')}
          loading={loading}
          value={stats?.page_views.value}
          delta={stats?.page_views.delta}
        />
        <div className="seperator"></div>
        <SessionDurationTab
          active={activeMetric === 'session_duration'}
          onClick={() => setActiveMetric('session_duration')}
          loading={loading}
          value={stats?.session_duration.value}
          delta={stats?.session_duration.delta}
        />
        <div className="seperator"></div>
        <BounceRateTab
          active={activeMetric === 'bounce_rate'}
          onClick={() => setActiveMetric('bounce_rate')}
          loading={loading}
          value={stats?.bounce_rate.value}
          delta={stats?.bounce_rate.delta}
        />
        <div className="seperator"></div>
        <EventCountTab
          active={activeMetric === 'event_count'}
          onClick={() => setActiveMetric('event_count')}
          loading={loading}
          value={stats?.event_count.value}
          delta={stats?.event_count.delta}
        />
        <div className="seperator"></div>
        <OrganisTrafficTab
          active={activeMetric === 'organic_traffic'}
          onClick={() => setActiveMetric('organic_traffic')}
          loading={loading}
          value={stats?.organic_traffic.value}
          delta={stats?.organic_traffic.delta}
        />
      </div>
      <LineChart data={timeseries} loading={loading} isPercent={isPercent} />
    </div>
  )
}