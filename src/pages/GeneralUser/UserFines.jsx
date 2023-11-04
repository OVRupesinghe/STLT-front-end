import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import VideoViolationsTable from "../../components/General user/UserFines/VideoViolationsTable";
import SpotFinesTable from "../../components/General user/UserFines/SpotFinesTable";
import Badge from '@mui/material/Badge';
import useFineContext from "../../hooks/useFineContext";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/posts";
import { useEffect } from "react";

export default function UserFines() {

  const { setSpotFines } = useFineContext();
  const { auth } = useAuth();
  const violationData = {
    nic: auth.user
  };
  const getSpotFines = async () => {
    try {
      const response = await axios.get("fines/getFines", {
        params: violationData
      });
      setSpotFines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSpotFines(); // Fetch data when the component mounts
    // eslint-disable-next-line
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="py-6">
      <h2 className="text-3xl font-bold">Manage your fines</h2>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="lab API tabs example"
        sx={{ borderBottom: 1, borderColor: "divider" }}
        centered
      >
        <Tab
          label={
            <Badge badgeContent={0} color="primary" >
              Video violations
            </Badge>
          }
          sx={{ fontWeight: "bold" }} />

        <Tab
          label={
            <Badge badgeContent={1} color="primary">
              On-spot violations
            </Badge>
          }
          sx={{ fontWeight: "bold" }} />

        <Tab
          label={
            <Badge badgeContent={1} color="primary">
              Appealed violations
            </Badge>
          }
          sx={{ fontWeight: "bold" }} />

      </Tabs>
      <TabPanel value={value} index={0} className="py-10">
        <VideoViolationsTable />
      </TabPanel>

      <TabPanel value={value} index={1} className="py-10">
        <SpotFinesTable />
      </TabPanel>
      <TabPanel value={value} index={1} className="py-10">
        
      </TabPanel>
    </Box>
  );
}

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
