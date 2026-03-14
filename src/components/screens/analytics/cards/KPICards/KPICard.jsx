import './KPICard.css'
import { MetricCharts } from './MetricChart'

export default function KPICard({label, score, heading, subheading }) {
     return (
          <div className="card flex kpi-card f-col g20">
               <p className="label-main font13 w540">{label}</p>
               <div className='f-row g14'>
                    <MetricCharts score={score}/>
                    <div className="f-col g6">
                         <h3 className="font14 w660 heading ln12">{heading}</h3>
                         <p className='font13 twoliner w540 subheading lh14'>{subheading}</p>
                    </div>
               </div>
          </div>
     )
}