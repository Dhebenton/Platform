import { useState } from "react";
import GridBackground from "../../../components/grid-background/GridBackground";
import './MobinaChat.css'
import Input from "./components/input/Input";
import { MobinaMessage, MobinaMessageLoading, UserMessage } from "./components/messages/Message";
import { useChat } from "../../../hooks/useChat";

export default function MobinaChat() {
     const [chatActive, setChatActive] = useState(false)
     const { messages, loading, sendMessage, addUserMessage } = useChat()

     const handleSend = async (content) => {
          if (!chatActive) setChatActive(true)
          addUserMessage(content)
          await sendMessage(content)
     }

     return (
          <section className="f-col flex">
               <div className={`mobina-chat-container a-c f-col ${chatActive ? 'active' : ''}`}>
                    <div className="background">
                         <div className="grid-wrap">
                              <GridBackground />
                         </div>
                         <div className="gradient"></div>
                    </div>
                    <div className="message-wrap f-col g24">
                    {chatActive && (
                         <>
                              {messages.map(msg =>
                                   msg.role === 'user'
                                        ? <UserMessage key={msg.id} message={msg.content} />
                                        : <MobinaMessage key={msg.id} message={msg.content} />
                              )}
                              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                                   <MobinaMessageLoading />
                              )}
                         </>
                    )}
                    </div>
                    <div className="input-container a-c f-col j-f-s">
                         <Input onSend={handleSend} loading={loading} />
                    </div>
               </div>
          </section>
     )
}