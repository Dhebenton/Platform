const METRIC_CONFIG = {
  'visitors': {
    label: 'Visitors',
    value: '61,905',
    delta: '+12%',
    deltaPositive: true
  },
  'views': {
    label: 'Views',
    value: '143,220',
    delta: '+12%',
    deltaPositive: true
  },
  'duration': {
    label: 'Avg Duration',
    value: '2m 47s',
    delta: '+12%',
    deltaPositive: true
  },
  'bounce-rate': {
    label: 'Bounce Rate',
    value: '38.4%',
    delta: '+12%',
    deltaPositive: false // inverse metric
  },
  'event-count': {
    label: 'Events',
    value: '1,204',
    delta: '+12%',
    deltaPositive: true
  },
  'organic-traffic': {
    label: 'Organic Traffic',
    value: '34,871',
    delta: '+12%',
    deltaPositive: true
  }
}

export const AnalyticsOverviewChartTab = ({ metric }) => {
     const config = METRIC_CONFIG[metric]

     return (
          <button className={`${metric} metrics-tab g11 f-col`}>
               <div className="f-row g10">
                    <p className="label tra text-xsmall weight-medium t500">{config.label}</p>
                    <div className="indicator"></div>
               </div>
               <div className="f-row g8">
                    <h2 className="heading-regular t800 weight-semibold">{config.value}</h2>
                    <p className={`change text-semi-regular weight-medium ${config.deltaPositive ? 'positive' : 'negative'}`}>
                         {config.delta}
                    </p>
               </div>
          </button>
     )
} 