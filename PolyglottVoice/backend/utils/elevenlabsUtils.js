const axios = require('axios');
const config = require('../config/config');

const translateText = async (text, targetLanguage) => {
  try {
    const response = await axios.post(
      'https://api.elevenlabs.com/translate',
      {
        text: text,
        target: targetLanguage,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.elevenlabsApiKey}`,
        },
      }
    );

    if (response.data && response.data.translatedText) {
      return response.data.translatedText;
    } else {
      throw new Error('Translation failed');
    }
  } catch (error) {
    console.error(`Error in ElevenLabs translation: ${error}`);
    throw error;
  }
};

module.exports = {
  translateText,
};