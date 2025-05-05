// pages/api/pegawai/me.js
import verifyToken from "../../../lib/middleware/auth";
import prisma from "../../../prisma/client";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  // ⛑️ Setup CORS dulu, paling atas
  await NextCors(req, res, {
    origin: ['http://localhost:5173',process.env.ORIGIN_CORS_URL],
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  });

  // ✅ Tangani preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ⛔ Hanya izinkan GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 🔐 Verifikasi token
    const user = verifyToken(req);

    // 🧠 Ambil data user dari DB
    const data = await prisma.pegawai.findUnique({
      where: { nip_bps: user.nip_bps },
    });

    if (!data) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // ✅ Kirim response
    return res.status(200).json(data);
  } catch (err) {
    console.error("Token error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
}
