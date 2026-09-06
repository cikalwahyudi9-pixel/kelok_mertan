import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

export const metadata = {
  title: 'Program Pemberdayaan - Jelajah Mertan',
  description: 'Program pemberdayaan dan pendampingan di Desa Mertan.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const KATEGORI_LABEL: Record<string, string> = {
  umkm: 'UMKM',
  kesehatan: 'Kesehatan',
  lingkungan: 'Lingkungan',
  edukasi: 'Edukasi',
  lainnya: 'Lainnya',
}

const KATEGORI_COLOR: Record<string, string> = {
  umkm: '#0d6efd',
  kesehatan: '#198754',
  lingkungan: '#20c997',
  edukasi: '#fd7e14',
  lainnya: '#6c757d',
}

export default async function ProgramPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: programList } = await payload.find({
    collection: 'program',
    limit: 100,
    sort: 'urutan',
  })

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Program Pemberdayaan</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Program Pemberdayaan</h1>
          <p className="page-hero-sub">Daftar program kerja dan inisiatif pemberdayaan masyarakat oleh tim KKN</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {programList.length > 0 ? (
            <div className="row g-4">
              {programList.map((item: any) => {
                const thumbUrl = item.thumbnail && typeof item.thumbnail === 'object' && item.thumbnail.url
                  ? item.thumbnail.url : null
                const katColor = KATEGORI_COLOR[item.kategori] || '#6c757d'

                return (
                  <div key={item.id} className="col-12">
                    <div className="card-custom p-0 overflow-hidden border-0 shadow-sm d-flex flex-column flex-md-row">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0" style={{ width: '100%', maxWidth: '240px' }}>
                        {thumbUrl ? (
                          <img src={thumbUrl} alt={item.nama}
                            style={{ width: '100%', height: '100%', minHeight: '180px', objectFit: 'cover' }} />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100"
                            style={{ minHeight: '180px', background: `linear-gradient(135deg, ${katColor}22, ${katColor}11)`, fontSize: '3.5rem', color: katColor }}>
                            <i className="bi bi-briefcase"></i>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex-grow-1 d-flex flex-column">
                        <div className="mb-2">
                          <span className="badge px-3 py-2" style={{ backgroundColor: katColor, fontSize: '0.75rem' }}>
                            {KATEGORI_LABEL[item.kategori] || item.kategori}
                          </span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#004d40' }}>{item.nama}</h3>

                        {item.sasaran && (
                          <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                            <i className="bi bi-people me-1"></i> Sasaran: {item.sasaran}
                          </p>
                        )}

                        <div className="mt-auto pt-3 border-top d-flex align-items-center gap-3">
                          <Link href={`/program/${item.id}`} className="btn-green" style={{ fontSize: '0.85rem', padding: '0.4rem 1.2rem' }}>
                            Pelajari Lebih Lanjut <i className="bi bi-arrow-right"></i>
                          </Link>
                          {item.dokumentasi && item.dokumentasi.length > 0 && (
                            <small className="text-muted">
                              <i className="bi bi-images me-1"></i>{item.dokumentasi.length} dokumentasi
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
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
