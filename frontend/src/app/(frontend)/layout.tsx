import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import '../../../public/css/style.css' // Import existing CSS
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Jelajahi Dusun Mertan — Portal Informasi',
  description: 'Satu ruang digital untuk mengenal Dusun Mertan melalui profil, potensi wisata kereta, UMKM, kegiatan, dan hasil pemberdayaan masyarakat.',
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config: configPromise })
  const profilGlobal = await payload.findGlobal({ slug: 'profil' }) || {}
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
        {/* Navbar */}
        <nav className="navbar navbar-expand-xl navbar-jelajah" id="mainNavbar">
          <div className="container-fluid px-3 px-xl-5">
            <a className="navbar-brand navbar-brand-text" href="/">
              <i className="bi bi-train-front"></i> Jelajahi <span>Mertan</span>
            </a>
            <div className="d-flex align-items-center gap-2 ms-auto order-xl-last">
              <img src="/images/logokkn-Photoroom.png" alt="Logo KKN" style={{ height: '65px', width: 'auto' }} className="d-block" />
              <button className="navbar-toggler border-0 ms-2" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarMain" aria-controls="navbarMain"
                      aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/profil">Profil</a></li>
                <li className="nav-item"><a className="nav-link" href="/potensi">Kelok Mertan</a></li>
                <li className="nav-item"><a className="nav-link" href="/umkm">UMKM</a></li>
                <li className="nav-item"><a className="nav-link" href="/insight">Insight</a></li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarKelompokTani" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Kelompok Tani
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarKelompokTani">
                    <li><a className="dropdown-item" href="/profil/kelompok-tani/wanita">Kelompok Tani Wanita</a></li>
                    <li><a className="dropdown-item" href="/profil/kelompok-tani/pria">Kelompok Tani Pria</a></li>
                  </ul>
                </li>
                <li className="nav-item"><a className="nav-link" href="/kegiatan">Kegiatan</a></li>
                <li className="nav-item"><a className="nav-link" href="/galeri">Galeri</a></li>
                <li className="nav-item"><a className="nav-link" href="/program">Program</a></li>
                <li className="nav-item"><a className="nav-link" href="/edukasi">Edukasi</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main id="main-content">
          {children}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="footer-brand"><i className="bi bi-train-front"></i> Jelajahi <span>Mertan</span></div>
                <p className="footer-tagline">Mertan Guyub Rukun Handarbeni</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                  <i className="bi bi-geo-alt-fill me-1"></i>
                  {profilGlobal.nama_desa || 'Dusun Mertan'}, {profilGlobal.kecamatan || 'Sentolo'},<br />
                  {profilGlobal.kabupaten || 'Kulon Progo'}, {profilGlobal.provinsi || 'DI Yogyakarta'}
                </p>
                <div className="d-flex gap-2 flex-wrap mt-2" style={{ fontSize: '1.25rem' }}>
                  {profilGlobal.sosmed_instagram && (
                    <a href={profilGlobal.sosmed_instagram as string} target="_blank" rel="noopener noreferrer"
                       style={{ color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }} title="Instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                  )}
                  {profilGlobal.sosmed_facebook && (
                    <a href={profilGlobal.sosmed_facebook as string} target="_blank" rel="noopener noreferrer"
                       style={{ color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }} title="Facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                  )}
                  {profilGlobal.sosmed_youtube && (
                    <a href={profilGlobal.sosmed_youtube as string} target="_blank" rel="noopener noreferrer"
                       style={{ color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s' }} title="YouTube">
                      <i className="bi bi-youtube"></i>
                    </a>
                  )}
                </div>
                <div className="footer-disclaimer mt-3">
                  <i className="bi bi-info-circle me-1"></i>
                  Platform Informasi Mandiri
                </div>
              </div>

              <div className="col-lg-2 col-md-3 col-6">
                <h6 className="footer-heading">Jelajahi</h6>
                <ul className="footer-links">
                  <li><a href="/profil">Profil Dusun</a></li>
                  <li><a href="/potensi">Kelok Mertan</a></li>
                  <li><a href="/umkm">UMKM Mitra</a></li>
                  <li><a href="/galeri">Galeri</a></li>
                </ul>
              </div>

              <div className="col-lg-2 col-md-3 col-6">
                <h6 className="footer-heading">Informasi</h6>
                <ul className="footer-links">
                  <li><a href="/profil/kelompok-tani/wanita">Kelompok Tani Wanita</a></li>
                  <li><a href="/profil/kelompok-tani/pria">Kelompok Tani Pria</a></li>
                  <li><a href="/kegiatan">Kegiatan</a></li>
                  <li><a href="/program">Program</a></li>
                  <li><a href="/edukasi">Edukasi</a></li>
                  <li><a href="/insight">Insight</a></li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6">
                <h6 className="footer-heading">Tentang Website</h6>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                  Jelajahi Mertan adalah platform informasi mandiri yang dikembangkan
                  sebagai luaran program KKN Universitas Diponegoro di Dusun Mertan.
                </p>
                <a href="#" style={{ fontSize: '0.82rem', color: '#FFD54F' }}>
                  Selengkapnya <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="container">
              <span>© 2026 Jelajahi Mertan.</span>
              <span className="mx-2">·</span>
              <span>Dikembangkan oleh Tim KKN Universitas Diponegoro</span>
              <span className="mx-2">·</span>
              <a href="#" style={{ color: 'rgba(255,255,255,0.4)' }}>Platform Informasi Mandiri</a>
            </div>
          </div>
        </footer>

        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/main.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
