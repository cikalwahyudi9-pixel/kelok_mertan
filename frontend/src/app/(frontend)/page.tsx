import Link from 'next/link'
import Image from 'next/image'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Home() {
  const payload = await getPayload({ config: configPromise })
  const profilGlobal = await payload.findGlobal({ slug: 'profil' }) || {}

  const { docs: umkmList } = await payload.find({
    collection: 'umkm',
    limit: 4,
  })

  let { docs: programList } = await payload.find({
    collection: 'program',
    where: { is_featured: { equals: true } },
    limit: 3,
    sort: 'urutan',
  })
  
  if (programList.length === 0) {
    const fallback = await payload.find({
      collection: 'program',
      limit: 3,
      sort: 'urutan',
    })
    programList = fallback.docs
  }

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
              <h2 className="section-title">{(profilGlobal.judul_video_profil as string) || 'Mengenal Dusun Mertan'}</h2>
              <div className="divider"></div>
              <p className="mb-4 text-muted">
                {(profilGlobal.deskripsi_video as string) || 'Saksikan keindahan pemandangan jalur rel kereta api yang melintasi hamparan persawahan di Dusun Mertan melalui video profil kami. Jelajahi pesona alam dan keseharian masyarakat yang terekam dalam lensa.'}
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

      {/* ===== UMKM SECTION ===== */}
      <section className="section-py" id="umkm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="section-label">Potensi Ekonomi</span>
              <h2 className="section-title">UMKM Mitra KKN</h2>
              <div className="divider"></div>
            </div>
            <Link href="/umkm" className="btn-outline-custom d-none d-md-inline-block">
              Lihat Semua UMKM <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {umkmList.length > 0 ? (
            <div className="row g-4">
              {umkmList.map((umkm) => (
                <div key={umkm.id} className="col-lg-3 col-md-6">
                  <div className="umkm-card h-100 d-flex flex-column">
                    {umkm.foto_usaha && typeof umkm.foto_usaha === 'object' && umkm.foto_usaha.url ? (
                      <div className="umkm-card-img" style={{ backgroundImage: `url(${umkm.foto_usaha.url})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '180px', width: '100%', borderRadius: '12px 12px 0 0' }}></div>
                    ) : (
                      <div className="umkm-card-img d-flex align-items-center justify-content-center"
                        style={{ height: '180px', backgroundColor: '#e9ecef', borderRadius: '12px 12px 0 0' }}>
                        <i className="bi bi-shop text-muted" style={{ fontSize: '3rem' }}></i>
                      </div>
                    )}
                    
                    <div className="umkm-card-body d-flex flex-column flex-grow-1">
                      <h3 className="umkm-card-name" style={{ fontSize: '1.1rem' }}>{umkm.nama_usaha}</h3>
                      {umkm.pemilik && <p className="umkm-card-produk mb-1" style={{ fontSize: '0.85rem' }}><i className="bi bi-person"></i> {umkm.pemilik}</p>}
                      {umkm.lokasi && <p className="umkm-card-produk mb-3" style={{ fontSize: '0.85rem' }}><i className="bi bi-geo-alt"></i> {umkm.lokasi}</p>}
                      
                      <div className="mt-auto">
                        <Link href={`/umkm/${umkm.id}`} className="btn-green w-100 text-center" style={{ fontSize: '0.82rem', padding: '0.4rem' }}>
                          Detail <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <span className="placeholder-label">BELUM ADA DATA UMKM</span>
            </div>
          )}
          
          <div className="text-center mt-4 d-md-none">
            <Link href="/umkm" className="btn-outline-custom">
              Lihat Semua UMKM <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROGRAM PEMBERDAYAAN SECTION ===== */}
      <section className="section-py section-bg-alt" id="program">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-label mx-auto">Aksi Nyata</span>
            <h2 className="section-title">Program Pemberdayaan</h2>
            <div className="divider mx-auto"></div>
            <p className="section-desc">
              Inisiatif dan program kerja unggulan yang dilaksanakan bersama masyarakat untuk kemajuan Dusun Mertan.
            </p>
          </div>

          {programList.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {programList.map((item) => {
                const thumbUrl = item.thumbnail && typeof item.thumbnail === 'object' && item.thumbnail.url ? item.thumbnail.url : null;
                return (
                  <div key={item.id} className="col-lg-4 col-md-6">
                    <div className="card-custom h-100 p-0 overflow-hidden d-flex flex-column shadow-sm border-0">
                      {thumbUrl ? (
                        <img src={thumbUrl} alt={item.nama} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ height: '200px', background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)' }}>
                          <i className="bi bi-briefcase text-success opacity-50" style={{ fontSize: '3rem' }}></i>
                        </div>
                      )}
                      <div className="p-4 d-flex flex-column flex-grow-1 bg-white">
                        {item.kategori && <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 mb-2 align-self-start" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>{item.kategori}</span>}
                        <h3 className="fw-bold mb-3" style={{ fontSize: '1.2rem', color: '#004d40' }}>{item.nama}</h3>
                        {item.sasaran && <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}><i className="bi bi-people me-1"></i> {item.sasaran}</p>}
                        
                        <div className="mt-auto pt-3 border-top">
                          <Link href={`/program/${item.id}`} className="text-primary-custom text-decoration-none fw-medium" style={{ fontSize: '0.9rem' }}>
                            Pelajari Program <i className="bi bi-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="placeholder-content">
              <span className="placeholder-label">BELUM ADA PROGRAM</span>
            </div>
          )}

          <div className="text-center mt-5">
            <Link href="/program" className="btn-primary-custom">
              Lihat Seluruh Program
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
