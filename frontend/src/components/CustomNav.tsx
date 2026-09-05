'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navGroups = [
  {
    title: 'Profil',
    items: [
      { label: 'Profil Desa', href: '/admin/globals/profil', icon: '📍' },
      { label: 'Kelompok Tani', href: '/admin/collections/kelompok-tani', icon: '🌾' },
    ],
  },
  {
    title: 'Wisata Desa',
    items: [
      { label: 'Kelok Mertan', href: '/admin/collections/potensi', icon: '🌿' },
    ],
  },
  {
    title: 'Umkm',
    items: [
      { label: 'UMKM Mitra', href: '/admin/collections/umkm', icon: '🏪' },
    ],
  },
  {
    title: 'Program',
    items: [
      { label: 'Program Pemberdayaan', href: '/admin/collections/program', icon: '⭐' },
    ],
  },
  {
    title: 'Edukasi',
    items: [
      { label: 'Materi Edukasi', href: '/admin/collections/edukasi', icon: '🎓' },
    ],
  },
  {
    title: 'Insight',
    items: [
      { label: 'Insight Kesehatan', href: '/admin/collections/insight', icon: '📊' },
    ],
  },
  {
    title: 'Kegiatan',
    items: [
      { label: 'Agenda & Kegiatan', href: '/admin/collections/kegiatan', icon: '📅' },
    ],
  },
  {
    title: 'Galeri',
    items: [
      { label: 'Item Galeri', href: '/admin/collections/galeri', icon: '🖼️' },
      { label: 'Media', href: '/admin/collections/media', icon: '📁' },
    ],
  },
  {
    title: 'Pengaturan',
    items: [
      { label: 'Admin & Pengguna', href: '/admin/collections/users', icon: '👥' },
    ],
  },
]

export default function CustomNav() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#161d19',
      borderRight: '1px solid #3c4a42',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflowY: 'auto',
    }}>
      {/* Brand */}
      <div style={{
        padding: '1rem',
        backgroundColor: '#09100c',
        borderBottom: '1px solid #3c4a42',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          backgroundColor: '#bbcabf',
          color: '#09100c',
          width: '28px',
          height: '28px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          A
        </div>
        <span style={{ color: '#dde4dd', fontWeight: '600', fontSize: '18px' }}>Admin Panel</span>
      </div>

      {/* User */}
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #3c4a42',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: '#dde4dd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#161d19'
        }}>
          👤
        </div>
        <span style={{ color: '#bbcabf', fontSize: '14px' }}>admin</span>
      </div>

      {/* Nav Content */}
      <nav style={{ padding: '1rem 0' }}>
        {/* Dashboard Link */}
        <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
          <Link href="/admin" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: pathname === '/admin' ? '#242c27' : 'transparent',
            padding: '10px 16px',
            borderRadius: '6px',
            color: pathname === '/admin' ? '#dde4dd' : '#bbcabf',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: pathname === '/admin' ? '500' : '400',
          }}>
            <span>⊞</span> Dashboard
          </Link>
        </div>

        {/* Groups */}
        {navGroups.map((group, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <div style={{
              color: '#bbcabf',
              fontSize: '11px',
              textTransform: 'uppercase',
              fontWeight: '600',
              padding: '8px 1rem',
              letterSpacing: '0.05em'
            }}>
              {group.title}
            </div>
            {group.items.map((item, itemIdx) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={itemIdx} href={item.href} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 1rem 8px 2rem',
                  color: isActive ? '#dde4dd' : '#bbcabf',
                  backgroundColor: isActive ? '#242c27' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '14px',
                  borderRadius: '0 20px 20px 0',
                  marginRight: '1rem',
                }}>
                  <span style={{ fontSize: '12px', opacity: isActive ? 1 : 0.7 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
