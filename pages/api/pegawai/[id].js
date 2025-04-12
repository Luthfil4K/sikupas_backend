// pages/api/pegawai/[id].js
import NextCors from 'nextjs-cors';
import prisma from '../../../prisma/client';

export default async function handler(req, res) {
    await NextCors(req, res, {
        origin: 'http://localhost:5173',
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
            timkerja: {
              include: {
                tim: {
                    include:{
                        timKerja:true
                    }
                },
              },
            },
          },
      });

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
