import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const SyaratDanKetentuan = () => {
  return (
    <Container>
      <Row className="mt-5"></Row>
      <Row className="mt-5">
        <Col>
          <Container>
            <Row>
              <Col>
                <h1 className="text-center fw-bold mb-2">Syarat & Ketentuan</h1>
                <p className="text-center">
                  Ketentuan umum dalam melakukan penyewaan motor di layanan
                  kami.
                </p>
              </Col>
            </Row>
            <Row className="pt-5">
              <Col>
                <h4 className="fw-bold">1. Persyaratan Umum</h4>
                <p>
                  - Penyewa harus memiliki SIM C yang masih berlaku.
                  <br />
                  - Penyewa harus berusia minimal 17 tahun.
                  <br />- Penyewa harus menyediakan KTP atau identitas resmi
                  lainnya.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">2. Proses Penyewaan</h4>
                <p>
                  - Penyewa harus melakukan reservasi melalui website kami.
                  <br />
                  - Pembayaran harus dilakukan penuh sebelum penggunaan motor.
                  <br />- Bukti pembayaran harus diunggah dan diverifikasi oleh
                  pihak kami sebelum motor diambil.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">3. Ketentuan Penggunaan</h4>
                <p>
                  - Motor hanya boleh digunakan untuk keperluan pribadi, bukan
                  komersial.
                  <br />
                  - Penyewa bertanggung jawab atas kerusakan atau kehilangan
                  selama masa sewa.
                  <br />- Penyewa harus mematuhi semua peraturan lalu lintas
                  yang berlaku.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">4. Pengembalian Motor</h4>
                <p>
                  - Motor harus dikembalikan dalam kondisi yang sama seperti
                  saat disewa.
                  <br />
                  - Keterlambatan pengembalian akan dikenakan biaya tambahan
                  sesuai ketentuan.
                  <br />- Segala bentuk kerusakan harus dilaporkan segera saat
                  pengembalian.
                </p>
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">5. Jaminan</h4>
                <p>Penyewa harus menyediakan KTP (wajib).</p>
                <p>
                  Selain KTP, penyewa harus menyediakan salah satu dari dokumen
                  berikut sebagai jaminan:
                </p>
                <ul>
                  <li>Buku Nikah</li>
                  <li>SIM A/B</li>
                  <li>STNK</li>
                  <li>BPKB</li>
                  <li>NPWP</li>
                  <li>Paspor</li>
                  <li>Kartu Pegawai PNS</li>
                  <li>Kartu Anggota (TNI/Polri)</li>
                </ul>
              </Col>
            </Row>
            {/* <Row className="py-3">
              <Col>
                <h4 className="fw-bold">6. Pembatalan dan Pengembalian Dana</h4>
                <p>
                  - Pembatalan harus dilakukan minimal 24 jam sebelum waktu sewa.
                  <br />
                  - Pengembalian dana akan dikenakan biaya administrasi.
                  <br />- Pembatalan mendadak atau tidak hadir pada waktu sewa tidak mendapatkan pengembalian dana.
                </p>
              </Col>
            </Row> */}
            <Row className="py-3">
              <Col>
                <h4 className="fw-bold">6. Lain-lain</h4>
                <p>
                  - Pihak kami berhak mengubah syarat dan ketentuan ini tanpa
                  pemberitahuan terlebih dahulu.
                  <br />- Segala bentuk perselisihan akan diselesaikan secara
                  musyawarah atau melalui jalur hukum yang berlaku.
                </p>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SyaratDanKetentuan;
