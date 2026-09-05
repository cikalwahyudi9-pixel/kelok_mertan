import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const groups = [
  {
    title: 'Profil',
    items: [
      { label: 'Profil Desa', href: '/admin/globals/profil', hasAdd: false },
      { label: 'Kelompok Tani', href: '/admin/collections/kelompok-tani', hasAdd: true },
    ],
  },
  {
    title: 'Wisata Desa',
    items: [
      { label: 'Kelok Mertan', href: '/admin/collections/potensi', hasAdd: true },
    ],
  },
  {
    title: 'Umkm',
    items: [
      { label: 'UMKM Mitra', href: '/admin/collections/umkm', hasAdd: true },
    ],
  },
  {
    title: 'Program',
    items: [
      { label: 'Program Pemberdayaan', href: '/admin/collections/program', hasAdd: true },
    ],
  },
  {
    title: 'Edukasi',
    items: [
      { label: 'Materi Edukasi', href: '/admin/collections/edukasi', hasAdd: true },
    ],
  },
  {
    title: 'Insight',
    items: [
      { label: 'Insight Kesehatan', href: '/admin/collections/insight', hasAdd: true },
    ],
  },
  {
    title: 'Kegiatan',
    items: [
      { label: 'Agenda & Kegiatan', href: '/admin/collections/kegiatan', hasAdd: true },
    ],
  },
  {
    title: 'Galeri',
    items: [
      { label: 'Item Galeri', href: '/admin/collections/galeri', hasAdd: true },
      { label: 'Media', href: '/admin/collections/media', hasAdd: true },
    ],
  },
  {
    title: 'Pengaturan',
    items: [
      { label: 'Admin & Pengguna', href: '/admin/collections/users', hasAdd: true },
    ],
  },
]

export default async function CustomDashboard() {
  // Fetch real data
  const payload = await getPayload({ config: configPromise })
  
  // Ambil beberapa dokumen terbaru dari koleksi utama
  const [umkmRes, potensiRes, programRes] = await Promise.all([
    payload.find({ collection: 'umkm', sort: '-updatedAt', limit: 3 }),
    payload.find({ collection: 'potensi', sort: '-updatedAt', limit: 3 }),
    payload.find({ collection: 'program', sort: '-updatedAt', limit: 3 }),
  ])

  // Gabungkan dan urutkan berdasarkan updatedAt terbaru
  const allRecent = [
    ...umkmRes.docs.map(d => ({ title: d.nama_usaha || 'UMKM Tanpa Nama', date: d.updatedAt })),
    ...potensiRes.docs.map(d => ({ title: d.judul || 'Potensi Tanpa Judul', date: d.updatedAt })),
    ...programRes.docs.map(d => ({ title: d.judul || 'Program Tanpa Judul', date: d.updatedAt })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10)

  // Jika database kosong sama sekali (baru setup)
  if (allRecent.length === 0) {
    allRecent.push({ title: 'Belum ada data ditambahkan', date: '' })
  }

  return (
    <div style={{
      padding: '1.5rem',
      minHeight: '100vh',
      backgroundColor: '#0e1511',
      color: '#dde4dd',
      fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: '1.5rem',
        alignItems: 'start',
      }}>
        {/* Main Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
        }}>
          {groups.map((group) => (
            <div key={group.title} className="onyx-dashboard-card">
              <div className="onyx-dashboard-header">
                <h3>{group.title}</h3>
              </div>
              {group.items.map((item, j) => (
                <div key={item.label} className="onyx-dashboard-row">
                  <span className="onyx-row-title">{item.label}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {item.hasAdd && (
                      <Link href={`${item.href}/create`} className="onyx-badge-btn onyx-btn-tambah">
                        Tambah
                      </Link>
                    )}
                    <Link href={item.href} className="onyx-badge-btn onyx-btn-ubah">
                      Ubah
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Recent Actions Sidebar */}
        <div className="onyx-dashboard-card" style={{ position: 'sticky', top: '1.5rem' }}>
          <div className="onyx-dashboard-header">
            <h3>Tindakan terbaru</h3>
          </div>
          <div style={{ padding: '0.75rem' }}>
            {allRecent.map((action, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                color: '#bbcabf',
                fontSize: '0.85rem',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.4rem',
                backgroundColor: i % 2 === 0 ? '#161d19' : 'transparent',
                marginBottom: '2px',
              }}>
                <span style={{ color: '#0566d9', flexShrink: 0, marginTop: '1px' }}>☑</span>
                {action.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
