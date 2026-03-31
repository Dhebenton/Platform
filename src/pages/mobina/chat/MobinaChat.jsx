import { useState } from "react";
import GridBackground from "../../../components/grid-background/GridBackground";
import './MobinaChat.css'
import Input from "./components/input/Input";
import { MobinaMessageDefault, UserMessage } from "./components/messages/Message";

export default function MobinaChat({}) {
     const [ chatActive, setChatActive ]= useState(false)
     return (
          <section className="f-col flex">
               <div onClick={() => setChatActive(prev => !prev)} className={`mobina-chat-container a-c f-col ${chatActive ? 'active' : ''}`}>
                    <div className="background">
                         <div className="grid-wrap">
                              <GridBackground />
                         </div>
                         <div className="gradient"></div>
                    </div>
                    <div className="message-wrap f-col g24">
                         <UserMessage />
                         <MobinaMessageDefault />
                    </div>
                    <div className="input-container a-c f-col j-f-s">
                         <Input />
                    </div>
               </div>
          </section>
     )
}