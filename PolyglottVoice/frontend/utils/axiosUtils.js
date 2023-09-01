import axios from 'axios';
import { openaiApiKey, googleAuthClientId, appleAuthClientId } from '../config/config';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${openaiApiKey}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const loginUser = async (provider) => {
  let clientId;
  if (provider === 'google') {
    clientId = googleAuthClientId;
  } else if (provider === 'apple') {
    clientId = appleAuthClientId;
  }
  const response = await instance.post('/login', { clientId });
  return response.data;
};

export const subscribeUser = async (userId) => {
  const response = await instance.post('/subscribe', { userId });
  return response.data;
};

export const getSupportedLanguages = async () => {
  const response = await instance.get('/languages');
  return response.data;
};

export const extractAudio = async (videoUrl) => {
  const response = await instance.post('/extractAudio', { videoUrl });
  return response.data;
};

export const tokenizeText = async (audioData) => {
  const response = await instance.post('/tokenize', { audioData });
  return response.data;
};

export const translateText = async (tokenizedText, targetLanguage) => {
  const response = await instance.post('/translate', { tokenizedText, targetLanguage });
  return response.data;
};

export const synchronizeAudio = async (translatedText, audioData) => {
  const response = await instance.post('/synchronize', { translatedText, audioData });
  return response.data;
};