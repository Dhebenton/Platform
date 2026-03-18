import { ArrowRight } from '../../../../../assets/Icons'
import './KPICard.css'
import { KPIChart } from './KPIChart'

export default function KPICard({ label, score, title, subheading }) {
     return (
          <button className="card kpi-card flex f-col card-hover g18">
               <div className="f-row j-s-b">
                    <p className="label text-xsmall weight-medium t900">{label}</p>
                    <div className="card-button-tag tra f-row g8">
                         <p>Full Report</p>
                         <ArrowRight />
                    </div>
               </div>
               <div className="f-row g16">
                    <KPIChart score={score}/>
                    <div className="f-col g6">
                         <h2 className='text-semi-regular weight-semibold t800'>{title}</h2>
                         <p className='t500 sub text-small weight-medium line-height-14'>{subheading}</p>
                    </div>
               </div>
          </button>
     )
}