import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "@/services/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtistOnboarding() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    city: "",
    priceRange: "",
    tattooStyles: "",
    instagram: "",
    whatsapp: "",
    portfolio: ""
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitProfile = async () => {
    setError("")

    if (!form.name || !form.city || !form.priceRange) {
      setError("Please fill required fields")
      return
    }

    const res = await fetch(`${API_URL}/api/artist/onboarding`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        ...form,
        tattooStyles: form.tattooStyles.split(","),
        portfolio: form.portfolio.split(",")
      })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    navigate("/artist/pending")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Artist Profile Setup</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input name="name" placeholder="Your Name" onChange={handleChange} />
          <Input name="city" placeholder="City" onChange={handleChange} />
          <Input name="priceRange" placeholder="Price Range (₹)" onChange={handleChange} />
          <Input name="tattooStyles" placeholder="Styles (comma separated)" onChange={handleChange} />
          <Input name="instagram" placeholder="Instagram Handle" onChange={handleChange} />
          <Input name="whatsapp" placeholder="WhatsApp Number" onChange={handleChange} />
          <Input name="portfolio" placeholder="Portfolio Links (comma separated)" onChange={handleChange} />

          <Button className="w-full" onClick={submitProfile}>
            Submit for Approval
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
