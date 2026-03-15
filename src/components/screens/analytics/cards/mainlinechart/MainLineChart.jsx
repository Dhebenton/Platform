import LineChart from './Chart'
import './MainLineChart.css'
import { BounceRateTab, EventCountTab, OrganisTrafficTab, PageViewsTab, SessionDurationTab, UniqueVisitorsTab } from './metric-tab/MetricTab'

export default function MainChartLine({}) {
     return (
          <div className="card main-line-chart-card f-col g36">
               <div className="f-row main-line-chart-tab-wrap">
                    <UniqueVisitorsTab />                    
                    <div className="seperator"></div>
                    <PageViewsTab />
                    <div className="seperator"></div>
                    <SessionDurationTab />
                    <div className="seperator"></div>
                    <BounceRateTab />
                    <div className="seperator"></div>
                    <EventCountTab />
                    <div className="seperator"></div>
                    <OrganisTrafficTab />
               </div>
               <LineChart />
          </div>
     )     
}