import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import Img from "../../../images/clear.png";
import Stack from "@mui/material/Stack";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    }
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteVideo = async () => {
    const data = {
      key: props.videoKey
    };
    try {
      const response = await axiosPrivate.delete(`upload/delete-video/${props.caseId}`, {
        data: data // Send data in the request body
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button
          startIcon={<DeleteIcon />}
          variant="contained"
          color="error"
          onClick={handleClickOpen}
          className="bg-red-700 rounded-full"
          sx={{ boxShadow: 'none', textTransform: 'none' }}
        >
          Delete Video
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Stack justifyContent="center" alignItems="center">
            <DialogTitle id="responsive-dialog-title">
              Delete Video Permanently ?
            </DialogTitle>
          </Stack>
          <DialogContent>
            <Stack justifyContent="center" alignItems="center">
              <img
                src={Img}
                alt="delete"
                style={{ height: "15%", width: "15%" }}
              />
            </Stack>
            <DialogContentText sx={{ marginTop: "5%", textAlign: "center" }}>
              This video hasn't been verified yet. <br />
              Deleting it will remove it from your view permanently. <br />
              Do you wish to continue ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              width="100%"
            >
              <Button autoFocus onClick={handleClose} >
                Back
              </Button>
              <Button onClick={deleteVideo} autoFocus color='error' >
                Yes
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider >
  );
}
