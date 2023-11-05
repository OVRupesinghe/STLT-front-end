import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import PendingTable from "../../components/General user/video_upload/PendingTable";
import RejectedTable from "../../components/General user/video_upload/RejectedTable";
import Profile from "./ProfilePage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UploadPage() {

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box >
          <Stack direction="row" justifyContent="space-between">
            <h2 className="text-3xl font-bold">SriCare Home Page</h2>
          </Stack>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ borderColor: "divider" }}
            centered
          >
            <Tab
              label="Profile" 
              sx={{ fontWeight: "bold" }}
            />

            <Tab
              label='Billing'
              sx={{ fontWeight: "bold" }}
            />

            <Tab
              label='Services'
              sx={{ fontWeight: "bold" }}
            />
            <Tab
              label='Customer Support'
              sx={{ fontWeight: "bold" }}
            />
          </Tabs>
          <TabPanel value={value} index={0} style={{ overflowY: "auto", height: "80vh" }}>
            <Profile />
          </TabPanel>
          <TabPanel value={value} index={1} style={{ overflowY: "auto", height: "80vh" }}>
            <PendingTable />
          </TabPanel>
          <TabPanel value={value} index={2} style={{ overflowY: "auto", height: "80vh" }}>
            <RejectedTable />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
