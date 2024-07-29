import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const ProfilPenyewa = () => {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [foto, setFoto] = useState(null); // untuk kirim data
  const [preview, setPreview] = useState(""); // untuk preview saja
  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getPenyewaByUserId = async () => {
    try {
      // ambil data profil penyewa
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/penyewa?userId=${userId}`
      );
      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        setNama(data.data.nama || "");
        setNoHp(data.data.noHp || "");
        setFoto(data.data.foto || null);
        setPreview(data.data.foto || "");
      }
      // alert(response.data.message);
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
  const updatePenyewaByUserId = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // ambil data dan isi ke form
    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("noHp", noHp);
    if (foto) formData.append("foto", foto);
    formData.append("userId", userId);

    try {
      // kirim data profil penyewa
      const response = await axios.put(
        `${import.meta.env.VITE_BE_BASE_URL}/api/penyewa`,
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

  useEffect(() => {
    // cek role
    if (roleId != 3) {
      navigate("/");
    }
    getPenyewaByUserId();
  }, []);

  return (
    <>
      <Container className="mb-5">
        <Row>
          <Col lg="3">
            <Sidebar />
          </Col>
          <Col lg="9">
            <Container>
              <Row className="mt-5"></Row>
              <Row className="mt-5 mb-3">
                <h1 className="fw-bold">Profil Penyewa</h1>
              </Row>
              <Row>
                <Col className="border rounded p-4">
                  {/* show foto profil */}
                  <div className="mb-3 text-center">
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

                  {/* form input profil penyewa */}
                  <Form onSubmit={updatePenyewaByUserId}>
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

                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-1 w-100"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Simpan"}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilPenyewa;
