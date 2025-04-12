import NextCors from 'nextjs-cors';
import getAllTimKerja from '../../../controllers/timKerjaControllers';

export default async function handler(req, res) {
  await NextCors(req, res, {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // ✅ Tambahkan ini
  });

  if (req.method === 'GET') {
    try {
      const data = await getAllTimKerja(req, res);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
