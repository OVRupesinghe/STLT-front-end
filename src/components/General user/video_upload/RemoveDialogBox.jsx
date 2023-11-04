import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const axiosPrivate = useAxiosPrivate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeVideo = async () => {
    try {
      const response = await axiosPrivate.put('upload/hide-upload',  {
        caseID: props.caseId 
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        startIcon={<VisibilityOffIcon />}
        variant="contained"
        onClick={handleClickOpen}
        className="bg-slate-900 rounded-full"
        sx = {{boxShadow: 'none', textTransform: 'none'}}
      >
        Remove
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Permanently remove from view ? 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Note that this action cannot be reverted, the video will be permanently removed from your view.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Back
          </Button>
          <Button onClick={removeVideo}  autoFocus color = 'error'>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
