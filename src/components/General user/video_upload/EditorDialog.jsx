import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Editor from "./Editor";
import useFormContext from "../../../hooks/useFormContext";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from '@mui/material/styles';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(3), // Adjust the value as needed
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary[200],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
//Convert the time obtained from the video to HH:MM:SS format
const convertToHHMMSS = (val) => {
  const secNum = parseInt(val, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = secNum - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  let time;
  // only mm:ss
  if (hours === "00") {
    time = minutes + ":" + seconds;
  } else {
    time = hours + ":" + minutes + ":" + seconds;
  }
  return time;
};

let ffmpeg;
export default function EditorDialog() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { page, setPage, endTime, startTime, videoFile, setTrimmedVideo } =
    useFormContext();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
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

  //Created to load script by passing the required script and append in head tag
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
  const handleBack = () => setPage(page - 1);
  //Trim functionality of the video
  const [loading, setLoading] = React.useState(false);
  const handleTrim = async () => {
    if (isScriptLoaded) {
      const { name, type } = videoFile;
      //Write video to memory
      setLoading(true);
      ffmpeg.FS("writeFile", name, await window.FFmpeg.fetchFile(videoFile));
      const videoFileType = type.split("/")[1];
      try {
        await ffmpeg.run(
          "-i",
          name,
          "-ss",
          `${convertToHHMMSS(startTime)}`,
          "-to",
          `${convertToHHMMSS(endTime)}`,
          "-acodec",
          "copy",
          "-vcodec",
          "copy",
          `out.${videoFileType}`
        );
        //Convert data to url and store in videoTrimmedUrl state
        const data = ffmpeg.FS("readFile", `out.${videoFileType}`);
        const trimmedBlob = new Blob([data.buffer], { type: videoFile.type });
        setTrimmedVideo(trimmedBlob);
      } catch (error) {
        console.log(error);
      } finally {
        //Set the page to next page
        setLoading(false);
        setPage(page + 1);
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    handleBack();
    setOpen(false);
  };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    }
  });
  return (
    <ThemeProvider theme={darkTheme}>
    <div>
      <Button
        variant="outlined"
        sx={{ color: theme.palette.primary[200] }}
        onClick={handleClickOpen}
        startIcon={<AddOutlinedIcon />}
      >
        Upload Evidence
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ height: "100vh" }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <center>
            <b>Upload Evidence</b>
          </center>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Editor />
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="space-around" width="100%">
            <Button onClick={handleBack} sx = {{padding:'20px'}}>Back</Button>
            {loading ? (
              <CircularProgress size={24} /> // Display the spinner
            ) : (
              <Button onClick={handleTrim} sx = {{padding:'20px'}}>Next</Button>
            )}
          </Stack>
        </DialogActions>
      </BootstrapDialog>
    </div>
    </ThemeProvider>
  );
}
