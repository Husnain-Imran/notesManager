import React from 'react'

import { Container, Row ,Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer
      style={{
        position: "relative",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-4"> Copy rights &copy; nano.com </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer
