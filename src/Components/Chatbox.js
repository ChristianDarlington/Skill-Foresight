import React, {useState, useEffect} from 'react'
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

 

const Chatbox = () => {

  const API_KEY = `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` 


  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
    message: 'Hello, I\'m Career Finder!',
    sentTime: 'just now',
    sender: 'Career Expert'
  }
])
  // const [message, setMessage] =  useState('')

  

  const handleSend = async(message) => {
      const newMessage = {
        message: message,
        sender: 'user',
        direction: 'outgoing'
      }
      const newMessages = [...messages, newMessage] // all the old messages + the new message 

      setMessages(newMessages)
      setTyping(true)

  }
  
  

 

  const handleSubmit = (e) => {
    e.preventDefault();  
}

 
 
  return (
    <div className='box-container'>
      <div style={{position: 'relative', height: '600px', width: '700px', margin: '300px'}}>
        <MainContainer>
          <ChatContainer onSubmit={handleSubmit}>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content='Career Finder is typing'/> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput  placeholder='Type message here' onSend={handleSend}/>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default Chatbox
