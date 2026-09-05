import type { CollectionConfig } from 'payload'

export const KelompokTani: CollectionConfig = {
  slug: 'kelompok-tani',
  labels: {
    singular: 'Kelompok Tani',
    plural: 'Kelompok Tani',
  },
  admin: {
    group: 'Profil',
    useAsTitle: 'nama',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      required: true,
      label: 'Nama Kelompok Tani',
    },
    {
      name: 'kategori',
      type: 'select',
      options: [
        { label: 'Kelompok Tani Wanita', value: 'wanita' },
        { label: 'Kelompok Tani Pria', value: 'pria' },
      ],
      required: true,
      label: 'Kategori / Jenis',
    },
    {
      name: 'ketua',
      type: 'text',
      label: 'Nama Ketua',
    },
    {
      name: 'jumlah_anggota',
      type: 'number',
      label: 'Jumlah Anggota',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi Singkat',
    },
    {
      name: 'foto_utama',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil/Dokumentasi Utama',
    },
    {
      name: 'is_published',
      type: 'checkbox',
      label: 'Tampilkan di Website?',
      defaultValue: true,
    },
  ],
}

