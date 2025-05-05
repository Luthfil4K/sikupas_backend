import jwt from "jsonwebtoken";

// Fungsi untuk memverifikasi token JWT
 const verifyToken = (req) => {
  console.log("verifytoken")
 
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error("Unauthorized");

  // Ambil token dari header Authorization
  const token = authHeader.split(" ")[1];
  console.log("sudah masuk middleware")
  // Verifikasi token menggunakan JWT_SECRET yang ada di .env
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default verifyToken
