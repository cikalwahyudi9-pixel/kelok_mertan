import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const KATEGORI_LABEL: Record<string, string> = {
  umkm: 'UMKM',
  kesehatan: 'Kesehatan',
  lingkungan: 'Lingkungan',
  edukasi: 'Edukasi',
  lainnya: 'Lainnya',
}

const JENIS_LABEL: Record<string, string> = {
  before: 'Sebelum',
  after: 'Sesudah',
  proses: 'Proses',
  umum: 'Umum',
}

function Section({ title, html }: { title: string; html?: string | null }) {
  if (!html) return null
  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3" style={{ color: '#004d40', fontSize: '1.1rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '0.75rem' }}>
        {title}
      </h4>
      <div className="content-html" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default async function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  let program: any
  try {
    program = await payload.findByID({ collection: 'program', id })
  } catch {
    return notFound()
  }
  if (!program) return notFound()

  const thumbUrl = program.thumbnail && typeof program.thumbnail === 'object' && program.thumbnail.url
    ? program.thumbnail.url : null

  const docs = program.dokumentasi || []
  const docByJenis = docs.reduce((acc: any, doc: any) => {
    const j = doc.jenis || 'umum'
    if (!acc[j]) acc[j] = []
    acc[j].push(doc)
    return acc
  }, {})

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/program">Program</Link></li>
              <li className="breadcrumb-item active">{program.nama}</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">{program.nama}</h1>
          {program.kategori && (
            <p className="page-hero-sub">{KATEGORI_LABEL[program.kategori] || program.kategori}</p>
          )}
        </div>
      </section>

      <section className="section-py" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              {thumbUrl && (
                <div className="card-custom p-0 overflow-hidden mb-4 border-0 shadow-sm">
                  <img src={thumbUrl} alt={program.nama} className="img-fluid w-100"
                    style={{ maxHeight: '400px', objectFit: 'cover' }} />
                </div>
              )}

              <div className="card-custom p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <Section title="Latar Belakang" html={program.latar_belakang_html} />
                <Section title="Permasalahan" html={program.permasalahan_html} />
                <Section title="Tujuan Program" html={program.tujuan_html} />
                {program.sasaran && (
                  <div className="mb-4">
                    <h4 className="fw-bold mb-3" style={{ color: '#004d40', fontSize: '1.1rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '0.75rem' }}>
                      Sasaran / Target
                    </h4>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{program.sasaran}</p>
                  </div>
                )}
                <Section title="Pelaksanaan" html={program.pelaksanaan_html} />
                <Section title="Hasil Program" html={program.hasil_html} />
                <Section title="Dampak Program" html={program.dampak_html} />
                <Section title="Luaran Program" html={program.luaran_html} />
              </div>

              {/* Dokumentasi Foto */}
              {docs.length > 0 && (
                <div className="card-custom p-4 border-0 shadow-sm" style={{ backgroundColor: 'white' }}>
                  <h3 className="fw-bold mb-4" style={{ color: '#004d40' }}>Dokumentasi</h3>

                  {['before', 'proses', 'after', 'umum'].map(jenis => {
                    const group = docByJenis[jenis]
                    if (!group || group.length === 0) return null
                    return (
                      <div key={jenis} className="mb-4">
                        <h5 className="fw-semibold mb-3 text-muted" style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          <i className="bi bi-images me-2"></i>{JENIS_LABEL[jenis] || jenis}
                        </h5>
                        <div className="row g-3">
                          {group.map((doc: any, idx: number) => {
                            const imgUrl = doc.foto && typeof doc.foto === 'object' && doc.foto.url ? doc.foto.url : null
                            return (
                              <div key={idx} className="col-sm-6 col-md-4">
                                <div className="card border-0 shadow-sm overflow-hidden h-100">
                                  {imgUrl ? (
                                    <img src={imgUrl} alt={doc.caption || 'Dokumentasi'} className="img-fluid"
                                      style={{ height: '180px', objectFit: 'cover', width: '100%' }} />
                                  ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light"
                                      style={{ height: '180px' }}>
                                      <i className="bi bi-image text-muted fs-2"></i>
                                    </div>
                                  )}
                                  {doc.caption && (
                                    <div className="p-2 text-center">
                                      <small className="text-muted">{doc.caption}</small>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="card-custom p-4 border-0 shadow-sm mb-4" style={{ backgroundColor: 'white' }}>
                <h5 className="fw-bold mb-4" style={{ color: '#004d40' }}>Informasi Program</h5>

                {program.kategori && (
                  <div className="d-flex mb-3">
                    <div className="me-3 text-primary-custom"><i className="bi bi-tag-fill fs-5"></i></div>
                    <div>
                      <small className="text-muted d-block">Kategori</small>
                      <span className="fw-medium">{KATEGORI_LABEL[program.kategori] || program.kategori}</span>
                    </div>
                  </div>
                )}

                {program.sasaran && (
                  <div className="d-flex mb-3">
                    <div className="me-3 text-primary-custom"><i className="bi bi-people-fill fs-5"></i></div>
                    <div>
                      <small className="text-muted d-block">Sasaran</small>
                      <span className="fw-medium">{program.sasaran}</span>
                    </div>
                  </div>
                )}

                {docs.length > 0 && (
                  <div className="d-flex mb-2">
                    <div className="me-3 text-primary-custom"><i className="bi bi-images fs-5"></i></div>
                    <div>
                      <small className="text-muted d-block">Dokumentasi</small>
                      <span className="fw-medium">{docs.length} foto</span>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/program" className="text-primary-custom text-decoration-none fw-medium d-block" style={{ fontSize: '0.9rem' }}>
                ← Kembali ke Daftar Program
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
