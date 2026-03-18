import './AnalyticsOverviewMetrics.css'
import AnalyticsChart from './MainChart'
import { AnalyticsOverviewChartTab } from './MetricsTabs'

export default function AnalyticsOverviewMetrics({}) {
     return (
          <div className='analytics-overview-metrics-wrap padding-bottom-64 f-col a-c g36 full-width'>
               <div className='metrics-tabs-wrap f-row small-padding-horizontal j-s-b'>
                    <AnalyticsOverviewChartTab metric={'visitors'}/>
                    <AnalyticsOverviewChartTab metric={'views'}/>
                    <AnalyticsOverviewChartTab metric={'duration'}/>
                    <AnalyticsOverviewChartTab metric={'bounce-rate'}/>
                    <AnalyticsOverviewChartTab metric={'event-count'}/>
                    <AnalyticsOverviewChartTab metric={'organic-traffic'}/>
               </div>
               <AnalyticsChart />
          </div>
     )
}