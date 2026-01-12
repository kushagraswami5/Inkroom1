import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "@/services/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    setError("")

    if (!email || !password) {
      setError("All fields are required")
      return
    }

    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    localStorage.setItem("pendingEmail", email)
    navigate("/verify-otp")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <select
            className="w-full border rounded-md px-3 py-2 text-sm"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="user">I want a tattoo</option>
            <option value="artist">I am an artist</option>
          </select>

          <Button className="w-full" onClick={handleSignup}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
