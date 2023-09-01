module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  ffmpegPath: process.env.FFMPEG_PATH,
  elevenlabsApiKey: process.env.ELEVENLABS_API_KEY,
  googleAuthClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
  appleAuthClientId: process.env.APPLE_AUTH_CLIENT_ID,
  mongoDbUrl: process.env.MONGODB_URL,
  port: process.env.PORT || 3000,
};