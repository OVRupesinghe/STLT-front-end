import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Button,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { PropTypes } from "prop-types";
import axios from "../../api/posts";
import useAuth from "../../hooks/useAuth";

const Service = ({ keyID, service }) => {
  Service.propTypes = {
    keyID: PropTypes.string.isRequired,
    service: PropTypes.object.isRequired,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const data = {
    userId: auth.userId,
  }

  const handleActivate = async (id) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post(`services/${id}/activate`,data);
      setErrorMsg("Please Wait...");
      window.location.reload();
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (id) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post(`services/${id}/deactivate`,data);
      setErrorMsg("Please Wait...");
      window.location.reload();
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginTop: "-10vh",
          }}
        >
          <Typography variant="h5" color="primary">
            Loading...
          </Typography>
          <CircularProgress size={50} thickness={3} />
        </Box>
      ) : (
        <>
          <Card
            key={keyID}
            sx={{
              maxWidth: 600,
              display: "flex",
              flexDirection: "column",
              margin: "1rem auto",
            }}
          >
            <CardHeader title={service.name} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body2">Status :</Typography>
                {service?.status === "inactive" ? (
                  <Typography variant="body2" color="error">
                    Inactive
                  </Typography>
                ) : (
                  <Typography variant="body2" color="success">
                    Active
                  </Typography>
                )}
              </Box>
            </CardContent>
            <CardActions disableSpacing>
              {service?.status === "inactive" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleActivate(service.id)}
                >
                  Activate
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDeactivate(service.id)}
                >
                  Deactivate
                </Button>
              )}
            </CardActions>
          </Card>

          <Snackbar
            open={errorMsg !== "" && !success}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setErrorMsg("")}
          >
            <Alert onClose={() => setErrorMsg("")} severity="error">
              {errorMsg}
            </Alert>
          </Snackbar>

          <Snackbar
            open={success}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => {
              setSuccess(false);
              setErrorMsg("");
            }}
          >
            <Alert
              autoHideDuration={5000}
              onClose={() => {
                setSuccess(false);
                setErrorMsg("");
              }}
              severity="success"
            >
              {errorMsg}
              {/* on success */}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default Service;
