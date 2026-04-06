import { useState } from 'react'
import GridBackground from '../../../components/grid-background/GridBackground'
import './MobinaChat.css'
import Input from './components/input/Input'
import { MobinaMessage, UserMessage } from './components/messages/Message'
import { useChat } from '../../../hooks/useChat'

export default function MobinaChat() {
  const [chatActive, setChatActive] = useState(false)
  const { messages, loading, sendMessage } = useChat()

  const lastMessage = messages[messages.length - 1]
  const showAssistantLoading = loading && lastMessage?.role !== 'assistant'

  const handleSend = async (content) => {
    if (!chatActive) setChatActive(true)
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
              {messages.map((msg, index) => {
                const isStreamingAssistant =
                  msg.role === 'assistant' &&
                  index === messages.length - 1 &&
                  loading

                if (msg.role === 'user') {
                  return <UserMessage key={msg.id} message={msg.content} />
                }

                return (
                  <MobinaMessage
                    key={msg.id}
                    message={msg.content}
                    loading={isStreamingAssistant && !msg.content}
                    streaming={isStreamingAssistant && !!msg.content}
                  />
                )
              })}

              {showAssistantLoading && <MobinaMessage loading />}
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