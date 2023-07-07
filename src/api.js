const express = require('express');
const serverless = require('serverless-http');

const api = express();
const path = require('path');

const router = express.Router();
router.get('/demo', (req, res) => res.send(path.join(__dirname, 'build', 'index.html')));

api.use('/.netlify/functions/', router);

module.exports.handler = serverless(api);
