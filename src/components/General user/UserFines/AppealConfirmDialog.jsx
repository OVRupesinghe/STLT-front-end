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
import Img from "../../../images/warning.png";
import Stack from "@mui/material/Stack";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useFormContext from "../../../hooks/useFormContext";

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();
  const {getValues} = useFormContext();
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

  console.log(getValues());

  const sendAppeal = async () => {
    window.location.reload();
    // const data = {
    //   key: props.videoKey
    // };
    // try {
    //   const response = await axiosPrivate.delete(`upload/delete-video/${props.caseId}`, {
    //     data: data // Send data in the request body
    //   });
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ boxShadow: 'none', textTransform: 'none', borderRadius: '20px', width : '150px' }}
        >
          Submit Appeal
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Stack justifyContent="center" alignItems="center">
            <DialogTitle id="responsive-dialog-title">
              Are you sure you want to submit an appeal ?
            </DialogTitle>
          </Stack>
          <DialogContent>
            <Stack justifyContent="center" alignItems="center">
              <img
                src={Img}
                alt="delete"
                style={{ height: "20%", width: "20%" }}
              />
            </Stack>
            <DialogContentText sx={{ marginTop: "5%", textAlign: "center" }}>
              This action is irreversible, after the appeal is directed towards the specific police division.
              Please make sure that the details are correct and you are ready proceed. <br />
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
              <Button autoFocus color='error' onClick={sendAppeal} >
                Yes
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider >
  );
}
