const METRIC_CONFIG = {
  'visitors':        { label: 'Visitors' },
  'views':           { label: 'Views' },
  'duration':        { label: 'Avg Duration' },
  'bounce-rate':     { label: 'Bounce Rate' },
  'event-count':     { label: 'Events' },
  'organic-traffic': { label: 'Organic Traffic' },
}

function deltaClass(delta, redDelta) {
  if (!delta || delta === '+0%') return 'change neutral'
  if (redDelta) return 'change negative'
  return 'change positive'
}

export const AnalyticsOverviewChartTab = ({ metric, value, delta, loading, active, onClick, redDelta }) => {
  const config = METRIC_CONFIG[metric]

  return (
    <button
      className={`${metric} metrics-tab g11 f-col${active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div className="f-row g10">
        <p className="label tra text-xsmall weight-medium t500">{config.label}</p>
        <div className="indicator"></div>
      </div>
      <div className="f-row g8">
        <h2 className="heading-regular t800 weight-semibold">
          {loading ? '—' : (value ?? '—')}
        </h2>
        <p className={`${deltaClass(delta, redDelta)} text-semi-regular weight-medium`}>
          {loading ? '' : (delta ?? '')}
        </p>
      </div>
    </button>
  )
}