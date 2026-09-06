import type { CollectionConfig } from 'payload'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

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
    lexicalHTML('deskripsi', { name: 'deskripsi_html' }),
    {
      name: 'produk_unggulan',
      type: 'textarea',
      label: 'Produk Unggulan',
    },
    {
      name: 'lokasi',
      type: 'text',
      label: 'Lokasi (Dusun)',
    },
    {
      name: 'kategori',
      type: 'text',
      label: 'Kategori Usaha',
    },
    {
      name: 'nomor_wa',
      type: 'text',
      label: 'Nomor WhatsApp',
    },
    {
      name: 'sosmed_instagram',
      type: 'text',
      label: 'Username Instagram (tanpa @)',
    },
    {
      name: 'foto_usaha',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Usaha / Produk',
    },
  ],
}
