import { useState } from 'react';
import { Card, CardActions, CardContent, Typography, CardHeader, Button, Snackbar, Alert, Box, CircularProgress } from '@mui/material';
import { PropTypes } from 'prop-types';
import {billing, provision} from '../../api/billing';
import { useEffect } from 'react';

const ListItem = ({ keyID, bill }) => {
  ListItem.propTypes = {
    keyID: PropTypes.string.isRequired,
    bill: PropTypes.object.isRequired,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    getService();
  }, [])

  const handlePay = async (id) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await billing.post(`/bills/${id}/pay`);
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
      const res = await provision.get(`/services/${bill?.serviceId}`);
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
              title={`${serviceName} - Bill at ${bill.when}`}
              subheader={`Bill ID: ${bill.id}`}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Amount: {bill.amount}
              </Typography>
              <Box sx={{ display: 'flex'}}>
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
                  onClick={() => handlePay(bill.id)}
                >
                  Pay
                </Button>
              ) : (
                ""
              )}
            </CardActions>
          </Card>

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