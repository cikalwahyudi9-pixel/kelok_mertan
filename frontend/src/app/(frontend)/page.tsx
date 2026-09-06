import Link from 'next/link'
import Image from 'next/image'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Home() {
  const payload = await getPayload({ config: configPromise })
  const profilGlobal = await payload.findGlobal({ slug: 'profil' }) || {}

  let youtubeEmbedUrl = ''
  if (profilGlobal.video_youtube_url) {
    const url = profilGlobal.video_youtube_url;
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }
    if (videoId) {
      youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
  }

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-8 position-relative z-index-2">
              <span className="hero-badge">Selamat Datang di</span>
              <h1 className="hero-title mt-2">
                Jelajahi<br /><span className="accent">Dusun Mertan</span>
              </h1>
              <div className="mt-3 mb-2" style={{ fontSize: '1.3rem', fontWeight: 500, fontStyle: 'italic', color: '#FFD54F', letterSpacing: '0.5px' }}>
                "Mertan Guyub Rukun Handarbeni"
              </div>
              <p className="hero-subtitle mt-3 mb-4">
                Portal informasi mandiri yang menyajikan profil, potensi wisata kereta, UMKM, dan dokumentasi
                pemberdayaan di Dusun Mertan, Kulon Progo.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/profil" className="btn-primary-custom">
                  <i className="bi bi-compass-fill"></i> Jelajahi Mertan
                </Link>
                <Link href="/potensi" className="btn-outline-custom">
                  <i className="bi bi-leaf"></i> Lihat Potensi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VIDEO PROFIL SECTION ===== */}
      <section className="section-py section-bg-alt" id="video-profil">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <span className="section-label">Tentang Dusun</span>
              <h2 className="section-title">Mengenal Dusun Mertan</h2>
              <div className="divider"></div>
              <p className="mb-4 text-muted">
                Saksikan keindahan pemandangan jalur rel kereta api yang melintasi hamparan persawahan di Dusun Mertan melalui video profil
                kami. Jelajahi pesona alam dan keseharian masyarakat yang terekam dalam lensa.
              </p>
              {profilGlobal.video_youtube_url && (
                <a href={profilGlobal.video_youtube_url as string} target="_blank" rel="noopener noreferrer" className="btn-green mt-3">
                  <i className="bi bi-youtube"></i> Tonton di YouTube
                </a>
              )}
            </div>
            <div className="col-lg-7">
              {youtubeEmbedUrl ? (
                <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-md)', aspectRatio: '16/9' }}>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={youtubeEmbedUrl} 
                    title="Video Profil Desa Mertan" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              ) : (
                <div className="placeholder-content" style={{ borderRadius: '1rem', padding: '4rem 2rem' }}>
                  <div className="placeholder-icon">🎬</div>
                  <span className="placeholder-label">MENUNGGU VIDEO</span>
                  <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                    Video profil dusun akan ditampilkan di sini setelah produksi selesai.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEKILAS DUSUN MERTAN ===== */}
      <section className="section-py bg-light-custom position-relative" id="sekilas">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label mx-auto">Potensi & Identitas</span>
            <h2 className="section-title">Sekilas Dusun Mertan</h2>
            <div className="divider mx-auto"></div>
            <p className="section-desc">
              Dusun yang terletak di wilayah strategis, dengan potensi pertanian, wisata edukasi rel kereta api, UMKM lokal, dan kekayaan budaya.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <i className="bi bi-geo-alt-fill text-primary-custom fs-3 mb-2"></i>
                <span className="stat-number" style={{ fontSize: '1.1rem' }}>{profilGlobal.kecamatan || 'Sentolo'}</span>
                <span className="stat-label">Kecamatan</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <i className="bi bi-building text-primary-custom fs-3 mb-2"></i>
                <span className="stat-number" style={{ fontSize: '1.1rem' }}>{profilGlobal.kabupaten || 'Kulon Progo'}</span>
                <span className="stat-label">Kabupaten</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <i className="bi bi-tree-fill text-primary-custom fs-3 mb-2"></i>
                <span className="stat-label">Pertanian & Peternakan</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-card">
                <i className="bi bi-shop text-primary-custom fs-3 mb-2"></i>
                <span className="stat-label">UMKM Lokal</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/profil" className="btn-outline-green">
              <i className="bi bi-info-circle"></i> Lihat Profil Lengkap
            </Link>
          </div>
        </div>
      </section>

      {/* Add more sections dynamically fetched from Payload CMS later... */}
    </>
  )
}
