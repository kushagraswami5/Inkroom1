import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import API_URL from "@/services/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookArtist() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")

  const book = async () => {
    setError("")

    if (!date || !time || !phone || !address) {
      setError("All fields are required")
      return
    }

    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        artistId: id,
        date,
        time,
        phone,
        address
      })
    })

    if (!res.ok) {
      setError("Booking failed. Try again.")
      return
    }

    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Book Artist</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />

          <Input
            placeholder="Preferred time (eg. 5 PM)"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <Input
            placeholder="Mobile number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <Input
            placeholder="Full address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <Button className="w-full" onClick={book}>
            Confirm Booking
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
