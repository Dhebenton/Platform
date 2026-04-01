import { useEffect, useRef } from 'react'
import './Message.css'

export const UserMessage = ({ message }) => {
     const ref = useRef(null)

     useEffect(() => {
          const el = ref.current
          if (!el) return
          el.classList.add('animate')
          const timer = setTimeout(() => el.classList.remove('animate'), 220)
          return () => clearTimeout(timer)
     }, [])

     return (
          <div className="f-col a-f-e">
               <p ref={ref} className="user-message">{message}</p>
          </div>
     )
}

export const MobinaMessageLoading = () => {
     return (
          <div className="f-col a-f-s">
               <div className="mobina-message loading-dots">
                    <span /><span /><span />
               </div>
          </div>
     )
}

export const MobinaMessage = ({ message }) => {
     return (
          <div className="f-col a-f-s">
               <p className="mobina-message">{message}</p>
          </div>
     )
}