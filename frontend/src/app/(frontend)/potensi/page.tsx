import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Kelok Mertan (Potensi) - Jelajah Mertan',
  description: 'Daftar potensi dan keunggulan Desa Mertan, termasuk kawasan Kelok Mertan.',
}

export default async function PotensiPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: potensiList } = await payload.find({
    collection: 'potensi',
    limit: 100,
  })

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Kelok Mertan (Potensi)</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Potensi & Kelok Mertan</h1>
          <p className="page-hero-sub">Jelajahi potensi unggulan yang dimiliki Desa Mertan</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {potensiList.length > 0 ? (
            <div className="row g-4">
              {potensiList.map((potensi) => (
                <div key={potensi.id} className="col-lg-4 col-md-6">
                  <div className="umkm-card">
                    {potensi.foto && typeof potensi.foto === 'object' && potensi.foto.url ? (
                      <div className="umkm-card-img" style={{ backgroundImage: `url(${potensi.foto.url})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', width: '100%', borderRadius: '12px 12px 0 0' }}></div>
                    ) : (
                      <div className="umkm-card-img d-flex align-items-center justify-content-center"
                           style={{ background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', fontSize: '3rem', height: '200px', borderRadius: '12px 12px 0 0' }}>
                        <i className="bi bi-star"></i>
                      </div>
                    )}
                    
                    <div className="umkm-card-body">
                      {potensi.kategori && <span className="card-category-badge" style={{textTransform: 'uppercase'}}>{potensi.kategori}</span>}
                      <h2 className="umkm-card-name mt-2">{potensi.judul}</h2>
                      <a href="#" className="btn-green mt-3" style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
                        Lihat Detail <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-stars"></i></div>
              <span className="placeholder-label">DATA POTENSI BELUM TERSEDIA</span>
              <p className="mt-2 mb-0" style={{ fontSize: '0.88rem' }}>
                Data potensi desa sedang dalam tahap penyusunan.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
