// pages/api/auth/index.js
import { loginUser } from '../../../controllers/authControllers';

export default async function handler(req, res) {
  // ✅ CORS headers manual
  res.setHeader('Access-Control-Allow-Origin', `${process.env.ORIGIN_CORS_URL}`);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // ✅ Tangani OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const user = await loginUser(req);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
