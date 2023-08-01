const express = require('express');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const app = express();
const port = 4000;
require('dotenv').config();
const cors = require('cors');

const path = require('path');

// Middleware to parse JSON request body
app.use(express.json());

// Serve static files from the 'build' directory (assuming you have a build folder for the React frontend)
app.use(express.static('build'));


const API_KEY = process.env.API_KEY;


const whitelist = ['http://localhost:3000', 'https://moonlit-praline-1cc497.netlify.app']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors())

// API endpoint to process chat messages
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('Received request at /api/chat');
  console.log('Request payload:', req.body);


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

app.get('/demo', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



app.get(`/api/chat`, (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});




const limits = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
});

app.use(limits);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
