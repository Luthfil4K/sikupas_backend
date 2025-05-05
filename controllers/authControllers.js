import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

export const loginUser = async (req) => {
  const { username, password } = req.body;

  const user = await prisma.pegawai.findUnique({
    where: { nip_bps: username },
  });

  if (!user || user.nip !== password) {
    throw new Error('Invalid username or password');
  }

  // Buat token JWT
  const token = jwt.sign(
    {
      id: user.id,
      nama: user.nama,
      nip_bps: user.nip_bps,
      jabatan: user.jabatan,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Return token + data user (tanpa password)
  const { password: _, ...userSafe } = user;

  return { token, user: userSafe };
};
