import { useEffect, useState } from "react"
import {
  getArtistBookings,
  updateBookingStatus
} from "@/services/artistBooking.service"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  accepted: "bg-blue-100 text-blue-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-green-100 text-green-700"
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = () => {
    setLoading(true)
    getArtistBookings()
      .then(setBookings)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateStatus = async (id, status) => {
    await updateBookingStatus(id, status)

    setBookings(prev =>
      prev.map(b =>
        b._id === id ? { ...b, status } : b
      )
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
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
          No bookings assigned yet.
        </p>
      )}

      <div className="space-y-4">
        {bookings.map(b => (
          <Card key={b._id}>
            <CardContent className="p-4 space-y-3">

              <div className="flex justify-between items-center">
                <p className="font-medium">
                  Booking #{b._id.slice(-6)}
                </p>

                <span
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    statusStyles[b.status]
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <p className="text-sm">
                📅 {b.date} &nbsp; ⏰ {b.time}
              </p>

              <p className="text-sm text-muted-foreground">
                📍 {b.address}
              </p>

              <p className="text-sm text-muted-foreground">
                📞 {b.phone}
              </p>

              {/* ACTIONS */}
              {b.status === "pending" && (
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    onClick={() =>
                      updateStatus(b._id, "accepted")
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      updateStatus(b._id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}

              {b.status === "accepted" && (
                <Button
                  size="sm"
                  onClick={() =>
                    updateStatus(b._id, "completed")
                  }
                >
                  Mark Completed
                </Button>
              )}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
