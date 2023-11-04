import * as React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline, useMediaQuery } from "@mui/material";
import Header from "../../components/General user/Header";
import DrawerComponent from "../../components/General user/Appbar";
import Sidebar from "../../components/General user/Sidebar";
import Box from "@mui/material/Box";


export default function GeneralUserRoutes() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box sx={{ display: "flex", backgroundColor: "#F5F5F5" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
