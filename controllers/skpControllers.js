import prisma from "../prisma/client";

const getAllSKP = async (req, res) => {
    console.log('Masuk ke getAllSKP controller');
    console.log('Masuk ke getAllSKP controller');
  try {
    const dataSKP = await prisma.skp_skp.findMany({
      include: {
        pegawai: true,
      },
    });
    res.status(200).json(dataSKP);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data pegawai" });
  }
};

export default getAllSKP;