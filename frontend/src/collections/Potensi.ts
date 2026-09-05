import type { CollectionConfig } from 'payload'

export const Potensi: CollectionConfig = {
  slug: 'potensi',
  labels: {
    singular: 'Data Kelok Mertan',
    plural: 'Kelok Mertan',
  },
  admin: {
    group: 'Wisata Desa',
    useAsTitle: 'judul',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      required: true,
      label: 'Judul / Nama Layanan',
    },
    {
      name: 'kategori',
      type: 'select',
      options: [
        { label: 'Wahana Utama', value: 'wahana' },
        { label: 'Tiket & Paket Wisata', value: 'paket' },
        { label: 'Kuliner & Oleh-Oleh', value: 'kuliner' },
        { label: 'Fasilitas Wisata', value: 'fasilitas' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      required: true,
      label: 'Kategori',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi Lengkap',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi',
    },
    {
      name: 'sumber_data',
      type: 'text',
      label: 'Keterangan Tambahan (Opsional)',
    },
  ],
}
