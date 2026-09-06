import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor, HTMLConverterFeature } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'

import { Profil } from './src/collections/Profil'
import { UMKM } from './src/collections/UMKM'
import { Media } from './src/collections/Media'
import { Galeri } from './src/collections/Galeri'
import { Program } from './src/collections/Program'
import { Edukasi } from './src/collections/Edukasi'
import { Potensi } from './src/collections/Potensi'
import { Kegiatan } from './src/collections/Kegiatan'
import { Insight } from './src/collections/Insight'
import { KelompokTani } from './src/collections/KelompokTani'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    theme: 'dark',
    components: {
      Nav: '/src/components/CustomNav',
      views: {
        dashboard: {
          Component: '/src/components/CustomDashboard',
        },
      },
    },
    importMap: {
      autoGenerate: false,
    },
  },
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    Media,
    UMKM,
    Galeri,
    Program,
    Edukasi,
    Potensi,
    Kegiatan,
    Insight,
    KelompokTani,
  ],
  globals: [
    Profil,
  ],
  secret: process.env.PAYLOAD_SECRET || 'rahasia-payload-12345',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    ...(process.env.S3_ACCESS_KEY_ID && process.env.S3_ACCESS_KEY_ID !== 'kunci_akses_s3_supabase' ? [
      s3Storage({
        collections: {
          media: true,
        },
        bucket: process.env.S3_BUCKET || '',
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
          },
          region: process.env.S3_REGION || 'ap-southeast-1',
          endpoint: process.env.S3_ENDPOINT || '',
          forcePathStyle: true,
        },
      })
    ] : []),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
