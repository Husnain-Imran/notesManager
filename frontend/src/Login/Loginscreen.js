import React from "react";
import MainScreen from "../component/MainScreen";
import { Form, Button , Row ,Col} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
const Loginscreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);



    const submithandler = async (e) =>{
        e.preventDefault();
        try {
             const config = {
               headers: {
                 "Content-type": "application/json",
               },
             };
                setLoading(true);
                const { data } = await axios.post(
                  "/api/v1/auth/login",
                  { email, password },
                  config
                );
                localStorage.setItem('userInfo',JSON.stringify(data));
                console.log(data);
                setLoading(false);
                setError(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
      
    }


  return (
    <MainScreen title={"LOGIN"}>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={submithandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer?{" "}
            <a href="/register" style={{ color: "blue" }}>
              Register
            </a>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Loginscreen;
