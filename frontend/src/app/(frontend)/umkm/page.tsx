import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'UMKM Mitra Program KKN - Jelajah Mertan',
  description: 'Katalog UMKM mitra program pendampingan KKN di Desa Mertan, Weleri, Kendal.',
}

export default async function UMKMPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: umkmList } = await payload.find({
    collection: 'umkm',
    limit: 100,
  })

  // get unique categories (dusun or fallback manual since we didn't define categories in Payload UMKM schema initially)
  // For now we just display all UMKM

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">UMKM</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">UMKM Mitra Program KKN</h1>
          <p className="page-hero-sub">Katalog UMKM yang berpartisipasi dalam program pendampingan</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          <div className="disclaimer-banner mb-4">
            <span className="disclaimer-banner-icon"><i className="bi bi-info-circle"></i></span>
            <div>
              Data UMKM pada halaman ini merupakan UMKM yang berpartisipasi atau terjangkau
              dalam program pendampingan KKN dan <strong>tidak dimaksudkan sebagai daftar
              seluruh UMKM yang terdapat di Desa Mertan</strong>.
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <form method="get" className="d-flex gap-2">
                <input type="text" name="q"
                       className="form-control" placeholder="Cari nama UMKM..."
                       style={{ borderRadius: '2rem', borderColor: 'var(--color-border)' }} />
                <button type="submit" className="btn-green" style={{ whiteSpace: 'nowrap' }}>
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>

          {umkmList.length > 0 ? (
            <div className="row g-4">
              {umkmList.map((umkm) => (
                <div key={umkm.id} className="col-lg-3 col-md-6">
                  <div className="umkm-card">
                    {umkm.foto_usaha && typeof umkm.foto_usaha === 'object' && umkm.foto_usaha.url ? (
                      <div className="umkm-card-img" style={{ backgroundImage: `url(${umkm.foto_usaha.url})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', width: '100%', borderRadius: '12px 12px 0 0' }}></div>
                    ) : (
                      <div className="umkm-card-img d-flex align-items-center justify-content-center"
                        style={{ height: '200px', backgroundColor: '#e9ecef', borderRadius: '12px 12px 0 0' }}>
                        <i className="bi bi-shop text-muted" style={{ fontSize: '4rem' }}></i>
                      </div>
                    )}
                    
                    <div className="umkm-card-body">
                      <h2 className="umkm-card-name">{umkm.nama_usaha}</h2>
                      {umkm.pemilik && <p className="umkm-card-produk"><i className="bi bi-person"></i> {umkm.pemilik}</p>}
                      {umkm.nomor_wa && <p className="umkm-card-produk"><i className="bi bi-whatsapp"></i> {umkm.nomor_wa}</p>}
                      
                      <a href="#" className="btn-green" style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
                        Lihat Detail <i className="bi bi-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-shop"></i></div>
              <span className="placeholder-label">DATA UMKM BELUM TERSEDIA</span>
              <p className="mt-2 mb-0" style={{ fontSize: '0.88rem' }}>
                Data UMKM mitra sedang dalam proses pengumpulan dari program pendampingan KKN.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
