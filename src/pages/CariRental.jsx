import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CariRental = () => {
  const [kotas, setKotas] = useState([]);
  const [kotaId, setKotaId] = useState("1");
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    getAllKota();
    getRentalsByKotaId();
  }, [rentals, kotaId]);

  const getAllKota = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/kotas`
      );
      const data = response.data;
      //   console.log(data);

      setKotas(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const getRentalsByKotaId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/rentals?kotaId=${kotaId}`
      );
      const data = response.data;
      console.log(data);

      setRentals(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const handleKotaId = (e) => {
    const kotaId = e.target.value;
    setKotaId(kotaId);
    if (kotaId) {
      getRentalsByKotaId(kotaId);
    }
  };

  return (
    <>
      <Container className="mb-5">
        <Row className="mt-5"></Row>
        <Row className="mt-5 mb-3">
          <h1 className="fw-bold">Cari Rental Motor</h1>
        </Row>
        <Row className="mb-3">
          <Col lg="4">
            {/* kota */}
            <Form.Group>
              <Form.Label>Pilih Kota</Form.Label>
              <Form.Control
                as="select"
                value={kotaId}
                onChange={handleKotaId}
                size="lg"
              >
                {kotas.map((kota) => (
                  <option key={kota.id} value={kota.id}>
                    {kota.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <h3 className="mt-4 mb-3">Daftar Rental Motor</h3>
          {rentals.length > 0 && (
            <Col>
              <Row>
                {rentals.map((rental) => (
                  <Col key={rental.id} sm={12} md={6} lg={3}>
                    <Card>
                      <Card.Img
                        className="card-img-fixed"
                        variant="top"
                        src={rental.foto}
                        alt={rental.foto}
                      />
                      <Card.Body>
                        <Card.Title>{rental.nama}</Card.Title>
                        <Card.Text>{rental.alamat}</Card.Text>
                        <Link to={`/rental/${rental.id}`}>
                          <Button variant="primary" size="lg">
                            Pilih
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default CariRental;
