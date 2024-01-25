// private/config.js
require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  apiKey: process.env.API_KEY || 'defaultApiKey', 
  apiId: process.env.API_ID || 'defaultApiId',    
};
