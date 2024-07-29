import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Rental = () => {
  const [rental, setRental] = useState(null);
  const [motors, setMotors] = useState([]);
  const { rentalId } = useParams();

  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  useEffect(() => {
    // cek role
    if (roleId != 3) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getRentalByRentalId();
    getMotorsByRentalId();
  }, [rental, motors]);

  const getRentalByRentalId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/rental?rentalId=${rentalId}`
      );
      const data = response.data;
      // console.log(data);

      setRental(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const getMotorsByRentalId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/motors?rentalId=${rentalId}`
      );
      const data = response.data;
      // console.log(data);

      setMotors(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  return (
    <Container className="mb-5">
      <Row className="mt-5"></Row>
      <Row className="mt-5 mb-3">
        <h1 className="fw-bold">Rental Motor {rental && rental.nama}</h1>
      </Row>

      <Row className="mt-4">
        {/* rental */}
        {rental && (
          <Col lg="3">
            <Card className="mb-4">
              <Card.Img
                className="card-img-fixed"
                variant="top"
                src={rental.foto}
                alt={rental.foto}
              />
              <Card.Body>
                <Card.Title>{rental.nama}</Card.Title>
                <Card.Text>{rental.alamat}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {/* motor */}
        <Col lg="9">
          <Row>
            {motors.map((motor) => (
              <Col lg="4" key={motor.id}>
                <Card className="mb-4">
                  <Card.Img
                    className="card-img-fixed"
                    variant="top"
                    src={motor.foto}
                    alt={motor.foto}
                  />
                  <Card.Body>
                    <Card.Title>{motor.nama}</Card.Title>
                    <Card.Text>Rp. {motor.harga} / Hari</Card.Text>
                    <Link
                      to={`/pesanan?rentalId=${rentalId}&motorId=${motor.id}`}
                    >
                      <Button variant="primary">Pilih</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Rental;
