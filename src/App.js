import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import GeneralUserRoutes from "./setup/routes/GeneralUser";
import UploadPage from "./pages/GeneralUser/Home";
import Login2 from "./pages/Login2";
import Registration from "./pages/GeneralUserRegistration/RegistrationPage";
import Login from "./pages/Login";
import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { FormProvider } from "./context/FormContext";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import PolicePersistLogin from "./components/PolicePersistLogin";
import ProfilePage from "./pages/GeneralUser/ProfilePage";
import UserFAQ from "./pages/GeneralUser/Information";

export default function App() {
  const THEME = createTheme({
    typography: {
      fontFamily: "Inter",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <ThemeProvider theme={THEME}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route
            path=""
            element={
              <FormProvider>
                <Login />
              </FormProvider>
            }
          />
          <Route
            path="registration"
            element={
              <FormProvider>
                <Registration />
              </FormProvider>
            }
          />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="copsco/login" element={<Login2 />} />
          {/* protected routes */}

          <Route element={<PersistLogin />}>
            {/* general user routes */}
            <Route element={<RequireAuth allowedRole="user" />}>
              <Route path="general-user/" element={<GeneralUserRoutes />}>
                <Route
                  path=""
                  element={
                    <FormProvider>
                      <UploadPage />
                    </FormProvider>
                  }
                />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="information" element={<UserFAQ />} />
              </Route>
            </Route>
          </Route>
          <Route element={<PolicePersistLogin />}>
            {/* police operator routes */}
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
