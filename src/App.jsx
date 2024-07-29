import { Routes, Route } from "react-router-dom";
import CariRental from "./pages/CariRental";
import Rental from "./pages/Rental";
import Pesanan from "./pages/Pesanan";
import DetailPesanan from "./pages/DetailPesanan";
import PesananPenyewa from "./pages/PesananPenyewa";
import ProfilPenyewa from "./pages/ProfilPenyewa";
import ProfilRental from "./pages/ProfilRental";
import PesananRental from "./pages/PesananRental";
import AddMotor from "./pages/AddMotor";
import UpdateMotor from "./pages/UpdateMotor";
import ListMotor from "./pages/ListMotor";
import LaporanPenjualan from "./pages/LaporanPenjualan";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SyaratDanKetentuan from "./pages/SyaratDanKetentuan";
import MainLayout from "./pages/MainLayout";
import DashboardLayout from "./pages/DashboardLayout";

import SelectRole from "./pages/SelectRole";
import ContohCard from "./pages/ContohCard";

function App() {
  return (
    <div>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="cari-rental" element={<CariRental />} />
          <Route path="rental/:rentalId" element={<Rental />} />
          <Route path="pesanan" element={<Pesanan />} />
          <Route path="pesanan/:pesananId" element={<DetailPesanan />} />
          <Route path="syarat-dan-ketentuan" element={<SyaratDanKetentuan />} />
          <Route path="rental/profil" element={<ProfilRental />} />
          <Route path="rental/pesanan" element={<PesananRental />} />
          <Route path="rental/motor/add" element={<AddMotor />} />
          <Route path="rental/motor/:motorId" element={<UpdateMotor />} />
          <Route path="rental/motor" element={<ListMotor />} />
          <Route path="rental/laporan" element={<LaporanPenjualan />} />
          <Route path="penyewa/pesanan" element={<PesananPenyewa />} />
          <Route path="penyewa/profil" element={<ProfilPenyewa />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/card" element={<ContohCard />} />
      </Routes>
    </div>
  );
}

export default App;
