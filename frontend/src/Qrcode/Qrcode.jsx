import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

const Qrcode = () => {
  const [qrcode, setQrcode] = useState(null);
  const [error, setError] = useState(null);
  const [secret, setSecret] = useState(null);
  const [token,setToken] = useState(null);
  const navigate = useNavigate();

  const fetchQrcode = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/2fa/register2fa",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Backend response:", data);

      setQrcode(data.QRCode);
    //   setSecret(data.secret);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Error generating QR code");
    }
  };
  const submithandler = async (e) => {
    e.preventDefault();
    try{

        const  {data}  = await axios.post(
          "/api/v1/2fa/verify",
          {token},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if(data.success)
        {
            navigate("/mynotes");
            
        }
        else
        {
            setError("Invalid token")
        }

    }
    catch(error)
    {
        console.log(error)

    }
  }

  useEffect(() => {
    fetchQrcode();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Enable Two-Factor Authentication</h1>
      {qrcode ? (
        <div className="text-center">
          <p>Scan this QR code with your authenticator app:</p>
          <img
            src={qrcode}
            alt="QR Code"
            style={{ width: "256px", height: "256px" }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <Form onSubmit={submithandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>OTP</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter OTP from authenticator app"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </Form.Group>
       
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Qrcode;
