import express from "express"
import {
  createBooking,
  getMyBookings,
  getArtistBookings,
  updateBookingStatus,
  getAllBookings
} from "../controllers/bookingController.js"

import { protect } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post("/", protect, createBooking)

// USER
router.get("/me", protect, getMyBookings)

// ARTIST
router.get(
  "/artist",
  protect,
  allowRoles("artist"),
  getArtistBookings
)

router.put(
  "/:id",
  protect,
  updateBookingStatus
)
router.get("/all", protect, allowRoles("admin"), getAllBookings)
export default router
