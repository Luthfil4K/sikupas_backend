import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

export const loginUser = async (req) => {
  const { username, password } = req.body;
  console.log(username,password)
  console.log(username,password)

  const user = await prisma.pegawai.findUnique({
    where: { nip_bps: username },
    select: {
      nama: true,
      nip_bps:true,
      nip:true,
      jabatan:true,
      wilayah:true,
      password:true
    }
  });


  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 💡 Gunakan bcrypt.compare untuk validasi
  const isPasswordValid = await bcrypt.compare(password, user.password);


  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  
  const timKetua = await prisma.tbl_tim_kerja.findMany({
    where:{
      tim_niplama_ketua : user.nip_bps
    },
    select:{
      tim_kode:true,
    }
  })


  let role='anggota'
  let tim_kode = null

  if(timKetua) {
    role='ketua_tim'
    tim_kode=timKetua;
  }

  // Buat token JWT
  const token = jwt.sign(
    {
      nama: user.nama,
      nip_bps: user.nip_bps,
      nip:user.nip,
      jabatan: user.jabatan,
      wilayah: user.wilayah,
      role,
      tim_kode
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Return token + data user (tanpa password)
  const { password: _, ...userSafe } = user;

  return { token, user: {...userSafe,role,tim_kode} };
};
