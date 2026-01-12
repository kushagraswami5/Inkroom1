import API_URL from "./api"

export async function getApprovedArtists() {
  const res = await fetch(`${API_URL}/api/artists`)
  if (!res.ok) throw new Error("Failed to fetch artists")
  return res.json()
}
