import React, {useState, useEffect} from 'react'
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const Chatbox = () => {

  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([{
    message: 'Hello, I\'m career finder!',
    sentTime: 'just now',
    sender: 'Career Expert'
  }])
  const [message, setMessage] =  useState('')

  // useEffect(() => {
  //   fetch('/submit-survey')
  //     .then(response => response.json())
  //     .then(data => console.log(data.aimessage))
  //     .catch(error => console.error(error));
  // }, [])


  

  

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers:[

    ] })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
 
}

 
 
  const handleSend = async (message) => {
    console.log(`handle send was called ${message}`)
      const newMessage = {
        message: message,
        sender: 'user',
        direction: 'outgoing'
        
      }
      const newMessages = [...messages, newMessage] // all the old messages, + the new message
      
      var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "data" : message})
      };

      fetch('http://127.0.0.1:5000/answer', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(
        data => setMessages([
          ...messages,
          {message: data.message, sender: 'bot'}
        ])
        )
      .catch(error => console.error(error));

      
  
      
      
      // update our message state
      setMessages(newMessages)
      setTyping(true)
      // set a typing indicator (Career Expert is typing)
      // process message to AI, send it over and see response
      
    }

  return (
    <div className='box-container'>
      <div style={{position: 'relative', height: '600px', width: '700px', margin: '300px'}}>
        <MainContainer>
          <ChatContainer onSubmit={handleSubmit}>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content='Career Expert is typing'/> : null}
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
