import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Galeri Desa - Jelajah Mertan',
  description: 'Dokumentasi foto kegiatan dan pesona Desa Mertan.',
}

export default async function GaleriPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: galeriList } = await payload.find({
    collection: 'galeri',
    limit: 100,
  })

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Galeri</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Galeri Desa</h1>
          <p className="page-hero-sub">Koleksi foto kegiatan dan pemandangan Desa Mertan</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {galeriList.length > 0 ? (
            <div className="row g-4">
              {galeriList.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6">
                  <div className="card-custom h-100 overflow-hidden">
                    <div className="d-flex align-items-center justify-content-center"
                         style={{ height: '250px', background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', fontSize: '3rem' }}>
                      <i className="bi bi-image"></i>
                    </div>
                    <div className="p-3">
                      <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>{item.judul}</h4>
                      {item.deskripsi && <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{item.deskripsi}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-images"></i></div>
              <span className="placeholder-label">GALERI KOSONG</span>
              <p className="mt-2 mb-0" style={{ fontSize: '0.88rem' }}>
                Belum ada foto yang diunggah ke galeri.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
