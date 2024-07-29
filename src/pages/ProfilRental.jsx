import { useState, useEffect } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ProfilRental = () => {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [kotas, setKotas] = useState([]);
  const [kotaId, setKotaId] = useState("");
  const [alamat, setAlamat] = useState("");
  const [foto, setFoto] = useState(null); // untuk kirim data
  const [preview, setPreview] = useState(""); // untuk preview saja

  const [banks, setBanks] = useState([]);
  const [bankId, setBankId] = useState("");
  const [noRekening, setNoRekening] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getAllKota = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/kotas`
      );
      const data = response.data;
      console.log(data);

      setKotas(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const getAllBank = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/banks");
      const data = response.data;
      console.log(data);

      setBanks(data.data);
    } catch (error) {
      console.error("Error :" + error.message);
    }
  };

  const getRentalByUserId = async () => {
    try {
      console.log("userId nich : " + userId);
      // ambil data profil rental
      const response = await axios.get(
        `http://localhost:3000/api/rental?userId=${userId}`
      );
      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        setNama(data.data.nama || "");
        setNoHp(data.data.noHp || "");
        setKotaId(data.data.kotaId || "");
        setAlamat(data.data.alamat || "");
        setFoto(data.data.foto || null);
        setPreview(data.data.foto || "");
        setBankId(data.data.bankId || "");
        setNoRekening(data.data.noRekening || "");
      }
    } catch (error) {
      if (error.response.data.message) {
        console.log(error.response.data.message);
        // alert(error.response.data.message);
      } else {
        console.error(error.message);
      }
    }
  };

  // simpan data profil penyewa
  const updateRentalByUserId = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ambil data dan isi ke form
    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("noHp", noHp);
    formData.append("kotaId", kotaId);
    formData.append("alamat", alamat);
    if (foto) formData.append("foto", foto);
    formData.append("bankId", bankId);
    formData.append("noRekening", noRekening);
    formData.append("userId", userId);

    try {
      // kirim data profil penyewa
      const response = await axios.put(
        "http://localhost:3000/api/rental",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      if (error.response.data.message) {
        console.log(error.response.data.message);
        // alert(error.response.data.message);
      } else {
        console.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKotaId = (e) => {
    const kotaId = e.target.value;
    setKotaId(kotaId);
  };

  const handleBankId = (e) => {
    const bankId = e.target.value;
    setBankId(bankId);
  };

  useEffect(() => {
    // cek role
    if (roleId != 2) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getRentalByUserId();
      getAllKota();
      getAllBank();
    }
  }, [userId]);

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
                <h1 className="fw-bold">Profil Rental</h1>
              </Row>
              <Row className="border rounded p-4 mb-3">
                {/* show foto profil */}
                <div className="mb-3">
                  <img
                    src={preview}
                    alt="Foto Profil"
                    className="rounded-circle mx-auto d-block"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <h3 className="mb-3 mt-3">Profil</h3>
                {/* form input profil penyewa */}
                <Form onSubmit={updateRentalByUserId}>
                  {/* nama */}
                  <Form.Group className="mb-3">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan nama lengkap anda"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </Form.Group>

                  {/* no hp */}
                  <Form.Group className="mb-3">
                    <Form.Label>No HP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan no hp anda"
                      value={noHp}
                      onChange={(e) => setNoHp(e.target.value)}
                    />
                  </Form.Group>

                  {/* kota */}
                  <Form.Group className="mb-3">
                    <Form.Label>Kota</Form.Label>
                    <Form.Control
                      as="select"
                      value={kotaId}
                      onChange={handleKotaId}
                    >
                      <option value="" disabled>
                        Pilih Kota
                      </option>
                      {kotas.map((kota) => (
                        <option key={kota.id} value={kota.id}>
                          {kota.nama}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* alamat */}
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={alamat}
                      onChange={(e) => {
                        setAlamat(e.target.value);
                      }}
                      placeholder="Masukkan alamat lengkap"
                    />
                  </Form.Group>

                  {/* foto profil */}
                  <Form.Group className="mb-3">
                    <Form.Label>Foto Profil</Form.Label>
                    <Form.Control
                      type="file"
                      name="foto"
                      placeholder="Masukkan foto profil anda"
                      onChange={(e) => {
                        setFoto(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </Form.Group>

                  <h3 className="mb-3 mt-5">Bank</h3>

                  {/* bank */}
                  <Form.Group className="mb-3">
                    <Form.Label>Bank</Form.Label>
                    <Form.Control
                      as="select"
                      value={bankId}
                      onChange={handleBankId}
                    >
                      <option value="" disabled>
                        Pilih Bank
                      </option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.id}>
                          {bank.nama}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* no rekening */}
                  <Form.Group className="mb-3">
                    <Form.Label>No Rekening</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan no rekening bank"
                      value={noRekening}
                      onChange={(e) => setNoRekening(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3 w-100"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Simpan"}
                  </Button>
                </Form>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilRental;
