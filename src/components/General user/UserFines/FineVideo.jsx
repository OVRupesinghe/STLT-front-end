import React, { useEffect, useRef } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';

const VideoPlayer = (props) => {
  // const videoRef = useRef(null);
  // const playerRef = useRef(null);

  // useEffect(() => {
  //   playerRef.current = videojs(videoRef.current, props, () => {
  //     console.log('Video.js player is ready');
  //   });

  //   return () => {
  //     if (playerRef.current) {
  //       playerRef.current.dispose();
  //     }
  //   };
  // }, [props]);

  return (
    <div>
      {/* <div data-vjs-player>
        <video ref={videoRef} className="video-js" />
      </div> */}
      Video
    </div>
  );
};

export default VideoPlayer;

