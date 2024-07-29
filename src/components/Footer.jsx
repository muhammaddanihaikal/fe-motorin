import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <p className="text-center px-md-0 px-3">
            &copy; Copyright {new Date().getFullYear()} by{" "}
            <span className="fw-bold">MotorIn</span>, Give u the best Reserved
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
