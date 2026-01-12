import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getMyBookings } from "@/services/booking.service"
import { getApprovedArtists } from "@/services/artist.service"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ArtistCard from "@/components/cards/ArtistCard"

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-green-100 text-green-700"
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getMyBookings(),
      getApprovedArtists()
    ])
      .then(([bookingData, artistData]) => {
        setBookings(bookingData || [])
        setArtists((artistData || []).slice(0, 3))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">

      {/* ================= MY BOOKINGS ================= */}
      <section className="space-y-6">
        <h1 className="text-2xl font-semibold">
          My Bookings
        </h1>

        {loading && (
          <p className="text-muted-foreground">
            Loading bookings…
          </p>
        )}

        {!loading && bookings.length === 0 && (
          <p className="text-muted-foreground">
            You haven’t booked an artist yet.
          </p>
        )}

        <div className="grid gap-4">
          {bookings.map(b => (
            <Card key={b._id}>
              <CardContent className="p-5 space-y-3">

                <div className="flex justify-between items-center">
                  <p className="font-medium">
                    {b.artistId?.name || "Artist"}
                  </p>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      statusStyles[b.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {b.artistId?.artistProfile?.city}
                </p>

                <p className="text-sm">
                  📅 {b.date} &nbsp; ⏰ {b.time}
                </p>

                <p className="text-sm text-muted-foreground">
                  📍 {b.address}
                </p>

                <p className="text-sm text-muted-foreground">
                  📞 {b.phone}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= BROWSE ARTISTS ================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Book Another Artist
          </h2>

          <Link to="/artists">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map(artist => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  )
}
