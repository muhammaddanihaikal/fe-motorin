import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Pesanan = () => {
  const [motor, setMotor] = useState(null);
  const [rental, setRental] = useState(null);
  const [rentalId, setRentalId] = useState("");
  const [motorId, setMotorId] = useState("");
  const [jaminans, setJaminans] = useState([]);
  const [jaminanId, setJaminanId] = useState("1");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [pilihanLokasiAmbil, setPilihanLokasiAmbil] = useState("rental");
  const [pilihanLokasiKembali, setPilihanLokasiKembali] = useState("rental");
  const [lokasiAmbil, setLokasiAmbil] = useState("rental");
  const [lokasiKembali, setLokasiKembali] = useState("rental");
  const [waktuAmbil, setWaktuAmbil] = useState("");
  const [waktuKembali, setWaktuKembali] = useState("");
  const [durasi, setDurasi] = useState("0");
  const [totalHarga, setTotalHarga] = useState("0");
  const [penyewaId, setPenyewaId] = useState("");

  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

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

  const getPenyewaByUserId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/penyewa?userId=${userId}`
      );
      const data = response.data;
      // console.log(data);

      setPenyewaId(data.data.id);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const getMotorByMotorId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/motor?motorId=${motorId}`
      );
      const data = response.data;
      // console.log(data);

      setMotor(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const getAllJaminan = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/jaminans`
      );
      const data = response.data;
      // console.log(data);

      setJaminans(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const createPesanan = async (e) => {
    e.preventDefault(); // agar ga reload

    // console.log({
    //   motor,
    //   rental,
    //   rentalId,
    //   motorId,
    //   jaminans,
    //   jaminanId,
    //   tanggalMulai,
    //   tanggalSelesai,
    //   pilihanLokasiAmbil,
    //   pilihanLokasiKembali,
    //   lokasiAmbil,
    //   lokasiKembali,
    //   waktuAmbil,
    //   waktuKembali,
    //   durasi,
    //   totalHarga,
    // });

    try {
      // tembak ke api
      const response = await axios.post(`http://localhost:3000/api/pesanan`, {
        tanggalMulai,
        tanggalSelesai,
        lokasiAmbil,
        lokasiKembali,
        waktuAmbil,
        waktuKembali,
        jaminanId,
        penyewaId,
        motorId,
      });
      const data = response.data;

      if (response.status === 201) {
        // redirect ke halaman detail pesanan
        navigate(`/pesanan/${data.data.pesananId}`);
      }
    } catch (error) {
      console.error("Error :" + error.message);
      alert(error.response.data.message);
    }
  };

  const createPesanan2 = async (e) => {
    e.preventDefault(); // agar ga reload

    try {
      // tembak ke api
      const response = await axios.post(`http://localhost:3000/api/pesanan`, {
        tanggalMulai: "2024-07-30",
        tanggalSelesai: "2024-07-30",
        lokasiAmbil: "rental",
        lokasiKembali: "rental",
        waktuAmbil: "05:50",
        waktuKembali: "20:00",
        jaminanId: "2",
        penyewaId: "pfpod",
        motorId: "mmqhy",
      });
      const data = response.data;

      console.log(data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const handleJaminanId = (e) => {
    const jaminanId = e.target.value;
    setJaminanId(jaminanId);
  };

  const hitungDurasi = (mulai, selesai) => {
    const tanggalMulai = new Date(mulai);
    const tanggalSelesai = new Date(selesai);

    if (mulai && selesai) {
      const satuHari = 24 * 60 * 60 * 1000; // milidetik dalam satu hari
      const bedaHari =
        Math.round((tanggalSelesai - tanggalMulai) / satuHari) + 1;
      return bedaHari;
    }
  };

  useEffect(() => {
    // cek role
    if (roleId != 3) {
      navigate("/");
    }
    getPenyewaByUserId();
  }, []);

  // untuk perubahan motorId dan rentalId
  useEffect(() => {
    // ambil data rentalId dan motorId
    const searchParams = new URLSearchParams(window.location.search);
    const rentalIdParam = searchParams.get("rentalId");
    const motorIdParam = searchParams.get("motorId");
    // console.log({ motorIdParam, rentalIdParam });

    // set state rentalId dan motorId
    if (motorIdParam && rentalIdParam) {
      setRentalId(rentalIdParam);
      setMotorId(motorIdParam);
    }

    // set state rental dan motor
    if (rentalId) getRentalByRentalId();
    // ambil data motor
    if (motorId) getMotorByMotorId();

    // set state jaminan
    getAllJaminan();
  }, [motorId, rentalId]);

  // untuk perubahan tanggal
  useEffect(() => {
    // validasi: untuk set durasi
    if (tanggalMulai && tanggalSelesai) {
      const durasi = hitungDurasi(tanggalMulai, tanggalSelesai);
      setDurasi(durasi);
    }
  }, [tanggalMulai, tanggalSelesai]);

  useEffect(() => {
    // validasi: untuk set total harga
    if (motor && durasi > 0) {
      const hargaAmbil = lokasiAmbil === "rental" ? 0 : 10000;
      const hargaKembali = lokasiKembali === "rental" ? 0 : 10000;

      const total = motor.harga * durasi + hargaAmbil + hargaKembali;
      setTotalHarga(total);

      // console.log({
      //   durasi,
      //   hargaAmbil,
      //   hargaKembali,
      //   hargaMotor: motor.harga,
      //   totalHarga: total,
      // });
    }
  }, [motor, durasi, lokasiAmbil, lokasiKembali]);

  return (
    <Container className="mb-5">
      <Row className="mt-5"></Row>
      <Row className="mt-5 mb-3">
        <h1 className="fw-bold">Pesanan</h1>
      </Row>
      <Row>
        {/* inputan pesanan */}
        <Col lg="8" className="border rounded p-4">
          <Form onSubmit={createPesanan}>
            {/* tangal mulai */}
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Mulai</Form.Label>
              <Form.Control
                type="date"
                value={tanggalMulai}
                onChange={(e) => {
                  setTanggalMulai(e.target.value);
                }}
                placeholder=""
              />
            </Form.Group>

            {/* tangal selesai */}
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Selesai</Form.Label>
              <Form.Control
                type="date"
                value={tanggalSelesai}
                onChange={(e) => {
                  setTanggalSelesai(e.target.value);
                }}
                placeholder=""
              />
            </Form.Group>

            {/* ambil */}
            <Row>
              <Col>
                {/* lokasi ambil */}
                <Form.Group className="mb-3">
                  <Form.Label>Lokasi Ambil</Form.Label>
                  <Form.Control
                    as="select"
                    value={pilihanLokasiAmbil}
                    onChange={(e) => {
                      setPilihanLokasiAmbil(e.target.value);

                      // kalau pilih custom maka kosongkan lokasiAmbil
                      if (e.target.value === "custom") {
                        setLokasiAmbil("");
                      }
                    }}
                  >
                    <option value="rental">Rental</option>
                    <option value="custom">Custom</option>
                  </Form.Control>
                </Form.Group>

                {/* kalau pilihan custom */}
                {pilihanLokasiAmbil === "custom" && (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={lokasiAmbil}
                      onChange={(e) => {
                        setLokasiAmbil(e.target.value);
                      }}
                      placeholder="masukkan alamat lokasi ambil"
                    />
                  </Form.Group>
                )}
              </Col>
              <Col>
                {/* waktu ambil */}
                <Form.Group className="mb-3">
                  <Form.Label>Waktu Ambil</Form.Label>
                  <Form.Control
                    type="time"
                    value={waktuAmbil}
                    onChange={(e) => {
                      setWaktuAmbil(e.target.value);
                    }}
                    placeholder=""
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* kembali */}
            <Row>
              <Col>
                {/* lokasi kembali */}
                <Form.Group className="mb-3">
                  <Form.Label>Lokasi Kembali</Form.Label>
                  <Form.Control
                    as="select"
                    value={pilihanLokasiKembali}
                    onChange={(e) => {
                      setPilihanLokasiKembali(e.target.value);

                      // kalau pilih custom maka kosongkan lokasiKembali
                      if (e.target.value === "custom") {
                        setLokasiKembali("");
                      }
                    }}
                  >
                    <option value="rental">Rental</option>
                    <option value="custom">Custom</option>
                  </Form.Control>
                </Form.Group>

                {/* kalau pilihan custom */}
                {pilihanLokasiKembali === "custom" && (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={lokasiKembali}
                      onChange={(e) => {
                        setLokasiKembali(e.target.value);
                      }}
                      placeholder="masukkan alamat lokasi kembali"
                    />
                  </Form.Group>
                )}
              </Col>
              <Col>
                {/* waktu kembali */}
                <Form.Group className="mb-3">
                  <Form.Label>Waktu Kembali</Form.Label>
                  <Form.Control
                    type="time"
                    value={waktuKembali}
                    onChange={(e) => {
                      setWaktuKembali(e.target.value);
                    }}
                    placeholder=""
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* jaminan 1 */}
            <Form.Group className="mb-3">
              <Form.Label>Jaminan 1</Form.Label>
              <FormControl
                type="text"
                value="KTP (Wajib)"
                disabled
              ></FormControl>
            </Form.Group>

            {/* jaminan 2 */}
            <Form.Group className="mb-3">
              <Form.Label>Jaminan 2</Form.Label>
              <Form.Control
                as="select"
                value={jaminanId}
                onChange={handleJaminanId}
              >
                {jaminans.map((jaminan) => (
                  <option key={jaminan.id} value={jaminan.id}>
                    {jaminan.nama}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-1 w-100">
              Buat Pesanan
            </Button>
          </Form>
        </Col>

        {/* ringkasan */}
        <Col lg="4">
          {/* 
          // menampilkan :

          ringkasan data yang dipesan :
          -foto motor
          -nama motor
          -nama rental
          -alamat rental

          ringkasan harga :
          -harga motor
          -jumlah hari
          -hitung hargamotor * jumlah hari
          total harga

        */}

          {motor && (
            <Card>
              <Card.Img variant="top" src={motor.foto} />
              <Card.Body>
                <Card.Title className="text-center mb-3">
                  {motor.nama}
                </Card.Title>
                <Card.Text>
                  <strong>Nama Rental:</strong> {rental.nama}
                </Card.Text>
                <Card.Text>
                  <strong>Alamat Rental:</strong> {rental.alamat}
                </Card.Text>
                <Card.Text>
                  <strong>Harga Per Hari:</strong> Rp. {motor.harga}
                </Card.Text>
                <Card.Text>
                  <strong>Jumlah Hari:</strong> {durasi} Hari
                </Card.Text>
                <Card.Text>
                  <strong>Total Harga:</strong> Rp. {totalHarga}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Pesanan;
