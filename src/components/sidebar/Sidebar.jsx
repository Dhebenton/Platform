import { useState } from 'react'
import { CloseNav } from '../../assets/Icons'
import AccountDropdown from './account-dropdown/AccountDropdown'
import './Sidebar.css'
import Tabs from './tabs/Tabs'

export default function Sidebar({}) {
     
     const [ navClosed, setNavClosed ] = useState(false)
     const [ navAnimation, setNavAnimation ] = useState(false)

     function ToggleAnimation() {
          setNavAnimation(true)
          setTimeout(() => setNavAnimation(false), 350) 
          setNavClosed(prev => !prev)
     }

     return (
          <nav className={`f-col g5 ${navClosed ? 'closed' : ''} ${navAnimation ? 'animation' : ''}`}>
               <Tabs />
               <div className="margin-top-auto g5 f-col">
                    <button onClick={ToggleAnimation} className="tab close-nav">
                         <CloseNav />
                    </button>
                    <AccountDropdown />
               </div>
          </nav>
     )
}