import { useState, useEffect } from "react";
import { Typography, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import Service from "./Service";
import axios from "../../api/posts";
import useAuth from "../../hooks/useAuth";

const Services = () => {
  const { userId } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();
  
  useEffect(() => {
    setLoading(true);
    setErrorMsg("");
    try {
      const fetchServices = async () => {
        const res = await axios.get(`services/user/${auth.userId}`);
        console.log("Services : ", res?.data);
        setServices(res.data);
      };
      fetchServices();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
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
            <Typography variant="h4" color="secondary" align="center">
              Services
            </Typography>
            {services?.map((service) => (
              <Service key={service.id} service={service} />
            ))}
          </>
        )}
      </Box>

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
  );
};

export default Services;
