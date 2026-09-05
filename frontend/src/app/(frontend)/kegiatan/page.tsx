import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Kegiatan Desa - Jelajah Mertan',
  description: 'Berita acara dan dokumentasi kegiatan Desa Mertan.',
}

export default async function KegiatanPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: kegiatanList } = await payload.find({
    collection: 'kegiatan',
    limit: 100,
  })

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
            <div className="row g-4">
              {kegiatanList.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div className="card-custom h-100 overflow-hidden d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-center"
                         style={{ height: '200px', background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', fontSize: '3rem', color: 'var(--color-primary)' }}>
                      <i className="bi bi-calendar-event"></i>
                    </div>
                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{item.judul}</h3>
                      <div className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
                        {item.tanggal && <span className="me-3"><i className="bi bi-calendar3"></i> {new Date(item.tanggal).toLocaleDateString('id-ID')}</span>}
                        {item.tempat && <span><i className="bi bi-geo-alt"></i> {item.tempat}</span>}
                      </div>
                      <div className="mt-auto pt-3 border-top">
                        <a href="#" className="text-primary-custom" style={{ textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                          Baca Selengkapnya <i className="bi bi-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
