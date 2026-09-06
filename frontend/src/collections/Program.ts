import type { CollectionConfig } from 'payload'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

export const Program: CollectionConfig = {
  slug: 'program',
  labels: {
    singular: 'Program',
    plural: 'Program Pemberdayaan',
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
        { label: 'UMKM', value: 'umkm' },
        { label: 'Kesehatan', value: 'kesehatan' },
        { label: 'Lingkungan', value: 'lingkungan' },
        { label: 'Edukasi', value: 'edukasi' },
        { label: 'Lainnya', value: 'lainnya' },
      ],
      label: 'Kategori Program',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail Gambar',
    },
    {
      name: 'latar_belakang',
      type: 'richText',
      label: 'Latar Belakang',
    },
    lexicalHTML('latar_belakang', { name: 'latar_belakang_html' }),
    {
      name: 'permasalahan',
      type: 'richText',
      label: 'Permasalahan',
    },
    lexicalHTML('permasalahan', { name: 'permasalahan_html' }),
    {
      name: 'tujuan',
      type: 'richText',
      label: 'Tujuan Program',
    },
    lexicalHTML('tujuan', { name: 'tujuan_html' }),
    {
      name: 'sasaran',
      type: 'textarea',
      label: 'Sasaran / Target',
    },
    {
      name: 'pelaksanaan',
      type: 'richText',
      label: 'Pelaksanaan',
    },
    lexicalHTML('pelaksanaan', { name: 'pelaksanaan_html' }),
    {
      name: 'hasil',
      type: 'richText',
      label: 'Hasil Program',
    },
    lexicalHTML('hasil', { name: 'hasil_html' }),
    {
      name: 'dampak',
      type: 'richText',
      label: 'Dampak Program',
    },
    lexicalHTML('dampak', { name: 'dampak_html' }),
    {
      name: 'luaran',
      type: 'richText',
      label: 'Luaran Program',
    },
    lexicalHTML('luaran', { name: 'luaran_html' }),
    {
      name: 'dokumentasi',
      type: 'array',
      label: 'Dokumentasi Foto',
      fields: [
        {
          name: 'foto',
          type: 'upload',
          relationTo: 'media',
          label: 'Foto',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Keterangan Foto',
        },
        {
          name: 'jenis',
          type: 'select',
          label: 'Jenis Foto',
          options: [
            { label: 'Sebelum', value: 'before' },
            { label: 'Sesudah', value: 'after' },
            { label: 'Proses', value: 'proses' },
            { label: 'Umum', value: 'umum' },
          ],
          defaultValue: 'umum',
        },
      ],
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      label: 'Tampil di Halaman Home?',
      defaultValue: false,
    },
    {
      name: 'urutan',
      type: 'number',
      label: 'Urutan Tampil',
      defaultValue: 0,
    },
  ],
}
