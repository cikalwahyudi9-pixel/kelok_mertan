import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Script from 'next/script'

export const metadata = {
  title: 'Profil Desa - Jelajah Mertan',
  description: 'Profil Desa Mertan — informasi identitas, sejarah, kondisi wilayah, demografi, dan lokasi.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProfilPage() {
  const payload = await getPayload({ config: configPromise })

  const profilGlobal = await payload.findGlobal({
    slug: 'profil',
  })

  // We don't have Fasilitas in payload currently, so we'll mock it or leave it empty based on schema
  const profil = profilGlobal || {}

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Profil Desa</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Profil Desa {profil.nama_desa || 'Mertan'}</h1>
          <p className="page-hero-sub">
            {profil.kecamatan || 'Sentolo'}, {profil.kabupaten || 'Kulon Progo'}, {profil.provinsi || 'DI Yogyakarta'}
          </p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          <ul className="nav nav-pills mb-4 flex-wrap gap-2" id="profilTab">
            <li className="nav-item">
              <a className="nav-link active filter-btn" href="#tentang" data-bs-toggle="pill">
                <i className="bi bi-info-circle me-1"></i> Tentang Desa
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link filter-btn" href="#sejarah" data-bs-toggle="pill">
                <i className="bi bi-book me-1"></i> Sejarah
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link filter-btn" href="#kondisi" data-bs-toggle="pill">
                <i className="bi bi-map me-1"></i> Kondisi Wilayah
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link filter-btn" href="#demografi" data-bs-toggle="pill">
                <i className="bi bi-people me-1"></i> Demografi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link filter-btn" href="#lokasi" data-bs-toggle="pill">
                <i className="bi bi-geo-alt me-1"></i> Lokasi
              </a>
            </li>
          </ul>

          <div className="tab-content" id="profilTabContent">

            {/* Tentang Desa */}
            <div className="tab-pane fade show active" id="tentang">
              <div className="row g-4">
                <div className="col-lg-7">
                  <span className="section-label">Identitas Desa</span>
                  <h2 className="section-title">Desa {profil.nama_desa || 'Mertan'}</h2>
                  <div className="divider"></div>

                  {profil.deskripsi_singkat ? (
                    <p>{profil.deskripsi_singkat}</p>
                  ) : (
                    <div className="placeholder-content">
                      <span className="placeholder-label">DATA BELUM TERSEDIA</span>
                      <p className="mt-2 mb-0" style={{ fontSize: '0.88rem' }}>
                        Deskripsi desa sedang dalam proses pengisian.
                      </p>
                    </div>
                  )}

                  <div className="row g-3 mt-3">
                    <div className="col-sm-6">
                      <div className="card-custom p-3">
                        <small className="text-muted">Kecamatan</small>
                        <div className="fw-bold">{profil.kecamatan || '-'}</div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card-custom p-3">
                        <small className="text-muted">Kabupaten</small>
                        <div className="fw-bold">{profil.kabupaten || '-'}</div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card-custom p-3">
                        <small className="text-muted">Provinsi</small>
                        <div className="fw-bold">{profil.provinsi || '-'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-5">
                  <div className="placeholder-content" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="placeholder-icon">🏡</div>
                    <span className="placeholder-label">FOTO DESA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sejarah */}
            <div className="tab-pane fade" id="sejarah">
              <h2 className="section-title">Sejarah Desa</h2>
              <div className="divider"></div>
              {profil.sejarah ? (
                <div className="content-html" dangerouslySetInnerHTML={{ __html: profil.sejarah }} />
              ) : (
                <div className="placeholder-content">
                  <div className="placeholder-icon">📜</div>
                  <span className="placeholder-label">DATA SEJARAH DESA BELUM TERSEDIA</span>
                </div>
              )}
            </div>

            {/* Kondisi Wilayah */}
            <div className="tab-pane fade" id="kondisi">
              <h2 className="section-title">Kondisi & Wilayah</h2>
              <div className="divider"></div>
              {profil.kondisi_wilayah ? (
                <div className="content-html" dangerouslySetInnerHTML={{ __html: profil.kondisi_wilayah }} />
              ) : (
                <div className="placeholder-content">
                  <div className="placeholder-icon">🗺️</div>
                  <span className="placeholder-label">DATA KONDISI WILAYAH BELUM TERSEDIA</span>
                </div>
              )}
            </div>

            {/* Demografi */}
            <div className="tab-pane fade" id="demografi">
              <h2 className="section-title">Demografi</h2>
              <div className="divider"></div>
              {profil.demografi ? (
                <div className="content-html" dangerouslySetInnerHTML={{ __html: profil.demografi }} />
              ) : (
                <div className="placeholder-content">
                  <div className="placeholder-icon"><i className="bi bi-people"></i></div>
                  <span className="placeholder-label">DATA DEMOGRAFI BELUM TERSEDIA</span>
                </div>
              )}
            </div>

            {/* Lokasi */}
            <div className="tab-pane fade" id="lokasi">
              <h2 className="section-title">Lokasi Desa</h2>
              <div className="divider"></div>
              <p><i className="bi bi-geo-alt-fill text-primary-custom"></i>
                {profil.nama_desa || 'Mertan'}, {profil.kecamatan || 'Sentolo'}, {profil.kabupaten || 'Kulon Progo'}
              </p>

              {profil.maps_embed_url ? (
                <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                  <iframe src={profil.maps_embed_url}
                          width="100%" height="450" style={{ border: 0 }} allowFullScreen
                          loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                          title="Lokasi Desa di Google Maps">
                  </iframe>
                </div>
              ) : (
                <div className="placeholder-content">
                  <div className="placeholder-icon"><i className="bi bi-geo-alt"></i></div>
                  <span className="placeholder-label">PETA BELUM DIKONFIGURASI</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="lazyOnload" />
    </>
  )
}
