import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Layout from "./components/Layout";
import TrafficPoliceRoutes from "./setup/routes/TrafficPolice";
import GeneralUserRoutes from "./setup/routes/GeneralUser";
import Home from "./pages/Traffic police/Home";
import UserDetails from "./pages/Traffic police/UserDetails";
import Notifications from "./pages/Traffic police/Notifications";
import Profile from "./pages/Traffic police/Profile";
import Statistics from "./pages/Traffic police/Statistics";
import Information from "./pages/Traffic police/Information";
import IssueFine from "./pages/Traffic police/IssueFine";
import FineConfirmation from "./pages/Traffic police/FineConfirmation";
import FinePrint from "./pages/Traffic police/FinePrint";
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
import { DetailsProvider } from "./context/userDetailsContext";
import { FineProvider } from "./context/userFinesContext";
import { GeneralUserProvider } from "./context/GeneralUserContext";
import UserFines from "./pages/GeneralUser/UserFines";
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
          <Route path="" element={<Login />} />
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
              <Route
                path="general-user/"
                element={
                  <GeneralUserProvider>
                    <GeneralUserRoutes />
                  </GeneralUserProvider>
                }
              >
                <Route
                  path=""
                  element={
                    <FineProvider>
                      <FormProvider>
                        <UploadPage />
                      </FormProvider>
                    </FineProvider>
                  }
                />
                <Route
                  path="fines"
                  element={
                    <FineProvider>
                      <FormProvider>
                        <UserFines />
                      </FormProvider>
                    </FineProvider>
                  }
                />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="information" element={<UserFAQ />} />
              </Route>
            </Route>
          </Route>
          <Route element={<PolicePersistLogin />}>
            {/* traffic police routes */}
            <Route element={<RequireAuth allowedRole="traffic-police" />}>
              <Route path="traffic-police/" element={<TrafficPoliceRoutes />}>
                <Route
                  path=""
                  element={
                    <DetailsProvider>
                      <Home />
                    </DetailsProvider>
                  }
                />
                <Route
                  path="user-details"
                  element={
                    <DetailsProvider>
                      <UserDetails />
                    </DetailsProvider>
                  }
                />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="information" element={<Information />} />
                <Route
                  path="issue-fine"
                  element={
                    <DetailsProvider>
                      <FormProvider>
                        <IssueFine />
                      </FormProvider>
                    </DetailsProvider>
                  }
                />
                <Route
                  path="fine-confirmation"
                  element={
                    <DetailsProvider>
                      <FormProvider>
                        <FineConfirmation />
                      </FormProvider>
                    </DetailsProvider>
                  }
                />
                <Route path="fine-print" element={<FinePrint />} />
              </Route>
            </Route>

            {/* police operator routes */}
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
