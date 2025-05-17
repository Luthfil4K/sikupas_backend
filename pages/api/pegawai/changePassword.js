import NextCors from 'nextjs-cors';
import {changePasswordPegawai} from '../../../controllers/pegawaiControllers';

export default async function handler(req, res) {
    console.log("be change")
  await NextCors(req, res, {
    origin: ['http://localhost:5173',process.env.ORIGIN_CORS_URL,'http://localhost:9202'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // ✅ Tambahkan ini
  });

  console.log("be change")

  if (req.method === 'POST') {
    try {
      const data = await changePasswordPegawai(req, res);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
