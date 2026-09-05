import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const metadata = {
  title: 'Insight Kesehatan - Jelajah Mertan',
  description: 'Statistik agregat kegiatan skrining kesehatan di Desa Mertan.',
}

export default async function InsightPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: insightList } = await payload.find({
    collection: 'insight',
    limit: 100,
  })

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active">Insight Kesehatan</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Insight Kesehatan</h1>
          <p className="page-hero-sub">Ringkasan data skrining kesehatan program pemberdayaan</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {insightList.length > 0 ? (
            <div className="row g-4">
              {insightList.map((item) => (
                <div key={item.id} className="col-12">
                  <div className="card-custom p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)' }}>{item.nama_kegiatan}</h3>
                        <p className="text-muted mb-0"><i className="bi bi-calendar3"></i> {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}</p>
                      </div>
                      <div className="text-end">
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-2 rounded-pill">
                          <i className="bi bi-people-fill me-1"></i> {item.jumlah_peserta} Peserta
                        </span>
                      </div>
                    </div>

                    <div className="disclaimer-banner mb-4">
                      <span className="disclaimer-banner-icon"><i className="bi bi-shield-lock"></i></span>
                      <div>
                        <strong>Disclaimer:</strong><br/>
                        {item.disclaimer_text}
                      </div>
                    </div>

                    {item.data_agregat && item.data_agregat.length > 0 && (
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                          <thead className="table-light">
                            <tr>
                              <th>Indikator</th>
                              <th>Label Nilai</th>
                              <th>Jumlah Orang</th>
                              <th>Keterangan</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.data_agregat.map((stat: any, idx: number) => (
                              <tr key={idx}>
                                <td><span className="fw-semibold text-capitalize">{stat.indikator?.replace('_', ' ')}</span></td>
                                <td>{stat.label_nilai}</td>
                                <td>{stat.jumlah} Orang</td>
                                <td>{stat.keterangan || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-bar-chart"></i></div>
              <span className="placeholder-label">DATA INSIGHT BELUM TERSEDIA</span>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
