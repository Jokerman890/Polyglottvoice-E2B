const express = require('express');
const router = express.Router();
const translationController = require('../controllers/translationController');
const authenticationController = require('../controllers/authenticationController');

// Route for extracting audio from video and translating it
router.post('/translate', translationController.extractAudio, translationController.tokenizeText, translationController.translateText, translationController.synchronizeAudio);

// Route for user login
router.post('/login', authenticationController.loginUser);

// Route for user subscription
router.post('/subscribe', authenticationController.subscribeUser);

// Route for getting supported languages
router.get('/languages', translationController.getSupportedLanguages);

module.exports = router;