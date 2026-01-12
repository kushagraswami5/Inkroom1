import User from "../models/User.js"

export const submitOnboarding = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId)

    if (!user || user.role !== "artist") {
      return res.status(403).json({ message: "Access denied" })
    }

    if (user.profileCompleted) {
      return res.status(400).json({
        message: "Onboarding already completed"
      })
    }

    user.artistProfile = {
      ...req.body
    }

    user.profileCompleted = true
    user.approved = false

    await user.save()

    res.status(201).json({
      message: "Onboarding submitted",
      profileCompleted: true,
      approved: false
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Onboarding failed" })
  }
}
