import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  const logout = () => {
  localStorage.clear()
  navigate("/login")
}


  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          InkRoom
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {!token && (
            <>
              <Link to="/artists">Artists</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/artists">Artists</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {token && role === "artist" && (
            <>
              <Link to="/artist">Artist Dashboard</Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin">Admin Dashboard</Link>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t px-4 py-4 space-y-3 bg-white">

          {!token && (
            <>
              <Link to="/artists" onClick={() => setOpen(false)}>Artists</Link>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </>
          )}

          {token && role === "user" && (
            <>
              <Link to="/artists" onClick={() => setOpen(false)}>Artists</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Button variant="outline" className="w-full" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {token && role === "artist" && (
            <>
              <Link to="/artist" onClick={() => setOpen(false)}>Artist Dashboard</Link>
              <Button variant="outline" className="w-full" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {token && role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setOpen(false)}>Admin Dashboard</Link>
              <Button variant="outline" className="w-full" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
