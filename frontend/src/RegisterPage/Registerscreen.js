import React from "react";
import MainScreen from "../component/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Registerscreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message,setMesssage] = useState(null)
  const [imageMessage,setImageMessage] = useState(null)


  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);
      const { data } = await axios.post(
        "/api/v1/auth/register",
        { name,email, password },
        config
      );
      // localStorage.setItem("userInfo", JSON.stringify(data));
      console.log(data);
      setLoading(false);
      setError(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
    console.log(name,email,password,image);
  };

  return (
    <MainScreen title={"Register"}>
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loader />}
        <Form onSubmit={submithandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Image upload</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
          <Row>
            <Col>
              All ready have account?{" "}
              <a href="/login" style={{ color: "blue" }}>
                login
              </a>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default Registerscreen;
