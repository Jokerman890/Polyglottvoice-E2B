const ffmpegUtils = require('../utils/ffmpegUtils');
const openaiUtils = require('../utils/openaiUtils');
const elevenlabsUtils = require('../utils/elevenlabsUtils');

exports.translateVideo = async (req, res) => {
    const { videoUrl, targetLanguage } = req.body;

    try {
        // Extract audio from video
        const audioBuffer = await ffmpegUtils.extractAudio(videoUrl);

        // Convert audio to text using OpenAI Whisper ASR
        const text = await openaiUtils.audioToText(audioBuffer);

        // Tokenize the text
        const tokenizedText = openaiUtils.tokenizeText(text);

        // Translate the text using OpenAI API
        const translatedText = await openaiUtils.translateText(tokenizedText, targetLanguage);

        // Synchronize the translated text with the audio using ElevenLabs API
        const synchronizedAudio = await elevenlabsUtils.synchronizeAudio(translatedText, audioBuffer);

        // Send the synchronized audio back to the client
        res.status(200).json({ synchronizedAudio });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};