import { getPayload } from 'payload'
import configPromise from './payload.config'
import path from 'path'

async function seed() {
  const payload = await getPayload({ config: configPromise })
  
  // Create Media 1
  const media1 = await payload.create({
    collection: 'media',
    data: { alt: 'Spot Foto Kereta Tikungan' },
    filePath: 'C:/Users/Lenovo/.gemini/antigravity-ide/brain/801c0977-10be-4b27-8ed3-8cbf7e25abb3/spot_kereta_1788599928183.jpg'
  })
  
  // Dummy 1
  await payload.create({
    collection: 'potensi',
    data: {
      judul: 'Spot Foto Tikungan Maut Kereta',
      kategori: 'wahana',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Spot fotografi terbaik di Kelok Mertan! Anda bisa mendapatkan angle sempurna saat kereta meliuk tajam dengan latar perbukitan hijau. Sangat direkomendasikan datang di pagi atau sore hari saat cahaya matahari sedang bagus.', version: 1 }]
            }
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1
        }
      },
      foto: media1.id,
      sumber_data: 'Buka setiap hari, Gratis (kecuali bayar parkir)'
    }
  })
  
  // Dummy 2
  await payload.create({
    collection: 'potensi',
    data: {
      judul: 'Warung Kopi Tepi Sawah & Rel',
      kategori: 'kuliner',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Tempat istirahat nyaman untuk menikmati kopi lokal dan gorengan hangat sambil menunggu kereta melintas. Warung ini dikelola langsung oleh warga lokal dengan harga yang sangat terjangkau.', version: 1 }]
            }
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1
        }
      },
      foto: media1.id, // Reuse the same image for simplicity
      sumber_data: 'Harga mulai Rp 5.000'
    }
  })
  
  // Dummy 3
  await payload.create({
    collection: 'potensi',
    data: {
      judul: 'Sewa Sepeda Onthel Keliling Desa',
      kategori: 'paket',
      deskripsi: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Nikmati suasana pedesaan dengan menyewa sepeda onthel klasik. Rute yang disarankan adalah menyusuri persawahan dari Dusun Mertan hingga ke stasiun terdekat. Sangat cocok untuk wisata keluarga.', version: 1 }]
            }
          ],
          direction: null,
          format: '',
          indent: 0,
          version: 1
        }
      },
      foto: media1.id,
      sumber_data: 'Rp 20.000 / Jam'
    }
  })

  console.log('Seeding selesai! 3 data dummy telah ditambahkan.')
  process.exit(0)
}

seed()
