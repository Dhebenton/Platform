import { useState } from 'react'
import GridBackground from '../../../components/grid/GridBackground'
import Input from './components/Input'
import './MobinaChat.css'

export default function MobinaChat({}) {
     const [ activeChat, setActiveChat ] = useState(false)

     return (
          <section id='mobina-chat-section' className={`padding-normal f-col ${activeChat ? 'active' : ''}`}>
               <div onClick={() => setActiveChat(prev => !prev)} className='mobina-chat a-c f-col'>
                    <div className="background-wrap be-rel">
                         <div className='canvas-wrap'>
                              <GridBackground />
                         </div>
                    </div>
                    <div className="message-wrap f-col g24">
                         <div className="message user">
                              <p className="user b-xl-medium lh-15 label-primary">Why did my checkout speed drop yesterday?</p>
                         </div>
                         <div className="message">
                              <p className="user b-xl-medium lh-15 label-black">Checkout load time increased by 420ms after the 14:20 production deploy. A new client side validation script added blocking time on mobile. Stripe webhook retries increased server latency.</p>
                         </div>
                    </div>
                    <Input />
               </div>
          </section>
     )
}