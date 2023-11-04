import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link2 from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageSlideShow from "../components/Login/ImageCarousel";
import { Stack, useMediaQuery } from "@mui/material";
import GoogleButton from "react-google-button";
import Divider from "@mui/material/Divider";
import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/posts";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import jwt_decode from "jwt-decode";
import image from "../images/logo.png";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link2 color="inherit" href="https://mui.com/">
        CopSco
      </Link2>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const userRef = useRef();

  const [user, resetUser, userAttributes] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  const handleClose = () => {
    setErrMsg("");
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const formWidth = isXsScreen ? "70%" : "30%";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "login",
        JSON.stringify({ username: user, pass: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      console.log(response.data);
      const role = response.data.userrole;
      // const accessToken = response.data.accessToken;
      // const role = response.data.userrole;
      const fname = user;
      // const decoded = jwt_decode(accessToken);
      const user_id = response.data.userid;
      setAuth({ user, role, fname, user_id });
      // resetUser();
      // setPwd("");

      if (role === "user") {
        navigate("/general-user");
      } else {
        alert("invalid role");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Network error");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed, try again");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        open={Boolean(errMsg)}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity="error"
          onClose={handleClose}
          role="alert"
          variant="filled"
        >
          {errMsg}
        </Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
          <Typography
            sx={{ margin: "20px", fontFamily: "inter" }}
            component="h1"
            variant="h5"
            className="font-extrabold text-black"
          >
            SriCare
          </Typography>
          <Box
            sx={{
              height: "90%",
              mx: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack justifyContent="center" alignItems="center" spacing={3}>
              <Typography
                component="h1"
                variant="h4"
                className="font-extrabold text-neutral-500"
                sx={{ fontFamily: "inter" }}
              >
                Login to your account
              </Typography>
              <Typography
                component="h1"
                variant="h5"
                className="font-light text-neutral-500"
              >
                Welcome back !
              </Typography>

             
            </Stack>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: formWidth }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="username"
                ref={userRef}
                label="Username"
                autoComplete="on"
                {...userAttributes}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    id="remember"
                    onChange={toggleCheck}
                    checked={check}
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, padding: "10px" }}
                className="rounded-full bg-slate-900 hover:bg-sky-700"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link2 href="#" variant="body2">
                    Forgot password?
                  </Link2>
                </Grid>
                <Grid item>
                  <Link2 href="/registration" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link2>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <CssBaseline />
      </Grid>
    </ThemeProvider>
  );
}
