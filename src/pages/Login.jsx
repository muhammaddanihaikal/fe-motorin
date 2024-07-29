import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectRole from "./SelectRole"; // Pastikan Anda mengimpor komponen SelectRole

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_BASE_URL}/api/login`,
        {
          email,
          password,
        }
      );
      const data = response.data;
      console.log(data);

      if (response.status === 200) {
        alert(response.data.message);

        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("roleId", data.data.roleId);

        if (data.data.roleId == 2) {
          navigate("/rental/profil");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error(errorMessage);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center min-vh-100">
        <Col lg="6">
          <h1 className="mb-3 fw-bold">Login</h1>
          <div className="border rounded p-4 mb-3">
            <Form onSubmit={login}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukkan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan password anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mt-3 mb-2 w-100"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>

              <Button
                variant="secondary"
                className="w-100"
                onClick={() => window.history.back()}
              >
                Kembali
              </Button>
            </Form>
            <div className="mt-2">
              <p>
                Belum memiliki akun?{" "}
                <Button
                  variant="link"
                  onClick={() => setShowModal(true)}
                  className="p-0"
                >
                  Register
                </Button>
              </p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Modal untuk memilih role */}
      <SelectRole show={showModal} handleClose={() => setShowModal(false)} />
    </Container>
  );
};

export default Login;
