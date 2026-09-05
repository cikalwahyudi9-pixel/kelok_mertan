import type { CollectionConfig } from 'payload'

export const Program: CollectionConfig = {
  slug: 'program',
  labels: {
    singular: 'Program',
    plural: 'Program',
  },
  admin: {
    group: 'Program',
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
      label: 'Nama Program',
    },
    {
      name: 'kategori',
      type: 'select',
      options: [
        { label: 'Pemberdayaan Ekonomi', value: 'ekonomi' },
        { label: 'Lingkungan', value: 'lingkungan' },
        { label: 'Kesehatan', value: 'kesehatan' },
        { label: 'Pendidikan', value: 'pendidikan' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      label: 'Kategori Program',
      required: true,
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi Program',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Gambar',
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      label: 'Tampil di Halaman Home?',
      defaultValue: false,
    },
  ],
}

