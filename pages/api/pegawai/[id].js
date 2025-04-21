// pages/api/pegawai/[id].js
import NextCors from 'nextjs-cors';
import prisma from '../../../prisma/client';

export default async function handler(req, res) {
    await NextCors(req, res, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // credentials: true, // ✅ Tambahkan ini
      });
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const pegawai = await prisma.pegawai.findUnique({
        where: { nip: id.toString() }, 
        include: {
            skp:{
                select: {
                    id:true,
                    sasaran_kinerja: true,
                    indikator: true,
                    realisasi: true,
                    bulan: true,
                    tahun: true,
                    pegawai_nip: true,
                  }
            },
            ckp : {
		select : {
			nip_bps : true,
			bulan : true,
			tahun : true,
			tglMulai : true,
			tglSelesai : true,
			kegiatan : true,
			capaian : true,
			dataDukung : true,
		}
	    },
	    timkerja : {
		include : {
			tim : {
				include : {
					timKerja : true
				}
			}
		}
	    },
          },
      });

  console.log(pegawai)

      if (!pegawai) {
        return res.status(404).json({ message: "Pegawai tidak ditemukan" });
      }
      

      return res.status(200).json(pegawai);
    } catch (error) {
      return res.status(500).json({ message: "Terjadi kesalahan saat mengambil data",error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
