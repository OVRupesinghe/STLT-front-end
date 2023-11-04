import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';

export default function PaymentPage() {
  const [htmlResponse, setHtmlResponse] = useState("");

  useEffect(() => {
    const formData = new FormData();
    formData.append("merchant_id", "1223804");
    formData.append("return_url", "http://localhost:3000/general-user/fines");
    formData.append("cancel_url", "http://localhost:3000/general-user/fines");
    formData.append("notify_url", "http://localhost:3000/general-user/fines");
    formData.append("order_id", "ItemNo12345");
    formData.append("items", "Door bell wireless");
    formData.append("currency", "LKR");
    formData.append("amount", "1000");
    formData.append("first_name", "Saman");
    formData.append("last_name", "Perera");
    formData.append("email", "samanp@gmail.com");
    formData.append("phone", "0771234567");
    formData.append("address", "No.1, Galle Road");
    formData.append("city", "Colombo");
    formData.append("country", "Sri Lanka");
    formData.append("hash", "098F6BCD4621D373CADE4E832627B4F6");
    async function fetchData() {
      try {
        const response = await fetch(
          "https://sandbox.payhere.lk/pay/checkout",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.text(); // Get response as text
          setHtmlResponse(responseData);
        } else {
          // Handle non-200 status codes here
          console.error("Payment error:", response.statusText);
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <Box width = '100%' height = '100vh' >
      {htmlResponse && (
        <iframe
          title="PayHere Payment Response"
          srcDoc={htmlResponse} // Set the HTML content here
          width="100%"
          height="100%"
        />
      )}
    </Box>
  );
}
