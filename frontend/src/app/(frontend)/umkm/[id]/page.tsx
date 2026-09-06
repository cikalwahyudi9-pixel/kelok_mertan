import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function UMKMDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  let umkm;
  try {
    umkm = await payload.findByID({
      collection: 'umkm',
      id: id,
    })
  } catch (error) {
    return notFound()
  }

  if (!umkm) {
    return notFound()
  }

  const imageUrl = umkm.foto_usaha && typeof umkm.foto_usaha === 'object' && umkm.foto_usaha.url 
    ? umkm.foto_usaha.url 
    : null;

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/umkm">UMKM</Link></li>
              <li className="breadcrumb-item active">{umkm.nama_usaha}</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">{umkm.nama_usaha}</h1>
          <p className="page-hero-sub">Detail informasi UMKM Mitra Program KKN di Desa Mertan</p>
        </div>
      </section>

      <section className="section-py" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-8">
              <div className="card-custom p-0 overflow-hidden mb-4 border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
                {imageUrl ? (
                  <img src={imageUrl} alt={umkm.nama_usaha} className="img-fluid w-100" style={{ maxHeight: '500px', objectFit: 'cover' }} />
                ) : (
                  <div className="d-flex align-items-center justify-content-center" style={{ height: '300px', backgroundColor: '#e9ecef' }}>
                    <i className="bi bi-shop text-muted" style={{ fontSize: '5rem' }}></i>
                  </div>
                )}
              </div>

              <div className="card-custom p-4 border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
                <h3 className="fw-bold mb-3" style={{ color: '#004d40' }}>Tentang Usaha</h3>
                {umkm.deskripsi_html ? (
                  <div className="content-html" dangerouslySetInnerHTML={{ __html: umkm.deskripsi_html }} />
                ) : (
                  <p className="text-muted">Tidak ada deskripsi tersedia.</p>
                )}

                {umkm.produk_unggulan && (
                  <>
                    <hr className="my-4" />
                    <h4 className="fw-bold mb-3" style={{ color: '#004d40', fontSize: '1.2rem' }}>Produk Unggulan</h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{umkm.produk_unggulan}</p>
                  </>
                )}

                {(umkm.hasil_pendampingan_html || (umkm.before_after && umkm.before_after.length > 0)) && (
                  <>
                    <hr className="my-4" />
                    <h3 className="fw-bold mb-3" style={{ color: '#004d40' }}>Hasil Pendampingan KKN</h3>
                    {umkm.hasil_pendampingan_html && (
                      <div className="content-html mb-4" dangerouslySetInnerHTML={{ __html: umkm.hasil_pendampingan_html }} />
                    )}
                    
                    {umkm.before_after && umkm.before_after.length > 0 && (
                      <div className="row g-4 mt-2">
                        {umkm.before_after.map((item: any, idx: number) => (
                          <div key={idx} className="col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                              <div className="card-header bg-light border-0 py-3 text-center">
                                <span className="fw-bold text-primary-custom">{item.keterangan || 'Dokumentasi'}</span>
                              </div>
                              <div className="card-body p-0 d-flex flex-column flex-sm-row">
                                <div className="w-100 w-sm-50 border-end border-bottom border-sm-bottom-0 position-relative">
                                  <div className="position-absolute top-0 start-0 bg-secondary text-white px-2 py-1 small fw-bold" style={{ zIndex: 1, borderBottomRightRadius: '8px' }}>Sebelum</div>
                                  {item.foto_sebelum?.url ? (
                                    <img src={item.foto_sebelum.url} alt="Sebelum" className="img-fluid w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                  ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light w-100" style={{ height: '200px' }}>-</div>
                                  )}
                                </div>
                                <div className="w-100 w-sm-50 position-relative">
                                  <div className="position-absolute top-0 start-0 bg-success text-white px-2 py-1 small fw-bold" style={{ zIndex: 1, borderBottomRightRadius: '8px' }}>Sesudah</div>
                                  {item.foto_sesudah?.url ? (
                                    <img src={item.foto_sesudah.url} alt="Sesudah" className="img-fluid w-100" style={{ height: '200px', objectFit: 'cover' }} />
                                  ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light w-100" style={{ height: '200px' }}>-</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-4">
              <div className="card-custom p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <h4 className="fw-bold mb-4" style={{ color: '#004d40' }}>Informasi Usaha</h4>
                
                <div className="d-flex mb-3">
                  <div className="me-3 text-primary-custom">
                    <i className="bi bi-person-fill fs-5"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block" style={{ fontSize: '0.85rem' }}>Pemilik</small>
                    <span className="fw-medium">{umkm.pemilik || '-'}</span>
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <div className="me-3 text-primary-custom">
                    <i className="bi bi-geo-alt-fill fs-5"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block" style={{ fontSize: '0.85rem' }}>Lokasi</small>
                    <span className="fw-medium">{umkm.lokasi || '-'}</span>
                  </div>
                </div>

                <div className="d-flex mb-2">
                  <div className="me-3 text-primary-custom">
                    <i className="bi bi-tags-fill fs-5"></i>
                  </div>
                  <div>
                    <small className="text-muted d-block" style={{ fontSize: '0.85rem' }}>Kategori</small>
                    <span className="fw-medium">{umkm.kategori || '-'}</span>
                  </div>
                </div>
              </div>

              <div className="card-custom p-4 border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
                <h4 className="fw-bold mb-4" style={{ color: '#004d40' }}>
                  <i className="bi bi-telephone-fill me-2 fs-5"></i>Kontak
                </h4>
                
                {umkm.nomor_wa ? (
                  <a href={`https://wa.me/${umkm.nomor_wa.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn w-100 mb-3 text-white fw-medium shadow-sm d-flex justify-content-center align-items-center gap-2" style={{ backgroundColor: '#0056b3', padding: '0.7rem' }}>
                    <i className="bi bi-whatsapp"></i> WhatsApp
                  </a>
                ) : (
                  <button className="btn w-100 mb-3 text-white fw-medium shadow-sm" disabled style={{ backgroundColor: '#6c757d', padding: '0.7rem' }}>
                    <i className="bi bi-whatsapp me-2"></i> WhatsApp (Tidak Tersedia)
                  </button>
                )}

                {umkm.sosmed_instagram && (
                  <a href={`https://instagram.com/${umkm.sosmed_instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="btn w-100 fw-medium shadow-sm d-flex justify-content-center align-items-center gap-2" style={{ backgroundColor: 'white', color: '#0056b3', border: '1.5px solid #0056b3', padding: '0.7rem' }}>
                    <i className="bi bi-instagram"></i> {umkm.sosmed_instagram.startsWith('@') ? umkm.sosmed_instagram : `@${umkm.sosmed_instagram}`}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
