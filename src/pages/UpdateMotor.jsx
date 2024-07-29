import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, FormGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateMotor = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [foto, setFoto] = useState(null); // untuk kirim data
  const [preview, setPreview] = useState(""); // untuk preview saja
  const { motorId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const navigate = useNavigate();

  const getMotorByMotorId = async () => {
    try {
      // ambil data profil penyewa
      const response = await axios.get(
        `${import.meta.env.VITE_BE_BASE_URL}/api/motor?motorId=${motorId}`
      );
      const data = response.data;
      // console.log(data);

      if (response.status === 200) {
        setNama(data.data.nama);
        setHarga(data.data.harga);
        setFoto(data.data.foto);
        setPreview(data.data.foto);
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

  // update data motor
  const updateMotorByMotorId = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(motorId);

    // ambil data dan isi ke form
    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("harga", harga);
    if (foto) formData.append("foto", foto);
    formData.append("motorId", motorId);

    try {
      // kirim data profil penyewa
      const response = await axios.put(
        `${import.meta.env.VITE_BE_BASE_URL}/api/motor`,
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
    if (roleId != 2) {
      navigate("/");
    }
    getMotorByMotorId();
  }, []);

  return (
    <Container>
      <Row className="mt-5"></Row>
      <Row className="mt-5 mb-3">
        {nama && <h1 className="fw-bold">Motor {nama}</h1>}
      </Row>
      <Row className="border rounded p-4 mb-3">
        {/* show foto motor */}
        <div className="mb-3">
          <img
            src={preview}
            alt="Foto Motor"
            className="rounded border mx-auto d-block"
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
          />
        </div>

        {/* form input profil penyewa */}
        <Form onSubmit={updateMotorByMotorId}>
          {/* nama */}
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan nama motor"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </Form.Group>

          {/* harga */}
          <Form.Group className="mb-3">
            <Form.Label>Harga (Rp.)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan harga motor per hari"
              className="no-spinner"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
            />
          </Form.Group>

          {/* foto motor */}
          <Form.Group className="mb-3">
            <Form.Label>Foto Motor</Form.Label>
            <Form.Control
              type="file"
              name="foto"
              placeholder="Masukkan foto motor"
              onChange={(e) => {
                setFoto(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="mt-3 mb-2 w-100"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Simpan"}
          </Button>

          <Button
            variant="secondary"
            className="w-100"
            onClick={() => history.back()} // Menggunakan history.goBack() untuk kembali ke halaman sebelumnya
          >
            Kembali
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default UpdateMotor;
