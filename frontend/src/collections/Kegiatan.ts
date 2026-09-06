import type { CollectionConfig } from 'payload'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

export const Kegiatan: CollectionConfig = {
  slug: 'kegiatan',
  labels: {
    singular: 'Kegiatan',
    plural: 'Kegiatan',
  },
  admin: {
    group: 'Kegiatan',
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
      label: 'Judul Kegiatan',
    },
    {
      name: 'tanggal',
      type: 'date',
      label: 'Tanggal Kegiatan',
      required: true,
    },
    {
      name: 'waktu',
      type: 'text',
      label: 'Waktu (contoh: 08.00 – 12.00 WIB)',
    },
    {
      name: 'lokasi',
      type: 'text',
      label: 'Tempat / Lokasi',
    },
    {
      name: 'kategori',
      type: 'select',
      label: 'Kategori',
      options: [
        { label: 'Kegiatan Masyarakat', value: 'masyarakat' },
        { label: 'Posyandu', value: 'posyandu' },
        { label: 'Pemberdayaan', value: 'pemberdayaan' },
        { label: 'Kegiatan Desa', value: 'desa' },
        { label: 'Program KKN', value: 'kkn' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      defaultValue: 'lainnya',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi / Detail Kegiatan',
    },
    lexicalHTML('deskripsi', { name: 'deskripsi_html' }),
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi',
    },
    {
      name: 'is_arsip',
      type: 'checkbox',
      label: 'Tandai sebagai Arsip (Kegiatan Sudah Selesai)',
      defaultValue: false,
    },
  ],
}
