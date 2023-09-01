const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const ffmpegPath = require('../config/config').ffmpegPath;
ffmpeg.setFfmpegPath(ffmpegPath);

const extractAudio = (videoFilePath, outputFilePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoFilePath)
      .output(outputFilePath)
      .on('end', () => resolve(outputFilePath))
      .on('error', (err) => reject(err))
      .run();
  });
};

const synchronizeAudio = (originalAudioPath, translatedAudioPath, outputFilePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(originalAudioPath)
      .input(translatedAudioPath)
      .complexFilter([
        {
          filter: 'amix',
          options: { inputs: 2, duration: 'shortest' }
        }
      ])
      .on('end', () => resolve(outputFilePath))
      .on('error', (err) => reject(err))
      .save(outputFilePath);
  });
};

module.exports = {
  extractAudio,
  synchronizeAudio
};