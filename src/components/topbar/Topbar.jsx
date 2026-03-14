import AnalyticsTabs from './tabs/AnalyticsTabs'
import './Topbar.css'

export default function Topbar({}) {
     return (
          <header className="f-col g28">
               <h1 className="font17 w680">Analytics</h1>
               <div className="topbar-tabs-wrap analytics overview f-row be-rel">
                    <AnalyticsTabs />
               </div>
          </header>
     )
}