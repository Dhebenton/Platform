import { useState, useEffect, useRef } from 'react'
import { ArrChevronowIcon, BookIcon, LogoutIcon, UserIcon } from '../../../assets/Icons'
import './AccountDropdown.css'
import Placeholder from './placeholder.png'

export default function AccountDropdown({}) {
     const [ dropdownOpen, setDropdownOpen ] = useState(false)
     const [ dropdownAnimation, setDropdownAnimation ] = useState(true)
     const dropdownRef = useRef(null)

     function toggleDropdown() {
          if (dropdownOpen) {
               closeDropdown()
          } else {
               setDropdownOpen(true)
               setTimeout(() => setDropdownAnimation(false), 1)
          }
     }

     function closeDropdown() {
          setDropdownAnimation(true)
          setTimeout(() => setDropdownOpen(false), 280)
     }

     useEffect(() => {
          function handleClickOutside(e) {
               if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                    closeDropdown()
               }
          }

          document.addEventListener('mousedown', handleClickOutside)
          return () => document.removeEventListener('mousedown', handleClickOutside)
     }, [dropdownOpen])

     return (
          <div ref={dropdownRef} className={`dropdown-wrap account f-col ${dropdownAnimation ? '' : 'animate'}`}>
               <button onClick={toggleDropdown} className="tab b-xs-regular from-up f-row g8 account dropdown-toggle">
                    <img src={Placeholder} />
                    <p className='tra'>Daniil Hebenton</p>
                    <ArrChevronowIcon />
               </button>
               { dropdownOpen && (
                    <div className="dropdown tra f-col account">
                         <button className="tab small g8 b-xs-regular">
                              <UserIcon />
                              <p>Account Settings</p>
                         </button>
                         <button className="tab small g8 b-xs-regular">
                              <BookIcon />
                              <p>Getting Started</p>
                         </button>
                         <div className="seperator"></div>
                         <button className="tab log-out small g8 b-xs-regular">
                              <LogoutIcon />
                              <p>Log Out</p>
                         </button>
                    </div>
               )}
          </div>
     )
}