import prisma from "../prisma/client";

const getAllPegawai = async (req, res) => {


  const bulanIni = new Date();
const awalBulan = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 1);
const akhirBulan = new Date(bulanIni.getFullYear(), bulanIni.getMonth() + 1, 0);

  try {
    const dataPegawai = await prisma.pegawai.findMany({
      include: {
        timkerja: true,
        ckp: {
          where: {
            tglMulai: {
              gte: awalBulan,
            },
          },
          select: {
            progress: true, // hanya ambil kolom progress
          },
        },
      },
    });
    
    console.log()
    res.status(200).json(dataPegawai);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Gagal mengambil data pegawai"+err });
  }
};

export default getAllPegawai;