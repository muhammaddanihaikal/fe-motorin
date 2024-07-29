import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatTanggal } from "../utils/tanggal";

const DetailPesanan = () => {
  const { pesananId } = useParams();
  const [pesanan, setPesanan] = useState(null);
  const [urlPembayaran, setUrlPembayaran] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getPesananByPesananId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/pesanan?pesananId=${pesananId}`
      );
      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        setPesanan(data.data);
        setUrlPembayaran(data.data.pembayaran.url);
      }
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const handleCreateTransaction = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      console.log({ urlPembayaran });
      if (urlPembayaran) {
        window.open(urlPembayaran);
      } else {
        const response = await axios.post(
          `${
            import.meta.env.VITE_BE_BASE_URL
          }/api/pembayaran?pesananId=${pesananId}`
        );
        const data = response.data;
        console.log(data);

        if (response.status === 200 && data.data.redirect_url) {
          window.open(data.data.redirect_url, "_blank");
        }
      }
    } catch (error) {
      console.error("Error :" + error.message);
    } finally {
      setIsLoading(false);
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
    getPesananByPesananId();
  }, [pesananId]);

  useEffect(() => {
    if (pesanan) {
      console.log(pesanan.pembayaran.url);
      setUrlPembayaran(pesanan?.pembayaran?.url || "");
    }
  }, [pesanan]);

  return (
    <Container className="p-4">
      <Row className="mt-5"></Row>
      <Row className="mt-3 mb-3">
        <h1 className="fw-bold">Detail Pesanan</h1>
      </Row>
      {pesanan && (
        <Container className="border rounded p-4">
          <Row className="mb-3">
            <Col lg="2">
              <small>Kode Pesanan</small>
              <h5>{pesanan.id}</h5>
            </Col>
            <Col lg="2">
              <small>Status Pesanan</small>
              <h5>
                <span
                  className="border rounded p-1"
                  style={getStatusStyle(pesanan.status)}
                >
                  {pesanan.status}
                </span>
              </h5>
            </Col>
          </Row>
          <Row className="d-flex justify-content-start mb-4">
            <Col lg="6" className="border rounded p-3">
              <h3 className="mb-3">Rental</h3>
              <Row>
                <Col>
                  <div className="motor-image">
                    <img
                      src={pesanan.rental.foto}
                      alt={pesanan.rental.foto}
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col>
                  <small>Nama</small>
                  <h5>{pesanan.rental.nama}</h5>
                  <small>Alamat</small>
                  <h5>{pesanan.rental.alamat}</h5>
                </Col>
              </Row>
            </Col>
            <Col lg="6" className="border rounded p-3 ml-3">
              <h3 className="mb-3">Motor</h3>
              <Row>
                <Col>
                  <div className="motor-image">
                    <img
                      src={pesanan.motor.foto}
                      alt={pesanan.motor.foto}
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col>
                  <small>Nama</small>
                  <h5>{pesanan.motor.nama}</h5>
                  <small>Harga</small>
                  <h5>Rp. {pesanan.motor.harga}</h5>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="d-flex justify-content-start mb-4">
            <Col lg="5" className="border rounded p-3">
              <h3 className="mb-3">Mulai</h3>
              <Row>
                <Col>
                  <small>Tanggal Mulai</small>
                  <h5>{formatTanggal(pesanan.tanggalMulai)}</h5>
                </Col>
                <Col>
                  <small>Waktu</small>
                  <h5>{pesanan.waktuAmbil}</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <small>Lokasi Ambil</small>
                  <h5>{pesanan.lokasiAmbil}</h5>
                </Col>
              </Row>
            </Col>
            <Col lg="5" className="border rounded p-3 ml-3">
              <h3 className="mb-3">Selesai</h3>
              <Row>
                <Col>
                  <small>Tanggal Selesai</small>
                  <h5>{formatTanggal(pesanan.tanggalSelesai)}</h5>
                </Col>
                <Col>
                  <small>Waktu</small>
                  <h5>{pesanan.waktuKembali}</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <small>Lokasi Ambil</small>
                  <h5>{pesanan.lokasiKembali}</h5>
                </Col>
              </Row>
            </Col>
            <Col lg="2" className="border rounded p-3">
              <h3 className="mb-3">Durasi</h3>
              <small>Waktu Durasi</small>
              <h5>{pesanan.durasi} Hari</h5>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col lg="6" className="border rounded p-3">
              <h3 className="mb-3">Penyewa</h3>
              <Row>
                <Col>
                  <small>Nama</small>
                  <h5>{pesanan.penyewa.nama}</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <small>No HP</small>
                  <h5>{pesanan.penyewa.noHp}</h5>
                </Col>
              </Row>
            </Col>
            <Col lg="6" className="border rounded p-3">
              <h3 className="mb-3">Jaminan</h3>
              <Row>
                <Col>
                  <small>Jaminan 1</small>
                  <h5>KTP</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <small>Jaminan 2</small>
                  <h5>{pesanan.jaminan}</h5>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className="border rounded p-3">
              <h3 className="mb-3">Pembayaran</h3>
              <Row>
                <Col>
                  <small>Total Harga</small>
                  <h5 style={{ fontSize: "32px" }}>Rp. {pesanan.totalHarga}</h5>
                </Col>
              </Row>
            </Col>
          </Row>
          {pesanan.pembayaran.status !== "settlement" && roleId != 2 && (
            <Button
              variant="primary"
              className="mt-4 mb-2 w-100"
              onClick={handleCreateTransaction}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Bayar"}
            </Button>
          )}
          <Button
            variant="secondary"
            className="w-100"
            onClick={() => navigate(-1)}
          >
            Kembali
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default DetailPesanan;
