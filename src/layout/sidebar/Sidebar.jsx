import './Sidebar.css'
import './tabs/Tabs.css'
import SiteTabs from './tabs/SiteTabs'
import AccountDropdown from './account-dropdown/AccountDropdown'
import SiteDropdown from './site-dropdown/SiteDropdown'

export default function Sidebar({}) {
     return (
          <nav className="f-col g5">
               <SiteDropdown />
               <SiteTabs />
               <AccountDropdown />
          </nav>
     )
}