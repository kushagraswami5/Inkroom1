import { Routes, Route } from "react-router-dom"

// Layouts
import PublicLayout from "@/layouts/PublicLayout"
import DashboardLayout from "@/layouts/DashboardLayout"

// Public pages
import Home from "@/pages/public/Home"
import Artists from "@/pages/public/Artists"

// Auth pages
import Signup from "@/pages/auth/Signup"
import Login from "@/pages/auth/Login"
import VerifyOtp from "@/pages/auth/VerifyOtp"
import AdminLogin from "@/pages/auth/AdminLogin"

// Dashboards
import UserDashboard from "@/pages/user/Dashboard"
import ArtistDashboard from "@/pages/artist/Dashboard"
import AdminDashboard from "@/pages/admin/Dashboard"

// Guards
import UserRoute from "@/routes/UserRoute"
import ArtistRoute from "@/routes/ArtistRoute"
import AdminRoute from "@/routes/AdminRoute"

// User actions
import BookArtist from "@/pages/user/BookArtist"
import ArtistOnboarding from "@/pages/artist/Onboarding"
import ArtistPending from "@/pages/artist/Pending"

export default function AppRoutes() {
  return (
    <Routes>

      {/* ---------- PUBLIC ---------- */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/artists"
        element={
          <PublicLayout>
            <Artists />
          </PublicLayout>
        }
      />

      {/* ---------- AUTH ---------- */}
      <Route
        path="/signup"
        element={
          <PublicLayout>
            <Signup />
          </PublicLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <PublicLayout>
            <VerifyOtp />
          </PublicLayout>
        }
      />

      <Route
        path="/admin-login"
        element={
          <PublicLayout>
            <AdminLogin />
          </PublicLayout>
        }
      />

      {/* ---------- USER ---------- */}
      <Route
        path="/dashboard"
        element={
          <UserRoute>
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          </UserRoute>
        }
      />

      <Route
        path="/book/:id"
        element={
          <UserRoute>
            <DashboardLayout>
              <BookArtist />
            </DashboardLayout>
          </UserRoute>
        }
      />
      <Route
  path="/artist/onboarding"
  element={
    <ArtistRoute>
      <ArtistOnboarding />
    </ArtistRoute>
  }
/>

<Route
  path="/artist/pending"
  element={
    <ArtistRoute>
      <ArtistPending />
    </ArtistRoute>
  }
/>

      {/* ---------- ARTIST ---------- */}
      <Route
        path="/artist"
        element={
          <ArtistRoute>
            <DashboardLayout>
              <ArtistDashboard />
            </DashboardLayout>
          </ArtistRoute>
        }
      />

      {/* ---------- ADMIN ---------- */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </AdminRoute>
        }
      />

    </Routes>
  )
}
