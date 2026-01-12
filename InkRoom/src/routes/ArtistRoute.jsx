import { Navigate } from "react-router-dom"

export default function ArtistRoute({ children }) {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const profileCompleted = localStorage.getItem("profileCompleted")
  const approved = localStorage.getItem("approved")

  if (!token) return <Navigate to="/login" replace />
  if (role !== "artist") return <Navigate to="/" replace />

  if (!profileCompleted) return <Navigate to="/artist/onboarding" replace />
  if (!approved) return <Navigate to="/artist/pending" replace />

  return children
}
