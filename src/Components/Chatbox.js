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
      message: "Hello, I'm Career Finder!",
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

  let serverDomain = "http://localhost:4000";
if(process.env.NODE_ENV === "production") {
  serverDomain = "https://moonlit-praline-1cc497.netlify.app"
}

  const sendMessagesToBackend = (messages) => {
    fetch(`${serverDomain}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((data) => {
        const chatGPTMessage = data.message;
        const chatGPTResponse = {
          message: chatGPTMessage,
          sender: 'ChatGPT',
        };
        setMessages([...messages, chatGPTResponse]);
      })
      .catch((error) => {
        console.log('Error processing message:', error);
        setMessages([
          ...messages,
          {
            message: 'Cannot answer question, the server is currently down. Please try again later.',
            sender: 'ChatGPT',
          },
        ]);
      })
      .finally(() => {
        setTyping(false);
      });
  };

  return (
    <div className=''>
      <div className='absolute w-full py-2 md:py-2 h-[600px] md:h-full md:overflow-y-scroll'>
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
