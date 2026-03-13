import AccountDropdown from './account-dropdown/AccountDropdown'
import './Sidebar.css'
import Tabs from './tabs/Tabs'

export default function Sidebar({}) {
     return (
          <nav className="f-col g5">
               <Tabs />
               <div className="margin-top-auto f-col">
                    <AccountDropdown />
               </div>
          </nav>
     )
}