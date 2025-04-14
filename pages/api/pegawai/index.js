import NextCors from 'nextjs-cors';
import getAllPegawai from '../../../controllers/pegawaiControllers';

export default async function handler(req, res) {
  await NextCors(req, res, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true, // ✅ Tambahkan ini
  });

  if (req.method === 'GET') {
    try {
      const data = await getAllPegawai(req, res);
      console.log(data)
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
