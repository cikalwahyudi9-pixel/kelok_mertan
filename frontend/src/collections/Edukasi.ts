import type { CollectionConfig } from 'payload'

export const Edukasi: CollectionConfig = {
  slug: 'edukasi',
  labels: {
    singular: 'Materi Edukasi',
    plural: 'Edukasi',
  },
  admin: {
    group: 'Edukasi',
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
      label: 'Judul Materi',
    },
    {
      name: 'format',
      type: 'select',
      options: [
        { label: 'PDF', value: 'pdf' },
        { label: 'Video', value: 'video' },
        { label: 'Artikel/Modul', value: 'modul' },
      ],
      label: 'Format File',
      required: true,
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'File Unduhan (Jika Ada)',
    },
    {
      name: 'deskripsi',
      type: 'textarea',
      label: 'Deskripsi Singkat',
    },
  ],
}

