import SiteTabs from "./tabs/SiteTabs";
import './Sidebar.css'
import './tabs/Tabs.css'
import { useState } from "react";

export default function Sidebar({}) {
     const [ sideBarClosed, setSidebarClosed ] = useState(false)
     const [ sidebarAnimation, setSidebarAnimation ] = useState(false)

     function ToggleSidebar() {
          setSidebarAnimation(true)
          setSidebarClosed(prev => !prev)
          setTimeout(() => setSidebarAnimation(false), 500)
     }

     return (
          <nav className={`f-col g5 ${sideBarClosed ? 'closed' : ''} ${sidebarAnimation ? 'animation' : ''}`}>
               <SiteTabs ToggleSidebar={ToggleSidebar}/>
          </nav>
     )
}