const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;
require('dotenv').config();
const cors = require('cors');


// Middleware to parse JSON request body
app.use(express.json());

// Serve static files from the 'build' directory (assuming you have a build folder for the React frontend)
app.use(express.static('build'));

app.use(cors())

const API_KEY = process.env.API_KEY;


// API endpoint to process chat messages
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  const systemMessage = {
    role: 'system',
    content: "Speak like a Career expert, helping people of all ages find their career path.",
  };

  const apiRequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      systemMessage,
      ...messages.map((message) => ({
        role: message.sender === 'ChatGPT' ? 'assistant' : 'user',
        content: message.message,
      })),
    ],
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      apiRequestBody,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Use environment variable for API key
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    if (data.choices && data.choices.length > 0) {
      const chatGPTMessage = data.choices[0].message.content;
      res.json({ message: chatGPTMessage });
    } else {
      res.status(500).json({ error: 'Cannot answer question' });
    }
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
