import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const adminLogin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" })
  }

  const admin = await User.findOne({ email, role: "admin" })
  if (!admin) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const match = await bcrypt.compare(password, admin.password)
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )

  res.json({ token, role: "admin" })
}
