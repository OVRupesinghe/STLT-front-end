import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import SupervisorChatApp from "../../components/ChatApp/ChatAdmin";

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
            <h2 className="text-3xl font-bold">Surpport Page</h2>
          </Stack>

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ borderColor: "divider" }}
            centered
          >
            <Tab
              label='Customer Support'
              sx={{ fontWeight: "bold" }}
            />
          </Tabs>
          <TabPanel value={value} index={0} style={{ overflowY: "auto", height: "80vh" }}>
            <SupervisorChatApp />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}
