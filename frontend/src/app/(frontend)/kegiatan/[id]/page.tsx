import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const KATEGORI_LABEL: Record<string, string> = {
  masyarakat: 'Kegiatan Masyarakat',
  posyandu: 'Posyandu',
  pemberdayaan: 'Pemberdayaan',
  desa: 'Kegiatan Desa',
  kkn: 'Program KKN',
  lainnya: 'Lainnya',
}

export default async function KegiatanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  let kegiatan: any
  try {
    kegiatan = await payload.findByID({ collection: 'kegiatan', id })
  } catch {
    return notFound()
  }
  if (!kegiatan) return notFound()

  const fotoUrl = kegiatan.foto && typeof kegiatan.foto === 'object' && kegiatan.foto.url
    ? kegiatan.foto.url : null

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/kegiatan">Kegiatan</Link></li>
              <li className="breadcrumb-item active">{kegiatan.judul}</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">{kegiatan.judul}</h1>
        </div>
      </section>

      <section className="section-py" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              {fotoUrl && (
                <div className="card-custom p-0 overflow-hidden mb-4 border-0 shadow-sm">
                  <img src={fotoUrl} alt={kegiatan.judul} className="img-fluid w-100"
                    style={{ maxHeight: '450px', objectFit: 'cover' }} />
                </div>
              )}

              <div className="card-custom p-4 border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
                <h3 className="fw-bold mb-3" style={{ color: '#004d40' }}>Detail Kegiatan</h3>
                {kegiatan.deskripsi_html ? (
                  <div className="content-html" dangerouslySetInnerHTML={{ __html: kegiatan.deskripsi_html }} />
                ) : (
                  <p className="text-muted">Tidak ada deskripsi tersedia.</p>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card-custom p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <h5 className="fw-bold mb-4" style={{ color: '#004d40' }}>Informasi Kegiatan</h5>

                {kegiatan.kategori && (
                  <div className="d-flex mb-3">
                    <div className="me-3 text-primary-custom"><i className="bi bi-tag-fill fs-5"></i></div>
                    <div>
                      <small className="text-muted d-block">Kategori</small>
                      <span className="fw-medium">{KATEGORI_LABEL[kegiatan.kategori] || kegiatan.kategori}</span>
                    </div>
                  </div>
                )}

                <div className="d-flex mb-3">
                  <div className="me-3 text-primary-custom"><i className="bi bi-calendar3 fs-5"></i></div>
                  <div>
                    <small className="text-muted d-block">Tanggal</small>
                    <span className="fw-medium">
                      {kegiatan.tanggal ? new Date(kegiatan.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                    </span>
                  </div>
                </div>

                {kegiatan.waktu && (
                  <div className="d-flex mb-3">
                    <div className="me-3 text-primary-custom"><i className="bi bi-clock fs-5"></i></div>
                    <div>
                      <small className="text-muted d-block">Waktu</small>
                      <span className="fw-medium">{kegiatan.waktu}</span>
                    </div>
                  </div>
                )}

                {kegiatan.lokasi && (
                  <div className="d-flex mb-2">
                    <div className="me-3 text-primary-custom"><i className="bi bi-geo-alt-fill fs-5"></i></div>
                    <div>
                      <small className="text-muted d-block">Lokasi</small>
                      <span className="fw-medium">{kegiatan.lokasi}</span>
                    </div>
                  </div>
                )}

                {kegiatan.is_arsip && (
                  <div className="mt-3 p-2 rounded" style={{ backgroundColor: '#f0f0f0' }}>
                    <i className="bi bi-archive me-1 text-secondary"></i>
                    <small className="text-secondary fw-medium">Kegiatan ini sudah selesai (Arsip)</small>
                  </div>
                )}
              </div>

              <Link href="/kegiatan" className="text-primary-custom text-decoration-none fw-medium d-block" style={{ fontSize: '0.9rem' }}>
                ← Kembali ke Daftar Kegiatan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
