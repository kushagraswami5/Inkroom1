import express from "express"
import { submitOnboarding } from "../controllers/artistOnboardingController.js"
import { protect } from "../middleware/authMiddleware.js"
import { allowRoles } from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post(
  "/onboarding",
  protect,
  allowRoles("artist"),
  submitOnboarding
)

export default router
