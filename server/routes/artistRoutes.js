import express from "express"
import {
  getArtists,
  approveArtist
} from "../controllers/artistController.js"

import { protect } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

/*
====================================
GET ARTISTS
• Public → approved artists only
• Admin  → all artists (?all=true)
====================================
*/
router.get("/", getArtists)

/*
====================================
APPROVE ARTIST (ADMIN ONLY)
====================================
*/
router.put(
  "/approve/:id",
  protect,
  allowRoles("admin"),
  approveArtist
)

export default router
