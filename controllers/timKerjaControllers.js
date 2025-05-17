import prisma from "../prisma/client";


function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}
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

export const getAllTimKerjaApi = async (req, res) => {
  try {
    const timKerja = await prisma.tbl_tim_kerja.findMany({
      include: {
        tim_lead_by: true,
        tim_member: {
          include:{
            pegawai:true
          }
        },
      },
    });

    const cleanData = JSON.parse(
      JSON.stringify(timKerja, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.status(200).json(cleanData);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data tim kerja: " + err });
  }
};

export default getAllTimKerja;