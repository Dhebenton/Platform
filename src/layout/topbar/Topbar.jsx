import AnalyticsTabs from './tabs/AnalyticsTabs'
import './Topbar.css'

export default function Topbar({}) {
     return (
          <header className="f-col g18">
               <p className="heading-regular tblack weight-semibold">Analytics</p>
               <div className="tabs-wrap f-row">
                    <AnalyticsTabs />
               </div>
          </header>
     )
}