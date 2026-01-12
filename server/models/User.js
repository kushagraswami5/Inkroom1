import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: String,

    role: {
      type: String,
      enum: ["user", "artist", "admin"],
      default: "user"
    },

    // AUTH
    isVerified: {
      type: Boolean,
      default: false
    },

    otp: String,
    otpExpires: Date,

    authProvider: {
      type: String,
      enum: ["email", "google"],
      default: "email"
    },

    // ARTIST STATE
    profileCompleted: {
      type: Boolean,
      default: false
    },

    approved: {
      type: Boolean,
      default: false
    },

    // ARTIST ONBOARDING DATA
    artistProfile: {
      name: String,
      city: String,
      priceRange: String,
      tattooStyles: [String],
      instagram: String,
      whatsapp: String,
      portfolio: [String]
    }
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)
