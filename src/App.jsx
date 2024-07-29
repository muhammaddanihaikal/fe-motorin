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
        <Route path="/" Component={MainLayout}>
          <Route index Component={Home} />
          <Route path="cari-rental" element={<CariRental />} />
          <Route path="rental/:rentalId" Component={Rental} />
          <Route path="pesanan" Component={Pesanan} />
          <Route path="pesanan/:pesananId" Component={DetailPesanan} />
          <Route path="syarat-dan-ketentuan" Component={SyaratDanKetentuan} />
          <Route path="rental/profil" Component={ProfilRental} />
          <Route path="rental/pesanan" Component={PesananRental} />
          <Route path="rental/motor/add" Component={AddMotor} />
          <Route path="rental/motor/:motorId" Component={UpdateMotor} />
          <Route path="rental/motor" Component={ListMotor} />
          <Route path="rental/laporan" Component={LaporanPenjualan} />
          <Route path="penyewa/pesanan" Component={PesananPenyewa} />
          <Route path="penyewa/profil" Component={ProfilPenyewa} />
        </Route>

        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />

        <Route path="/select-role" Component={SelectRole} />
        <Route path="/card" Component={ContohCard} />
      </Routes>
    </div>
  );
}

export default App;
