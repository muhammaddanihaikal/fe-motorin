import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Sidebar = () => {
  const [studioNavOpen, setStudioNavOpen] = useState(false);
  const [reservationNavOpen, setReservationNavOpen] = useState(false);
  const [reviewNavOpen, setReviewNavOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");

  const toggleStudioNav = () => {
    setStudioNavOpen(!studioNavOpen);
  };

  const toggleReservationNav = () => {
    setReservationNavOpen(!reservationNavOpen);
  };

  const toggleReviewNav = () => {
    setReviewNavOpen(!reviewNavOpen);
  };

  return (
    <Container>
      <div className="sidebaradmin">
        <ul className="sidebar-nav" id="sidebar-nav">
          {/* profil */}
          {roleId === "3" && (
            <li className="nav-item">
              <a className="nav-link collapse" href="/penyewa/profil">
                <i className="fas fa-user"></i> {/* Icon Profile */}
                <span>Profil</span>
              </a>
            </li>
          )}

          {/* pesanan */}
          {roleId === "3" && (
            <li className="nav-item">
              <a className="nav-link collapse" href="/penyewa/pesanan">
                <i className="fas fa-receipt"></i> {/* Icon Pesanan */}
                <span>Pesanan</span>
              </a>
            </li>
          )}

          {roleId === "2" && (
            <>
              {/* profil */}
              <li className="nav-item">
                <a className="nav-link collapse" href="/rental/profil">
                  <i className="fas fa-user"></i> {/* Icon Profile */}
                  <span>Profil</span>
                </a>
              </li>

              {/* pesanan */}
              <li className="nav-item">
                <a className="nav-link collapse" href="/rental/pesanan">
                  <i className="fas fa-receipt"></i> {/* Icon Pesanan */}
                  <span>Pesanan</span>
                </a>
              </li>

              {/* motor */}
              <li className="nav-item">
                <a className="nav-link collapse" href="/rental/motor">
                  <i className="fas fa-motorcycle"></i> {/* Icon Motor */}
                  <span>Motor</span>
                </a>
              </li>

              {/* laporan */}
              <li className="nav-item">
                <a className="nav-link collapse" href="/rental/laporan">
                  <i className="fas fa-motorcycle"></i> {/* Icon Laporan */}
                  <span>Laporan</span>
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </Container>
  );
};

export default Sidebar;
