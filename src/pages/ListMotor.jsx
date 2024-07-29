import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ListMotor = () => {
  const [motors, setMotors] = useState([]);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getMotorsByUserId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/motors?userId=${userId}`
      );
      const data = response.data;
      console.log(data);

      setMotors(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  useEffect(() => {
    // cek role
    if (roleId != 2) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getMotorsByUserId();
  }, [userId, motors]);

  return (
    <>
      <Container>
        <Row>
          <Col lg="3">
            <Sidebar />
          </Col>
          <Col lg="9">
            <Container className="mt-3">
              <Row className="mt-5"></Row>
              <Row className="mt-5 mb-3">
                <h1 className="fw-bold">List Motor</h1>
              </Row>

              {/* tambah motor */}
              <Row className=" d-flex justify-content-end">
                <Col lg="2">
                  <Link to={"/rental/motor/add"}>
                    <Button variant="primary">Tambah Motor</Button>
                  </Link>
                </Col>
              </Row>

              {motors && motors.length > 0 ? (
                <Row className=" p-4">
                  {motors.map((motor) => (
                    <Col key={motor.id} lg="4">
                      <Card className="mb-4">
                        <Card.Img
                          variant="top"
                          src={motor.foto}
                          style={{
                            width: "100%",
                            height: "300px",
                            objectFit: "contain",
                          }}
                        />
                        <Card.Body>
                          <Card.Title className="text-center">
                            {motor.nama || "Nama Motor"}
                          </Card.Title>
                          <Card.Text>
                            <strong>Harga Per Hari</strong>
                            <p>Rp. {motor.harga}</p>
                          </Card.Text>

                          <Link to={`/rental/motor/${motor.id}`}>
                            <Button variant="primary">Lihat Detail</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row>
                  <Col>
                    <p>Belum ada pesanan.</p>
                  </Col>
                </Row>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ListMotor;
