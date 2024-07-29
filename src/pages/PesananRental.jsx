import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { formatTanggal } from "../utils/tanggal";

const PesananRental = () => {
  // Mendapatkan bulan dan tahun saat ini
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() returns month from 0-11
  const currentYear = now.getFullYear();

  const [bulan, setBulan] = useState(currentMonth);
  const [tahun, setTahun] = useState(currentYear);
  const [pesanans, setPesanans] = useState([]);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getPesanansByRentalId = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BE_BASE_URL
        }/api/pesanan/rental?userId=${userId}&bulan=${bulan}&tahun=${tahun}`
      );
      const data = response.data;
      console.log(data);

      setPesanans(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
      console.log(error.response.data.message);
    }
  };

  // status pesanan style
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          backgroundColor: "#FFC107",
          borderColor: "#FFC107",
          color: "black",
        };
      case "success":
        return {
          backgroundColor: "#4CAF50",
          borderColor: "#4CAF50",
          color: "white",
        };
      case "selesai":
        return {
          backgroundColor: "#2196F3",
          borderColor: "#2196F3",
          color: "white",
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    // cek role
    if (roleId != 2) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getPesanansByRentalId();
  }, [userId, bulan, tahun]);

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
                <h1 className="fw-bold">Pesanan Rental</h1>
              </Row>

              {/* bulan & tahun */}
              <Row className="mb-4 d-flex justify-content-start">
                <Col lg="2">
                  <Form>
                    {/* bulan & tahun */}
                    <Form.Group className="mb-3">
                      <Form.Label>Cari Pesanan</Form.Label>
                      <Form.Control
                        type="month"
                        value={`${tahun}-${bulan < 10 ? `0${bulan}` : bulan}`}
                        onChange={(e) => {
                          const [year, month] = e.target.value.split("-");
                          setTahun(parseInt(year));
                          setBulan(parseInt(month));
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>

              {pesanans && pesanans.length > 0 ? (
                <Row>
                  {pesanans.map((pesanan) => (
                    <Col key={pesanan.id} lg="4">
                      {" "}
                      {/* perbaikan disini */}
                      <Card className="mb-4">
                        <Card.Img variant="top" src={pesanan.motor.foto} />
                        <Card.Body>
                          <Card.Title className="text-center">
                            {pesanan.motor.nama || "Nama Motor"}
                          </Card.Title>
                          <Card.Text as="div">
                            <p>
                              <strong>Nama Penyewa:</strong>{" "}
                              {pesanan.penyewa.nama}
                              <br />
                              <strong>No Hp Penyewa:</strong>{" "}
                              {pesanan.penyewa.noHp}
                            </p>
                            <hr />
                            <p>
                              <strong>Tanggal Mulai:</strong>{" "}
                              {formatTanggal(pesanan.tanggalMulai)}
                              <br />
                              <strong>Tanggal Selesai:</strong>{" "}
                              {formatTanggal(pesanan.tanggalSelesai)}
                              <br />
                              <strong>Durasi:</strong> {pesanan.durasi} hari
                            </p>
                            <hr />
                            <p>
                              <strong>Status:</strong>{" "}
                              <span
                                className="p-1 border rounded text-white"
                                style={getStatusStyle(pesanan.status)}
                              >
                                {pesanan.status}
                              </span>
                            </p>
                          </Card.Text>
                          <Button
                            as={Link}
                            to={`/pesanan/${pesanan.id}`}
                            variant="primary"
                            className=""
                          >
                            Lihat Detail
                          </Button>
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

export default PesananRental;
