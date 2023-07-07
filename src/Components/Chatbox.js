import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';




const Chatbox = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: 'Hello, I\'m Career Finder!',
      role: 'system',
      direction: 'incoming',
    },
  ]);

  const handleSend = (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    // Send the new messages to the backend for processing
    sendMessagesToBackend(newMessages);
  };

  const sendMessagesToBackend = async (messages) => {
    try {
      const response = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      const data = await response.json();

      if (response.ok) {
        const chatGPTMessage = data.message;
        const chatGPTResponse = {
          message: chatGPTMessage,
          sender: 'ChatGPT',
        };
        setMessages([...messages, chatGPTResponse]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log('Error processing message:', error);
      setMessages([
        ...messages,
        {
          message: 'Cannot answer question, please refresh page and try again',
          sender: 'ChatGPT',
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className=' object-contain  overflow-y-scroll'>
      <div className='absolute  w-full py-2 h-[740px] '>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={typing ? <TypingIndicator content='Career Finder is typing' /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder='Type message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chatbox;
