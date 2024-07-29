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
          <Route index Component={Home}></Route>
          <Route path="cari-rental" Component={CariRental} />
          <Route path="rental/:rentalId" Component={Rental} />
          <Route path="pesanan" Component={Pesanan} />
          <Route path="pesanan/:pesananId" Component={DetailPesanan} />
          <Route path="syarat-dan-ketentuan" Component={SyaratDanKetentuan} />
          <Route path="rental/profil" Component={ProfilRental}></Route>
          <Route path="rental/pesanan" Component={PesananRental}></Route>
          <Route path="rental/motor/add" Component={AddMotor}></Route>
          <Route path="rental/motor/:motorId" Component={UpdateMotor}></Route>
          <Route path="rental/motor" Component={ListMotor}></Route>
          <Route path="rental/laporan" Component={LaporanPenjualan}></Route>
          <Route path="penyewa/pesanan" Component={PesananPenyewa} />
          <Route path="penyewa/profil" Component={ProfilPenyewa}></Route>
        </Route>

        <Route path="/register" Component={Register}></Route>
        <Route path="/login" Component={Login}></Route>

        <Route path="/select-role" Component={SelectRole}></Route>
        <Route path="/card" Component={ContohCard}></Route>
      </Routes>
    </div>
  );
}

export default App;
