import React from 'react'
import "./LandingPage.css";
import { Container, Row,Button } from 'react-bootstrap';
import Header from '../../component/Header';
import Footer from '../../component/Footer';

// import { Container,Row } from "react-bootstrap";

const LandingPage = () => {
  return (
  
    
    <div className="main">
      <Container>
        <div className="intro-text">
          <h1 className="title">Welcome to Nano Notes</h1>
          <p className="subtitle">One safe place to ALL Your notes</p>
        </div>
        <div className="button-container">
          <a href="/login">
            ,
            <Button size="lg" className="Landing-button">
              Login
            </Button>
          </a>
          <a href="/login">
            ,
            <Button
              size="lg"
              variant="outline-primary"
              className="Landing-button"
              >
              Register
            </Button>
          </a>
        </div>
      </Container>
    </div>
   
  );
}

export default LandingPage
