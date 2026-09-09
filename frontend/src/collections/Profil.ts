import type { CollectionConfig, GlobalConfig } from 'payload'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

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
      name: 'nama_desa',
      type: 'text',
      label: 'Nama Desa',
      defaultValue: 'Mertan',
    },
    {
      name: 'kecamatan',
      type: 'text',
      label: 'Kecamatan',
      defaultValue: 'Sentolo',
    },
    {
      name: 'kabupaten',
      type: 'text',
      label: 'Kabupaten',
      defaultValue: 'Kulon Progo',
    },
    {
      name: 'provinsi',
      type: 'text',
      label: 'Provinsi',
      defaultValue: 'DI Yogyakarta',
    },
    {
      name: 'deskripsi_singkat',
      type: 'textarea',
      label: 'Deskripsi Singkat Desa',
    },
    {
      name: 'foto_desa',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Profil Desa',
    },
    {
      name: 'sejarah',
      type: 'richText',
      label: 'Sejarah Desa',
    },
    {
      name: 'kondisi_wilayah',
      type: 'richText',
      label: 'Kondisi Wilayah',
    },
    {
      name: 'demografi',
      type: 'richText',
      label: 'Demografi',
    },
    {
      name: 'maps_embed_url',
      type: 'text',
      label: 'URL Embed Google Maps',
    },
    {
      name: 'visi',
      type: 'richText',
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
      name: 'judul_video_profil',
      type: 'text',
      label: 'Judul Bagian Video Homepage',
      defaultValue: 'Mengenal Dusun Mertan',
    },
    {
      name: 'deskripsi_video',
      type: 'textarea',
      label: 'Teks Deskripsi di Bagian Video Homepage',
      defaultValue: 'Saksikan keindahan pemandangan jalur rel kereta api yang melintasi hamparan persawahan di Dusun Mertan melalui video profil kami. Jelajahi pesona alam dan keseharian masyarakat yang terekam dalam lensa.',
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
    lexicalHTML('sejarah', { name: 'sejarah_html' }),
    lexicalHTML('kondisi_wilayah', { name: 'kondisi_wilayah_html' }),
    lexicalHTML('demografi', { name: 'demografi_html' }),
    lexicalHTML('visi', { name: 'visi_html' }),
    lexicalHTML('misi', { name: 'misi_html' }),
  ],
}
