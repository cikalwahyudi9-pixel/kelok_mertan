import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ kategori: string }> }) {
  const resolvedParams = await params
  const kategoriTitle = resolvedParams.kategori.charAt(0).toUpperCase() + resolvedParams.kategori.slice(1)
  
  return {
    title: `Kelompok Tani ${kategoriTitle} - Jelajahi Dusun Mertan`,
    description: `Daftar Kelompok Tani ${kategoriTitle} di Dusun Mertan.`,
  }
}

export default async function KelompokTaniPage({ params }: { params: Promise<{ kategori: string }> }) {
  const resolvedParams = await params
  const kategori = resolvedParams.kategori
  
  if (kategori !== 'wanita' && kategori !== 'pria') {
    notFound()
  }

  const payload = await getPayload({ config: configPromise })

  const { docs: kelompokTaniList } = await payload.find({
    collection: 'kelompok-tani',
    where: {
      kategori: {
        equals: kategori
      }
    },
    limit: 100,
  })

  const titleKategori = kategori.charAt(0).toUpperCase() + kategori.slice(1)

  return (
    <>
      <section className="page-hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-custom">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="/profil">Profil</a></li>
              <li className="breadcrumb-item active">Kelompok Tani {titleKategori}</li>
            </ol>
          </nav>
          <h1 className="page-hero-title">Kelompok Tani {titleKategori}</h1>
          <p className="page-hero-sub">Daftar komunitas dan penggerak tani {titleKategori} Dusun Mertan</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container">

          {kelompokTaniList.length > 0 ? (
            <div className="row g-4">
              {kelompokTaniList.map((item) => (
                <div key={item.id} className="col-12">
                  <div className="card-custom overflow-hidden d-flex flex-column flex-md-row align-items-center">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                         style={{ width: '200px', height: '200px', background: 'linear-gradient(135deg,#e8f5e9,#f1f8e9)', fontSize: '4rem', color: 'var(--color-primary)' }}>
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="p-4 flex-grow-1">
                      <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>{item.nama}</h3>
                      <div className="d-flex flex-wrap gap-3 mb-3 mt-2">
                        {item.ketua && (
                          <span className="text-muted"><i className="bi bi-person-badge"></i> Ketua: {item.ketua}</span>
                        )}
                        {item.jumlah_anggota && (
                          <span className="text-muted"><i className="bi bi-people-fill"></i> Anggota: {item.jumlah_anggota} orang</span>
                        )}
                      </div>
                      
                      {item.deskripsi ? (
                        <div className="content-html mb-0" dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                      ) : (
                        <p className="text-muted mb-0">Belum ada deskripsi profil kelompok tani ini.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="placeholder-content">
              <div className="placeholder-icon"><i className="bi bi-people"></i></div>
              <span className="placeholder-label">DATA KELOMPOK TANI BELUM TERSEDIA</span>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
