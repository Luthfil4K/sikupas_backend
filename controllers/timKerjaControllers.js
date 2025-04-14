import prisma from "../prisma/client";

const getAllTimKerja = async (req, res) => {
  try {
    const timKerja = await prisma.tbl_tim.findMany({
      include: {
        timKerja:{
            include:{
                pegawai:true
            },
        } 
      },
    });

    res.status(200).json(timKerja);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data tim kerja"+err });
  }
};

export default getAllTimKerja;