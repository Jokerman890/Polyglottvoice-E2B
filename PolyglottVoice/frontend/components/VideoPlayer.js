import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlayer = ({ videoId, onStateChange }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.stopVideo();
      }
    };
  }, []);

  return (
    <View>
      <YoutubePlayer
        ref={playerRef}
        height={300}
        play={true}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlayer;