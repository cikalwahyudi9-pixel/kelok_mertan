import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Kegiatan Desa - Jelajah Mertan',
  description: 'Berita acara dan dokumentasi kegiatan Desa Mertan.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const KATEGORI_LABEL: Record<string, string> = {
  masyarakat: 'Kegiatan Masyarakat',
  posyandu: 'Posyandu',
  pemberdayaan: 'Pemberdayaan',
  desa: 'Kegiatan Desa',
  kkn: 'Program KKN',
  lainnya: 'Lainnya',
}

export default async function KegiatanPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: kegiatanList } = await payload.find({
    collection: 'kegiatan',
    limit: 100,
    sort: '-tanggal',
  })

  const aktif = kegiatanList.filter((k: any) => !k.is_arsip)
  const arsip = kegiatanList.filter((k: any) => k.is_arsip)

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Kegiatan</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Berita & Kegiatan</h1>
          <p className="page-hero-sub">Dokumentasi kegiatan dan agenda terbaru</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {kegiatanList.length > 0 ? (
            <>
              {/* Kegiatan Aktif */}
              {aktif.length > 0 && (
                <div className="mb-5">
                  <h2 className="section-title mb-4">Kegiatan Terbaru</h2>
                  <div className="row g-4">
                    {aktif.map((item: any) => (
                      <div key={item.id} className="col-lg-4 col-md-6">
                        <div className="card-custom h-100 overflow-hidden d-flex flex-column">
                          {item.foto && typeof item.foto === 'object' && item.foto.url ? (
                            <img src={item.foto.url} alt={item.judul}
                              style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                          ) : (
                            <div className="d-flex align-items-center justify-content-center"
                              style={{ height: '200px', background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', fontSize: '3rem', color: 'var(--color-primary)' }}>
                              <i className="bi bi-calendar-event"></i>
                            </div>
                          )}
                          <div className="p-4 d-flex flex-column flex-grow-1">
                            {item.kategori && (
                              <span className="card-category-badge mb-2 d-inline-block" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                                {KATEGORI_LABEL[item.kategori] || item.kategori}
                              </span>
                            )}
                            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>{item.judul}</h3>
                            <div className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
                              {item.tanggal && <span className="me-3"><i className="bi bi-calendar3"></i> {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                              {item.waktu && <span className="me-3"><i className="bi bi-clock"></i> {item.waktu}</span>}
                              {item.lokasi && <span><i className="bi bi-geo-alt"></i> {item.lokasi}</span>}
                            </div>
                            <div className="mt-auto pt-3 border-top">
                              <a href={`/kegiatan/${item.id}`} className="text-primary-custom" style={{ textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                Baca Selengkapnya <i className="bi bi-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Arsip */}
              {arsip.length > 0 && (
                <div>
                  <h2 className="section-title mb-4">Arsip Kegiatan</h2>
                  <div className="row g-3">
                    {arsip.map((item: any) => (
                      <div key={item.id} className="col-12">
                        <div className="card-custom p-3 d-flex align-items-center gap-3" style={{ opacity: 0.8 }}>
                          {item.foto && typeof item.foto === 'object' && item.foto.url ? (
                            <img src={item.foto.url} alt={item.judul}
                              className="rounded" style={{ width: '70px', height: '70px', objectFit: 'cover', flexShrink: 0 }} />
                          ) : (
                            <div className="rounded d-flex align-items-center justify-content-center bg-light flex-shrink-0"
                              style={{ width: '70px', height: '70px', fontSize: '1.8rem', color: '#aaa' }}>
                              <i className="bi bi-archive"></i>
                            </div>
                          )}
                          <div className="flex-grow-1">
                            <span className="badge bg-secondary me-2" style={{ fontSize: '0.7rem' }}>Arsip</span>
                            <strong>{item.judul}</strong>
                            <div className="text-muted" style={{ fontSize: '0.82rem' }}>
                              {item.tanggal && <span className="me-3"><i className="bi bi-calendar3"></i> {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                              {item.lokasi && <span><i className="bi bi-geo-alt"></i> {item.lokasi}</span>}
                            </div>
                          </div>
                          <a href={`/kegiatan/${item.id}`} className="text-primary-custom text-decoration-none" style={{ fontWeight: 600, fontSize: '0.85rem', flexShrink: 0 }}>
                            Lihat <i className="bi bi-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-calendar-x"></i></div>
              <span className="placeholder-label">BELUM ADA KEGIATAN</span>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
