import type { CollectionConfig } from 'payload'

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
    },
    {
      name: 'tempat',
      type: 'text',
      label: 'Tempat / Lokasi',
    },
    {
      name: 'deskripsi',
      type: 'richText',
      label: 'Deskripsi / Detail Kegiatan',
    },
    {
      name: 'foto',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Dokumentasi',
    },
  ],
}

