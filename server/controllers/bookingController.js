import Booking from "../models/Booking.js"

// ==========================
// CREATE BOOKING (USER)
// ==========================
export const createBooking = async (req, res) => {
  try {
    const { artistId, date, time, phone, address } = req.body

    if (!artistId || !date || !time || !phone || !address) {
      return res.status(400).json({
        message: "All booking fields are required"
      })
    }

    const booking = await Booking.create({
      userId: req.user.id,
      artistId,
      date,
      time,
      phone,
      address
    })

    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ==========================
// USER: MY BOOKINGS
// ==========================
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id
    })
      .populate("artistId", "name artistProfile")
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ==========================
// ARTIST: MY BOOKINGS
// ==========================
export const getArtistBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      artistId: req.user.id
    })
      .populate("userId", "email")
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// ==========================
// UPDATE BOOKING STATUS
// ==========================
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!["accepted", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Artist OR Admin only
    if (
      booking.artistId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    booking.status = status
    await booking.save()

    res.json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
// ================================
// ADMIN → GET ALL BOOKINGS
// ================================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("artistId", "artistProfile.name")
      .populate("userId", "email")

    res.json(bookings)
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch bookings"
    })
  }
}

