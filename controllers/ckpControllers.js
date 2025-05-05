import prisma from "../prisma/client";

const getAllCkp = async (req, res) => {
  try {
    const dataCkp = await prisma.skp_ckp.findMany({
       include:{
        pegawai:true
       }
    });

    const safeData = dataCkp.map(item => ({
      ...item,
      id: item.id.toString(), // Ubah BigInt ke string
    }));
    console.log("ini dataCkp ")
    console.log(dataCkp)
    console.log("ini dataCkp ")
    
    console.log("dataCkp:", dataCkp);
    if (!dataCkp || !Array.isArray(dataCkp)) {
      console.error("dataCkp is not an array or is undefined");
    }
    

    console.log("ini safeData ")
    console.log(safeData)
    console.log("ini safeData ")
    res.status(200).json(safeData);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data ckp:"+err });
  }
};

export default getAllCkp;