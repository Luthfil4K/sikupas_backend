// pages/api/pegawai/[id].js
import NextCors from 'nextjs-cors';
import prisma from '../../../prisma/client';

export default async function handler(req, res) {
    await NextCors(req, res, {
        origin: ['http://localhost:5173',process.env.ORIGIN_CORS_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // ✅ Tambahkan ini
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
            timkerja : {
              include : {
                tim : {
                  include : {
                    timKerja : true
                  }
                }
              }
            },
            kegiatan:{
              select: {
                keg_id:true,
                keg_bulan:true,
                keg_tahun:true,
                keg_tanggal_awal:true,
                keg_tanggal_akhir:true,
                keg_deskripsi:true,
                keg_capaian:true,
                keg_data_dukung:true,
              }
            },
            tbl_skp: {
              select: {
                skp_id: true,
                skp_rencana_kinerja: true,
                skp_periode_awal:true,
                skp_periode_akhir:true,
                skp_jenis:true,
                skp_tahun:true,
                skp_wilayah:true,
                skp_periode:true,
                kegiatan:{
                  select:{
                    keg_is_skp_id:true,
                    keg_is_skp:true,
                  }
                }
              }
            },
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
            anggota_pegawai: {
              select:{
                tim_which: {
                  select: {
                    tim_nama: true,
                    tim_member: {
                      select:{
                        pegawai:{
                          select:{
                            nip:true,
                            nama:true,
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
        });

        // Ubah BigInt jadi string
        const sanitizeBigInt = (obj) => {
          return JSON.parse(
            JSON.stringify(obj, (key, value) =>
              typeof value === "bigint" ? value.toString() : value
            )
          );
        };

        const result = sanitizeBigInt(pegawai);

      if (!result) {
        return res.status(404).json({ message: "Pegawai tidak ditemukan" });
      }
      

      return res.status(200).json(result);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Terjadi kesalahan saat mengambil data",error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
