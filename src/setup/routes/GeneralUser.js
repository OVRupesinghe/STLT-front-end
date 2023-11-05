import * as React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export default function GeneralUserRoutes() {
  const Navigate = useNavigate();

  const logout = useLogout();

  const signOut = async () => {
    await logout();
    Navigate("/");
  };
  return (
    <Box sx={{ display: "flex", backgroundColor: "#F5F5F5" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box>
          <Stack direction="row" spacing={2} justifyContent = 'flex-end'>
            <Button
              startIcon={<LogoutIcon />}
              variant="text"
              color="primary"
              size = 'large'
              sx={{ boxShadow: "none", textTransform: "none" }}
              onClick={signOut}
            >
              Logout
            </Button>
          </Stack>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
