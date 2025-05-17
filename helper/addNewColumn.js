import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updatePasswords() {
  const allUsers = await prisma.pegawai.findMany();

  for (const user of allUsers) {
    const hashed = await bcrypt.hash(user.nip, 10);

    
    await prisma.pegawai.update({
      where: { nip: user.nip },
      data: {
        password: hashed,
      },
    });
  }

  console.log("clear");
  await prisma.$disconnect();
}

updatePasswords().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});