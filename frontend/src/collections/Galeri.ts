import type { CollectionConfig } from 'payload'

export const Galeri: CollectionConfig = {
  slug: 'galeri',
  labels: {
    singular: 'Item Galeri',
    plural: 'Galeri',
  },
  admin: {
    group: 'Galeri',
    useAsTitle: 'judul',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'judul',
      type: 'text',
      label: 'Judul Foto',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto',
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      label: 'Deskripsi',
    },
    {
      name: 'kategori',
      type: 'select',
      options: [
        { label: 'Alam', value: 'alam' },
        { label: 'Kegiatan', value: 'kegiatan' },
        { label: 'UMKM', value: 'umkm' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      label: 'Kategori',
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      label: 'Tampil di Halaman Home?',
      defaultValue: false,
    },
    {
      name: 'tanggal',
      type: 'date',
      label: 'Tanggal',
    },
  ],
}

