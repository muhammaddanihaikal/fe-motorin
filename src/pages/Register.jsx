import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [roleId, setRoleId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleIdFromQuery = queryParams.get("roleId");
    if (roleIdFromQuery) {
      setRoleId(roleIdFromQuery);
    } else {
      // Jika roleId tidak ditemukan, arahkan kembali ke halaman pemilihan
      navigate("/select-role");
    }
  }, [location.search, navigate]);

  const register = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      alert("Password dan Konfirmasi Password tidak cocok");
      return;
    }

    setIsLoading(true);

    try {
      console.log({ email, password, confPassword, roleId });
      const response = await axios.post(
        `${import.meta.env.VITE_BE_BASE_URL}/api/register`,
        {
          email,
          password,
          confPassword,
          roleId,
        }
      );

      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
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
          <h1 className="mb-3">Register</h1>
          <div className="border rounded p-4 mb-3">
            <Form onSubmit={register}>
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

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Masukkan konfirmasi password anda"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mt-3 mb-2 w-100"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}
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
                Sudah memiliki akun? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
