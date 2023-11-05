import * as React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";


export default function GeneralUserRoutes() {
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
