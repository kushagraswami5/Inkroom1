import API_URL from "./api"

export async function getMyBookings() {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/api/bookings/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) throw new Error("Failed to fetch bookings")
  return res.json()
}
