import Navbar from "@/components/nav/Navbar"

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </>
  )
}
