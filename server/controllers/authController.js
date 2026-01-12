import User from "../models/User.js"
import bcrypt from "bcryptjs"
import generateOTP from "../utils/generateOtp.js"
import sendOtpEmail from "../utils/sendOtpEmail.js"
import jwt from "jsonwebtoken"

/*
====================================
SIGN UP (USER / ARTIST)
OTP sent ONLY ONCE for verification
====================================
*/
export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body

    // ❌ Validate input
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "Email is required" })
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" })
    }

    if (!["user", "artist"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }

    // ❌ Admin not allowed here
    if (role === "admin") {
      return res.status(400).json({
        message: "Admin signup is not allowed"
      })
    }

    // ❌ Existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please login."
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate OTP
    const otp = generateOTP()

    // Create user
    await User.create({
      email,
      password: hashedPassword,
      role,
      isVerified: false,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000 // 10 minutes
    })

    // Send OTP
    await sendOtpEmail(email, otp)

    res.json({
      message: "OTP sent to email for verification"
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Signup failed"
    })
  }
}

/*
====================================
VERIFY OTP (ACTIVATE ACCOUNT)
====================================
*/
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body

    // ❌ Block empty fields
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Account already verified"
      })
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      })
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired"
      })
    }

    // ✅ Verify user
    user.isVerified = true
    user.otp = null
    user.otpExpires = null
    await user.save()

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
  message: "Email verified successfully",
  token,
  role: user.role,
  profileCompleted: user.profileCompleted,
  approved: user.approved
})

  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "OTP verification failed"
    })
  }
}

/*
====================================
LOGIN (EMAIL + PASSWORD)
NO OTP
====================================
*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // ❌ Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email first"
      })
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    // Issue token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
  message: "Login successful",
  token,
  role: user.role,
  profileCompleted: user.profileCompleted,
  approved: user.approved
})

  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: "Login failed"
    })
  }
}
