import type { CollectionConfig, GlobalConfig } from 'payload'

export const Profil: GlobalConfig = {
  slug: 'profil',
  label: 'Profil Desa',
  admin: {
    group: 'Profil',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sejarah',
      type: 'richText',
      label: 'Sejarah Desa',
    },
    {
      name: 'visi',
      type: 'textarea',
      label: 'Visi',
    },
    {
      name: 'misi',
      type: 'richText',
      label: 'Misi',
    },
    {
      name: 'video_youtube_url',
      type: 'text',
      label: 'URL Video YouTube',
    },
    {
      name: 'sosmed_instagram',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'sosmed_facebook',
      type: 'text',
      label: 'Facebook URL',
    },
  ],
}

