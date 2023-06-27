import React, {useState} from 'react'
import '../App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

 
const API_KEY = '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' 

const Chatbox = () => {



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

      // update our messages state
      setMessages(newMessages)
      
      // set a typing indicator (Chat is typing)
      setTyping(true)

      // process message to demo (send it over and see the response)
      await processMessageToDemo(newMessages)
  }
  
  
  async function processMessageToDemo(chatmessages) {
    // chatMessages {sender: 'user' or 'ChatGPT', message: "The message content here"}
    // apiMessages {role: 'user' or 'assistant', content: 'The message content here'}

    let apiMessages = chatmessages.map((messageObject) => {
        let role =''
        if(messageObject === 'ChatGPT'){
          role = 'assistant'
        } else {
          role= 'user'
        }
        return{role: role, content: messageObject.message}
    })

      // 'system' -> generally one initial message defining HOW we wnat a chatgpt to talk

    const systemMessage = {
      role: "system",
      content: "Speak like a Career expert, helping people of all ages find their career path."
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "message": [
        systemMessage,
        ...apiMessages // [message1, message2, messgae3]
      ]
    }


   
    await fetch(" https://api.openai.com/v1/chat/completions",{
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json()
    }).then((data) => {
      console.log(data)
      setMessages(
      [...chatmessages, {
        message: data.choices[0].message.content,
        sender: 'ChatGPT'
      }]
      )
      setTyping(false)
    })
  }
 

//   const handleSubmit = (e) => {
//     e.preventDefault();  
// }

 
 
  return (
    <div className='box-container'>
      <div style={{position: 'relative', height: '600px', width: '700px', margin: '300px'}}>
        <MainContainer>
          <ChatContainer>
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
