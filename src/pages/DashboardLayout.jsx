import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Tempat untuk menampilkan konten halaman */}
      </main>
    </div>
  );
};

export default DashboardLayout;
