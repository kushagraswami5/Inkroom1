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

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))

app.get("/", (req, res) => {
  res.send("API running")
})

app.use("/api/auth", authRoutes)
app.use("/api/artists", artistRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminAuthRoutes)
app.use("/api/artist", artistOnboardingRoutes)

app.listen(5000, () => console.log("Server running on 5000"))
