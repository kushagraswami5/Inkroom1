import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: String,
    time: String,

    phone: String,
    address: String,

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
)

export default mongoose.model("Booking", bookingSchema)
