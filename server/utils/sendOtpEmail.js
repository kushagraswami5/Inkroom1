import nodemailer from "nodemailer"

const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: `"InkRoom" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your InkRoom OTP Verification",
    html: `
      <h2>InkRoom Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
    `
  })
}

export default sendOtpEmail
