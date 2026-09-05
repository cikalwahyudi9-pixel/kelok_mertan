import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Materi Edukasi - Jelajah Mertan',
  description: 'Materi edukasi dan modul panduan untuk masyarakat.',
}

export default async function EdukasiPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: edukasiList } = await payload.find({
    collection: 'edukasi',
    limit: 100,
  })

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Edukasi</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Materi Edukasi</h1>
          <p className="page-hero-sub">Kumpulan modul dan panduan yang bisa dipelajari</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {edukasiList.length > 0 ? (
            <div className="row g-4">
              {edukasiList.map((item) => (
                <div key={item.id} className="col-lg-6">
                  <div className="card-custom p-4 h-100 d-flex gap-3">
                    <div style={{ width: '60px', height: '60px', borderRadius: '0.5rem', background: 'rgba(15,82,186,0.1)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                      <i className="bi bi-journal-text"></i>
                    </div>
                    <div>
                      {item.kategori && <span className="card-category-badge mb-1 d-inline-block" style={{textTransform: 'uppercase', fontSize: '0.7rem'}}>{item.kategori}</span>}
                      <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{item.judul}</h4>
                      {item.penulis && <p className="mb-2 text-muted" style={{ fontSize: '0.85rem' }}><i className="bi bi-person"></i> {item.penulis}</p>}
                      
                      <a href="#" className="btn-outline-green mt-2" style={{ fontSize: '0.85rem' }}>
                        Lihat / Unduh Modul
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-journal-bookmark"></i></div>
              <span className="placeholder-label">MATERI EDUKASI BELUM TERSEDIA</span>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
