import './Sidebar.css'
import './tabs/Tabs.css'
import SiteTabs from './tabs/SiteTabs'

export default function Sidebar({}) {
     return (
          <nav className="f-col g6">
               <SiteTabs />
          </nav>
     )
}