import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Program KKN - Jelajah Mertan',
  description: 'Program pemberdayaan dan pendampingan di Desa Mertan.',
}

export default async function ProgramPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: programList } = await payload.find({
    collection: 'program',
    limit: 100,
  })

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Program KKN</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Program Pemberdayaan</h1>
          <p className="page-hero-sub">Daftar program kerja dan inisiatif pemberdayaan masyarakat</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {programList.length > 0 ? (
            <div className="row g-4">
              {programList.map((item) => (
                <div key={item.id} className="col-12">
                  <div className="card-custom p-4 d-flex flex-column flex-md-row gap-4 align-items-center">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                         style={{ width: '150px', height: '150px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', fontSize: '3rem' }}>
                      <i className="bi bi-briefcase"></i>
                    </div>
                    <div>
                      {item.kategori && <span className="card-category-badge mb-2 d-inline-block" style={{textTransform: 'uppercase'}}>{item.kategori}</span>}
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{item.judul}</h3>
                      <p className="text-muted mb-2"><i className="bi bi-calendar-check"></i> Status: <strong>{item.status || 'Berjalan'}</strong></p>
                      
                      <a href="#" className="btn-outline-green mt-2" style={{ fontSize: '0.85rem' }}>
                        Pelajari Lebih Lanjut
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-briefcase"></i></div>
              <span className="placeholder-label">DATA PROGRAM BELUM TERSEDIA</span>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
