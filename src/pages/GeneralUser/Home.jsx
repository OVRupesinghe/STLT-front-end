import * as React from "react";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import Popup from "../../components/General user/video_upload/Popup";
import Stack from "@mui/material/Stack";
import AcceptedTable from "../../components/General user/video_upload/AcceptedTable";
import PendingTable from "../../components/General user/video_upload/PendingTable";
import RejectedTable from "../../components/General user/video_upload/RejectedTable";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useFineContext from "../../hooks/useFineContext";
import useAuth from "../../hooks/useAuth";

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
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userData = {
    user: auth.user_id,
  };
  const { acceptedUploads, rejectedUploads, pendingUploads, setAcceptedUploads, setRejectedUploads, setPendingUploads } = useFineContext();
  const getUploads = async () => {
    try {
      const response = await axiosPrivate.get("upload/get-uploads", { params: userData });
      for (let i = 0; i < response.data.length; i++) {
        const upload = response.data[i];
        const isDuplicate = pendingUploads.some((item) => item.id === upload.id) || acceptedUploads.some((item) => item.id === upload.id) || rejectedUploads.some((item) => item.id === upload.id);
        if (!isDuplicate) {
          if (upload.status === "Pending Review") {
            setPendingUploads((prevPendingUploads) => [...prevPendingUploads, upload]);
          } else if (upload.status === "accepted") {
            setAcceptedUploads((prevAcceptedUploads) => [...prevAcceptedUploads, upload]);
          } else if (upload.status === "rejected") {
            setRejectedUploads((prevRejectedUploads) => [...prevRejectedUploads, upload]);
          } else {
            console.log("Error in getting uploads");
          }
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUploads();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh" }}>
        <Box className="py-6">
          <Stack direction="row" justifyContent="space-between">
            <h2 className="text-3xl font-bold">Home</h2>

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
            <AcceptedTable />
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
