import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SelectRole = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleRoleSelection = (roleId) => {
    navigate(`/register?roleId=${roleId}`);
    handleClose(); // Tutup modal setelah navigasi
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Daftar Sebagai</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Button
                variant="secondary"
                className="w-100 mb-3"
                onClick={() => handleRoleSelection("3")}
                style={{ height: "40px", fontSize: "16px" }}
              >
                Penyewa
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => handleRoleSelection("2")}
                style={{ height: "40px", fontSize: "16px" }}
              >
                Rental
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SelectRole;
