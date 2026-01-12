import User from "../models/User.js"

/*
====================================
GET ARTISTS
====================================
• Public → only approved artists
• Admin  → all artists (?all=true)
====================================
*/
export const getArtists = async (req, res) => {
  try {
    const filter = { role: "artist" }

    // Public users → only approved artists
    if (req.query.all !== "true") {
      filter.approved = true
    }

    const artists = await User.find(filter).select(
      "-password -otp -otpExpires"
    )

    res.json(artists)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch artists" })
  }
}

/*
====================================
APPROVE ARTIST (ADMIN ONLY)
====================================
*/
export const approveArtist = async (req, res) => {
  try {
    const artist = await User.findOneAndUpdate(
      { _id: req.params.id, role: "artist" },
      { approved: true },
      { new: true }
    )

    if (!artist) {
      return res.status(404).json({
        message: "Artist not found"
      })
    }

    res.json({
      message: "Artist approved successfully",
      artist
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to approve artist" })
  }
}
