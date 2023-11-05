import { useEffect, useState } from "react"
import { Snackbar, Alert, Box, Typography, CircularProgress, Link } from "@mui/material"
import ListItem from "./ListItem";
import axios from "../../api/posts";
import useAuth  from "../../hooks/useAuth";

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await axios.get(`bills/user/${auth.userId}`);
        setBills(res.data);
        console.log("Bills : ",res?.data);
      } catch (err) {
        setErrorMsg(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBills()
  }, [])

  const reversedBills = bills.sort((a, b) => {
    if (b.when < a.when) return -1;
    if (b.when > a.when) return 1;
    return 0;
  });
  //console.log("Reversed Bills : ",reversedBills);
  
  return (
    <>
      <Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              marginTop: "-10vh",
            }}
          >
            <Typography variant="h5" color="primary">
              Loading...
            </Typography>
            <CircularProgress size={50} thickness={3} />
          </Box>
        ) : (
          <>
            <Typography variant="h4" color="secondary" align="center">
              Your Bills
            </Typography>
            <Link href={`billing/services/${bills[0]?.userId}`}>
              Services
            </Link>
            {reversedBills?.map((bill) => 
              <ListItem key={bill.id} bill={bill} />
            )}
          </>
        )}
      </Box>

      <Snackbar
        open={errorMsg !== "" && !success}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setErrorMsg("")}
      >
        <Alert onClose={() => setErrorMsg("")} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setSuccess(false);
          setErrorMsg("");
        }}
      >
        <Alert
          autoHideDuration={5000}
          onClose={() => {
            setSuccess(false);
            setErrorMsg("");
          }}
          severity="success"
        >
          {errorMsg}
          {/* on success */}
        </Alert>
      </Snackbar>
    </>
  );
}

export default BillList