import React, { useState } from "react";
import MainScreen from "../component/MainScreen";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch } from "react-redux";
import { verify } from "../Store/tfaSlice";

const Verifytfa = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(token);
    try {
      const { data } = await axios.post(
        "/api/v1/2fa/verify",
        { token },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        console.log(data);
    
        navigate("/myNotes"); // Use navigate to go to /myNotes
        dispatch(verify())
      } else {
        alert("Invalid Token");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Token");
    }
  };

  return (
    <MainScreen>
      <div className="verifyContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="code">
            <Form.Label>Enter Code</Form.Label>
            <Form.Control
              style={{ width: "50%" }}
              type="text"
              placeholder="Enter Code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Verify
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default Verifytfa;
