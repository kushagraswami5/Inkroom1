import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import artistRoutes from "./routes/artistRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import adminAuthRoutes from "./routes/adminAuthRoutes.js"
import artistOnboardingRoutes from "./routes/artistOnboardingRoutes.js"

dotenv.config()
const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://inkroom1.vercel.app"
    ],
    credentials: true
  })
)

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err))

app.get("/", (req, res) => {
  res.send("API running")
})

app.use("/api/auth", authRoutes)
app.use("/api/artists", artistRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/admin", adminAuthRoutes)
app.use("/api/artist", artistOnboardingRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`)
})
