import prisma from "../prisma/client";
import bcrypt from 'bcryptjs';

const getAllPegawai = async (req, res) => {


  const bulanIni = new Date();

  const awalBulanSebelumnya = new Date(bulanIni.getFullYear(), bulanIni.getMonth()-1, 1);
  const akhirBulanSebelumnya = new Date(bulanIni.getFullYear(), bulanIni.getMonth(), 0);
  akhirBulanSebelumnya.setHours(23,40,50)
  

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
        kegiatan: {
          where: {
            keg_tanggal_awal: {
              gte: awalBulanSebelumnya,
              lte: akhirBulanSebelumnya,
            },
          },
          select: {
            keg_deskripsi: true,
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

export const changePasswordPegawai = async (req, res) => {

  const { nip, oldPassword, newPassword } = req.body;

  
  if (!nip || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const cleanedNip = nip.replace(/^"+|"+$/g, '');

  try {
    // Ambil user dari database
    const user = await prisma.pegawai.findUnique({
      where: { nip:cleanedNip },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Cek apakah oldPassword cocok dengan password di DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect old password' });
    }

    // Hash password baru
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Simpan ke DB
    await prisma.pegawai.update({
      where: { nip:cleanedNip },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }

}

export default getAllPegawai;