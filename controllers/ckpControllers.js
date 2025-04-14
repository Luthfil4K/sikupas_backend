import prisma from "../prisma/client";

const getAllPegawai = async (req, res) => {
  try {
    const dataPegawai = await prisma.skp_ckp.findMany({
      
    });
    console.log()
    res.status(200).json(dataPegawai);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data pegawai" });
  }
};

export default getAllPegawai;