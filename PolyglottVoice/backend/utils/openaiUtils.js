const axios = require('axios');
const openaiApiKey = require('../config/config').openaiApiKey;

const openaiApiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${openaiApiKey}`
};

const tokenizeText = async (text) => {
  const data = {
    'prompt': text,
    'max_tokens': 60
  };

  try {
    const response = await axios.post(openaiApiUrl, data, { headers });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(`Error in tokenizing text: ${error}`);
  }
};

module.exports = {
  tokenizeText
};