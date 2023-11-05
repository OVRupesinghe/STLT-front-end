import { useState } from 'react';
import { Card, CardActions, CardContent, Typography, CardHeader, Button, Snackbar, Alert, Box, CircularProgress, Dialog, DialogTitle, DialogContent, useTheme, useMediaQuery, DialogActions, InputLabel, TextField } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/posts';

const ListItem = ({ keyID, bill }) => {
  ListItem.propTypes = {
    keyID: PropTypes.string.isRequired,
    bill: PropTypes.object.isRequired,
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [cardName, setCardName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const currentDate = new Date().toISOString().split("T")[0];
  const date = new Date(currentDate);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  useEffect(() => {
    getService();
  }, [])

  const handlePay = async (id) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = {
        cardName: cardName,
        expDate: expDate,
        cvv: cvv,
        userId: bill.userId,
        serviceId: bill.serviceId,
        amount: bill.amount,
      };
      console.log(data);
      await axios.post(`bills/${bill.id}/pay`,data);
      setErrorMsg("Please Wait...");
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getService = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.get(`services/${bill?.serviceId}`);
      setServiceName(res.data.name);
      setErrorMsg("Please Wait...");
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
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
          <Card
            key={keyID}
            sx={{
              maxWidth: 600,
              display: "flex",
              flexDirection: "column",
              margin: "1rem auto",
            }}
          >
            <CardHeader
              title={`${serviceName} - Bill at ${bill.when?.split("T")[0]}`}
              subheader={`Bill ID: ${bill.id}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Amount: {bill.amount}
              </Typography>
              <Box sx={{ display: "flex" }}>
                <Typography variant="body2" color="text.secondary">
                  Status:
                </Typography>
                {bill?.status === "pending" ? (
                  <Typography variant="body2" color="primary">
                    Pending
                  </Typography>
                ) : bill?.status === "paid" ? (
                  <Typography variant="body2" color="secondary">
                    Paid
                  </Typography>
                ) : (
                  <Typography variant="body2" color="error">
                    Cancelled
                  </Typography>
                )}
              </Box>
            </CardContent>
            <CardActions disableSpacing>
              {bill?.status === "pending" ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenDialog(true)}
                >
                  Proceed to Payment
                </Button>
              ) : (
                ""
              )}
            </CardActions>
          </Card>

          <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={() => {
              setOpenDialog(false);
            }}
            aria-labelledby="Set-Criteria"
          >
            <DialogTitle id="Set-Criteria-ID">Bill Payment</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "left",
                  width: "100%",
                  height: "100%",
                  margin: "2rem 0",
                  gap: "1rem",
                }}
              >
                <InputLabel htmlFor="cardName">Card Number</InputLabel>
                <TextField
                  id="cardName"
                  value={cardName}
                  variant="outlined"
                  onChange={(e) => setCardName(e.target.value)}
                  type="text"
                />
                <InputLabel htmlFor="expDate">Expiry Date</InputLabel>
                <TextField
                  id="expDate"
                  value={expDate}
                  inputProps={{ min: minDate }}
                  variant="outlined"
                  onChange={(e) => setExpDate(e.target.value)}
                  type="date"
                />
                <InputLabel htmlFor="cvv">CVV</InputLabel>
                <TextField
                  id="cvv"
                  value={cvv}
                  variant="outlined"
                  onChange={(e) => setCvv(e.target.value)}
                  type="password"
                />
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                  <InputLabel htmlFor="amount">Amount :</InputLabel>
                  <Typography variant="body2" color="secondary">
                    {bill.amount}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={() => handlePay()} autoFocus>
                Pay
              </Button>
            </DialogActions>
          </Dialog>

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
      )}
    </Box>
  );
}

export default ListItem