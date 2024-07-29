import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const LaporanPenjualan = () => {
  // Mendapatkan bulan dan tahun saat ini
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() returns month from 0-11
  const currentYear = now.getFullYear();

  const [bulan, setBulan] = useState(currentMonth);
  const [tahun, setTahun] = useState(currentYear);
  const [motors, setMotors] = useState([]);
  const [totalKeseluruhan, setTotalKeseluruhan] = useState(0);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getLaporanPenjualan = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BE_BASE_URL
        }/api/pesanan/laporan?userId=${userId}&bulan=${bulan}&tahun=${tahun}`
      );
      const data = response.data;
      console.log(data);

      setMotors(data.data.penjualanPerMotor);
      setTotalKeseluruhan(data.data.totalKeseluruhan);
    } catch (error) {
      console.error("Error :" + error.message);
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    // cek role
    if (roleId != 2) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getLaporanPenjualan();
  }, [userId, bulan, tahun]);

  return (
    <>
      <Container>
        <Row>
          <Col lg="3">
            <Sidebar />
          </Col>
          <Col lg="9">
            <Container>
              <Row className="mt-5"></Row>

              <Row className="mb-3 mt-5">
                <h1 className="fw-bold">Laporan Penjualan</h1>
              </Row>

              {/* bulan & tahun */}
              <Row className="mb-4 d-flex justify-content-start">
                <Col lg="2">
                  <Form>
                    {/* bulan & tahun */}
                    <Form.Group className="mb-3">
                      <Form.Label>Cari Laporan</Form.Label>
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

                {/* <Col lg="2" className="d-flex align-items-center">
                  <Button variant="primary" type="submit" className="">
                    Cari
                  </Button>
                </Col> */}
              </Row>

              {/* tabel penjualan */}
              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Motor</th>
                        <th>Total Pendapatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {motors.map((motor, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{motor.nama}</td>
                          <td>Rp.{motor.totalPendapatan}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2" className="text-center">
                          <strong>Jumlah Total Pendapatan</strong>
                        </td>
                        <td>
                          <strong>Rp.{totalKeseluruhan}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LaporanPenjualan;
