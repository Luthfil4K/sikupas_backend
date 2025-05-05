import prisma from "../prisma/client";

const getAllPegawai = async (req, res) => {


  const bulanIni = new Date();

  const awalBulanSebelumnya = new Date(bulanIni.getFullYear(), bulanIni.getMonth() - 1, 1);
  const akhirBulanSebelumnya = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 0);
  

  try {

    const dataPegawai = await prisma.pegawai.findMany({
      include: {
        timkerja: true,
        ckp: {
          where: {
            tglMulai: {
              gte: awalBulanSebelumnya,
              lte: akhirBulanSebelumnya,
            },
          },
          select: {
            progress: true,
          },
        },
      },
    });
    
    res.status(200).json(dataPegawai);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Gagal mengambil data pegawai"+err });
  }
};

export default getAllPegawai;