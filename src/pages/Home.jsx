import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__fadeInLeft ">
                Sewa & Jelajahi <br /> <span>Keindahan Kota</span> <br />
                dengan Mudah!
              </h1>
              <p className="mb-4 animate__animated animate__fadeInLeft ">
                Nikmati pengalaman berkendara yang nyaman dan aman dengan
                layanan rental motor kami. Temukan pilihan motor yang sesuai
                dengan kebutuhan Anda.
              </p>
              <button
                className="btn btn-dark -btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInLeft animate__delay-1s"
                onClick={() => navigate("/cari-rental")}
              >
                Sewa Motor Sekarang
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt5">
              <img
                src={HeroImage}
                alt="hero-img"
                className="animate__animated animate__fadeInRight animate__delay-1s"
                style={{ width: "100%", height: "auto", marginLeft: "20px" }}
              />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Home;
