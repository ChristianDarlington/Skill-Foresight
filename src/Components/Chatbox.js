import React, {useState} from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

 
const API_KEY = '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' 

const systemMessage = {
  role: 'system',
  content: "Speak like a Career expert, helping people of all ages find their career path."
}

const Chatbox = () => {

  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
    message: 'Hello, I\'m Career Finder!',
    role: 'system',
    direction: 'incoming'
  }
])


  

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      if(data.choices && data.choices.length > 0){
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
    } else {
      setMessages([...chatMessages, {
        message: 'Cannot answer question, please refresh page and try again',
        sender: "ChatGPT"
      }])
    }
      setTyping(false);
    });
  }


  
 
  return (
    <div className=''>
      <div className='absolute h-full w-full py-2 mx-auto'>
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
