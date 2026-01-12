import { useEffect, useState } from "react"
import authFetch from "@/utils/authFetch"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [artists, setArtists] = useState([])
  const [bookings, setBookings] = useState([])
  const [view, setView] = useState("pending")
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)

      const [artistsRes, bookingsRes] = await Promise.all([
        authFetch("/api/artists?all=true"),
        authFetch("/api/bookings/all")
      ])

      const artistsData = await artistsRes.json()
      const bookingsData = await bookingsRes.json()

      setArtists(artistsData)
      setBookings(bookingsData)
    } catch (err) {
      console.error("Admin fetch failed:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const approveArtist = async (id) => {
    await authFetch(`/api/artists/approve/${id}`, {
      method: "PUT"
    })
    fetchData()
  }

  const markBookingCompleted = async (id) => {
    await authFetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "completed" })
    })
    fetchData()
  }

  const pendingArtists = artists.filter(a => !a.approved)
  const approvedArtists = artists.filter(a => a.approved)

  if (loading) {
    return <p className="p-10">Loading admin data…</p>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* ================= ARTISTS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Artists</CardTitle>

          <div className="flex gap-2 mt-4">
            <Button
              variant={view === "pending" ? "default" : "outline"}
              onClick={() => setView("pending")}
            >
              Pending
            </Button>

            <Button
              variant={view === "approved" ? "default" : "outline"}
              onClick={() => setView("approved")}
            >
              Approved
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {(view === "pending" ? pendingArtists : approvedArtists).map(artist => (
            <div
              key={artist._id}
              className="border rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {artist.artistProfile?.name || "Unnamed Artist"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {artist.artistProfile?.city}
                  </p>
                </div>

                <Badge variant={artist.approved ? "success" : "warning"}>
                  {artist.approved ? "Approved" : "Pending"}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>Price: {artist.artistProfile?.priceRange}</p>
                <p>
                  Styles:{" "}
                  {artist.artistProfile?.tattooStyles?.join(", ")}
                </p>
                <p>Instagram: {artist.artistProfile?.instagram}</p>
                <p>WhatsApp: {artist.artistProfile?.whatsapp}</p>
              </div>

              {!artist.approved && (
                <Button onClick={() => approveArtist(artist._id)}>
                  Approve Artist
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ================= BOOKINGS ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {bookings.length === 0 && (
            <p className="text-muted-foreground">
              No bookings yet.
            </p>
          )}

          {bookings.map(b => (
            <div
              key={b._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div className="space-y-1">
                <p>Date: {b.date}</p>
                <p>Time: {b.time}</p>
                <Badge>{b.status}</Badge>
              </div>

              {b.status !== "completed" && (
                <Button
                  variant="outline"
                  onClick={() => markBookingCompleted(b._id)}
                >
                  Mark Completed
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
