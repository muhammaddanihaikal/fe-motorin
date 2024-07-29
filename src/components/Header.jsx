import { Container, Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownToggleRef = useRef(null);
  const [dropdownWidth, setDropdownWidth] = useState("auto");
  const [profile, setProfile] = useState({ nama: "", foto: "" });

  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  const navigate = useNavigate();

  const getRentalByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/rental?userId=${userId}`
      );
      const data = response.data;

      if (response.status === 200) {
        setProfile({
          nama: data.data.nama || "",
          foto: data.data.foto || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const getPenyewaByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/penyewa?userId=${userId}`
      );
      const data = response.data;

      if (response.status === 200) {
        setProfile({
          nama: data.data.nama || "",
          foto: data.data.foto || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      localStorage.removeItem("userId");
      localStorage.removeItem("roleId");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (dropdownToggleRef.current) {
      setDropdownWidth(dropdownToggleRef.current.offsetWidth);
    }
  }, [showDropdown]);

  useEffect(() => {
    if (roleId == 2) {
      getRentalByUserId();
    } else {
      getPenyewaByUserId();
    }
  }, [profile]);

  return (
    <Navbar
      expand="lg"
      className=""
      style={{
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        position: "fixed", // Menetapkan posisi tetap
        top: 0, // Menempel di bagian atas
        left: 0, // Menempel di sisi kiri
        width: "100%", // Memastikan lebar header 100%
        zIndex: 1000, // Mengatur zIndex agar berada di atas konten lainnya
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="fs-5 fw-bold">
          MotorIn
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="mx-auto">
            <Nav.Link
              href="/"
              style={{ fontWeight: "bold", marginRight: "30px" }} // Menambahkan jarak antar link
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/cari-rental"
              style={{ fontWeight: "bold", marginRight: "30px" }} // Menambahkan jarak antar link
            >
              Pesan
            </Nav.Link>
            <Nav.Link
              href="/syarat-dan-ketentuan"
              style={{ fontWeight: "bold" }} // Menghapus margin untuk link terakhir
            >
              Syarat & Ketentuan
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            {userId ? (
              <Dropdown
                show={showDropdown}
                onToggle={handleDropdownToggle}
                align="end" // Mengatur dropdown ke kanan
              >
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  ref={dropdownToggleRef}
                >
                  <span className="">
                    <img
                      src={profile.foto}
                      alt="Profile"
                      style={{
                        borderRadius: "50%",
                        marginRight: "8px",
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                      }}
                    />
                    {profile.nama}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: dropdownWidth }}>
                  {roleId == 2 && (
                    <>
                      <Dropdown.Item href="/rental/profil">
                        Dashboard
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}
                  {roleId == 3 && (
                    <>
                      <Dropdown.Item href="/penyewa/profil">
                        Dashboard
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}
                  <Dropdown.Item onClick={handleLogout} className="text-danger">
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate("/register?roleId=2")}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
