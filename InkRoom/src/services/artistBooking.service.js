import API_URL from "./api"

// ============================
// GET ARTIST BOOKINGS
// ============================
export async function getArtistBookings() {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/api/bookings/artist`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!res.ok) {
    throw new Error("Failed to fetch artist bookings")
  }

  return res.json()
}

// ============================
// UPDATE BOOKING STATUS
// ============================
export async function updateBookingStatus(id, status) {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  })

  if (!res.ok) {
    throw new Error("Failed to update booking status")
  }

  return res.json()
}
