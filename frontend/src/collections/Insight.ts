import type { CollectionConfig } from 'payload'

export const Insight: CollectionConfig = {
  slug: 'insight',
  labels: {
    singular: 'Event Kesehatan (Insight)',
    plural: 'Insight Kesehatan',
  },
  admin: {
    group: 'Insight',
    useAsTitle: 'nama_kegiatan',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nama_kegiatan',
      type: 'text',
      required: true,
      label: 'Nama Kegiatan / Skrining',
    },
    {
      name: 'tanggal',
      type: 'date',
      required: true,
      label: 'Tanggal Pelaksanaan',
    },
    {
      name: 'dusun',
      type: 'text',
      label: 'Dusun / Lokasi',
    },
    {
      name: 'jumlah_peserta',
      type: 'number',
      label: 'Total Jumlah Peserta',
    },
    {
      name: 'rentang_usia',
      type: 'text',
      label: 'Rentang Usia (misal: 45-80 tahun)',
    },
    {
      name: 'catatan',
      type: 'textarea',
      label: 'Catatan Umum Kegiatan',
    },
    {
      name: 'disclaimer_text',
      type: 'textarea',
      label: 'Teks Disclaimer Privasi (Wajib Ada)',
      defaultValue: 'Data pada bagian ini merupakan ringkasan hasil kegiatan/skrining peserta program dan tidak merepresentasikan kondisi kesehatan seluruh masyarakat Desa Mertan. Informasi ditampilkan untuk tujuan dokumentasi dan edukasi, bukan sebagai diagnosis medis.',
    },
    {
      name: 'data_agregat',
      type: 'array',
      label: 'Data Hasil Skrining (Agregat)',
      fields: [
        {
          name: 'indikator',
          type: 'select',
          options: [
            { label: 'Tekanan Darah', value: 'tekanan_darah' },
            { label: 'Gula Darah', value: 'gula_darah' },
            { label: 'Kolesterol', value: 'kolesterol' },
            { label: 'Asam Urat', value: 'asam_urat' },
            { label: 'Berat Badan / IMT', value: 'berat_badan' },
            { label: 'Lainnya', value: 'lainnya' },
          ],
          required: true,
          label: 'Indikator Kesehatan',
        },
        {
          name: 'label_nilai',
          type: 'text',
          required: true,
          label: 'Label Kategori (Contoh: Normal, Pra-Hipertensi)',
        },
        {
          name: 'jumlah',
          type: 'number',
          required: true,
          label: 'Jumlah Orang',
        },
        {
          name: 'keterangan',
          type: 'text',
          label: 'Keterangan Tambahan',
        },
      ],
    },
  ],
}

