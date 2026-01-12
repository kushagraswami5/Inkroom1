import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API_URL from "@/services/api"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("")

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message)
      return
    }

    // 🔐 Store auth + state
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.role)
    localStorage.setItem("profileCompleted", data.profileCompleted)
    localStorage.setItem("approved", data.approved)

    // 🔀 Redirect based on role & state
    if (data.role === "admin") {
      navigate("/admin")
    }

    if (data.role === "artist") {
      if (!data.profileCompleted) navigate("/artist/onboarding")
      else if (!data.approved) navigate("/artist/pending")
      else navigate("/artist")
    }

    if (data.role === "user") {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to InkRoom</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          
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

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
