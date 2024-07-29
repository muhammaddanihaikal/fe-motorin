import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function ContohCard() {
  return (
    <Container className="mt-3 mx-auto">
      <Row className="justify-content-center border">
        <Col md={8} className="border rounded">
          <Row className="p-3">
            {/* foto */}
            <Col
              md={3}
              className="border d-flex justify-content-center align-items-center"
            >
              <div>
                <img
                  src="https://i.pinimg.com/564x/70/ca/f7/70caf7941f4dd29b39dc25dd688dfddc.jpg"
                  alt="Rental Image"
                  className="img-fluid rounded"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Col>
            {/* nama dan alamat */}
            <Col md={7} className="border">
              <div className="d-flex flex-column justify-content-center h-100">
                <h2>Frent Jogja</h2>
                <p>
                  Jl. Pangeran Diponegoro No. 123 RT 05 RW 07, Kelurahan
                  Mergangsan, Kecamatan Umbulharjo, Yogyakarta 55281
                </p>
              </div>
            </Col>
            {/* button */}
            <Col md={2} className="d-flex align-items-center border">
              <Button variant="primary" size="lg" className="mx-auto my-auto">
                Pilih
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ContohCard;
