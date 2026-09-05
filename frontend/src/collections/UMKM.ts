import type { CollectionConfig } from 'payload'

export const UMKM: CollectionConfig = {
  slug: 'umkm',
  labels: {
    singular: 'UMKM',
    plural: 'UMKM',
  },
  admin: {
    group: 'UMKM',
    useAsTitle: 'nama_usaha',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama_usaha',
      type: 'text',
      required: true,
      label: 'Nama Usaha',
    },
    {
      name: 'pemilik',
      type: 'text',
      label: 'Nama Pemilik',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi Usaha',
    },
    {
      name: 'produk_unggulan',
      type: 'textarea',
      label: 'Produk Unggulan',
    },
    {
      name: 'nomor_wa',
      type: 'text',
      label: 'Nomor WhatsApp',
    },
  ],
}

