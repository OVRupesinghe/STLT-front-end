import React from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SmallText from './SmallText';
import useFormContext from '../../../hooks/useFormContext';
import Box from '@mui/system/Box';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

let ffmpeg;

const loadScript = (src) => {
  return new Promise((onFulfilled, _) => {
    const script = document.createElement("script");
    let loaded;
    script.async = "async";
    script.defer = "defer";
    script.setAttribute("src", src);
    script.onreadystatechange = script.onload = () => {
      if (!loaded) {
        onFulfilled(script);
      }
      loaded = true;
    };
    script.onerror = function () {
      console.log("Script failed to load");
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  });
};


export default function Dropzone(props) {
  const { page, setPage, setVideoUrl, setVideoDuration, setVideoDimensions, setVideoFile } = useFormContext();

  const handleNext = () => setPage(page + 1);
  const [loading, setLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    //Load the ffmpeg script
    loadScript(
      "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.2/dist/ffmpeg.min.js"
    ).then(() => {
      if (typeof window !== "undefined") {
        // creates a ffmpeg instance.
        ffmpeg = window.FFmpeg.createFFmpeg({ log: true });
        //Load ffmpeg.wasm-core script
        ffmpeg.load();
        //Set true that the script is loaded
        setIsScriptLoaded(true);
      }
    });
  }, []);
  const handleMetaData = async (videoFile) => {
    
    if (isScriptLoaded) {
      setLoading(true);
      const { name } = videoFile;
      // Write video to memory
      ffmpeg.FS("writeFile", name, await window.FFmpeg.fetchFile(videoFile));

      // Run FFmpeg command to get video metadata and redirect output to metadata.txt
      await ffmpeg.run("-i", name, "-f", "ffmetadata", "metadata.txt");

      // Read the metadata file from the virtual file system
      const metadataData = ffmpeg.FS("readFile", "metadata.txt");

      // Convert metadataData to a string
      const metadataString = new TextDecoder().decode(metadataData);

      // Check if the specific string exists in the metadata
      const searchString = "com.android";
      if (metadataString.includes(searchString)) {
        handleNext();
      } else {
        setOpenSnackbar(true);
      }
      setLoading(false);
    }
  };
  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 2,
    accept: ['video/mp4', 'video/quicktime'],// Accept all video file types
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        // Create a temporary URL for the uploaded video

        const temporaryUrl = URL.createObjectURL(acceptedFiles[0]);

        setVideoUrl(temporaryUrl); //set video url
        setVideoFile(acceptedFiles[0]); //set vide file

        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';
        videoElement.src = temporaryUrl;

        videoElement.addEventListener('loadedmetadata', () => {
          // Extract the duration from the video's duration property
          const durationInSeconds = Math.floor(videoElement.duration);
          setVideoDuration(durationInSeconds);
          const videoWidth = videoElement.videoWidth;
          const videoHeight = videoElement.videoHeight;
          setVideoDimensions({ width: videoWidth, height: videoHeight });
        });
        handleMetaData(acceptedFiles[0]);
      }
    }
  });

  return (
    <section sx={{ padding: '10px', margin: '0 auto' }}>
      <Box
        {...getRootProps({
          sx: {
            border: '3px dashed #888',
            borderRadius: '10px',
            padding: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer'
          }
        })}
      >
        {loading ? (
          <CircularProgress sx={{ color: 'primary.main' }} />
        ) : (
          <>
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ width: '20%', height: '20%', color: '#888' }} />
            <p>
              <u>
                Click to Upload
              </u>{' '}
              or drag and drop
            </p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', color: '#888' }}>
              (Maximum File Size: 500MB)
            </p>
            <SmallText text={"Your videos will be private to you till you submit them"} />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
              <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                Invalid video metadata. Please upload a valid video. (Note that videos downloaded from Social Media are not supported)
              </MuiAlert>
            </Snackbar>
          </>
        )}

      </Box>
    </section>
  );
}
