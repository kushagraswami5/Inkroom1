import { Link } from "react-router-dom"
import Navbar from "@/components/nav/Navbar"
import { Button } from "@/components/ui/button"
import heroImage from "@/assets/hero-tattoo1.png"

export default function Home() {
  return (
    <>
      

      {/* HERO */}
      <section className="px-4 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Get Tattooed at Home
              <br />
              by Verified Artists
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Book professional tattoo artists at your place.
              Safe, hygienic, and fully verified.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to="/signup">
                <Button size="lg">Get Started</Button>
              </Link>

              <Link to="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-xl overflow-hidden shadow-sm">
  <img
    src={heroImage}
    alt="Professional tattoo artist at home"
    className="w-full h-72 md:h-96 object-cover"
  />
</div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">How InkRoom Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg">1. Choose Artist</h3>
              <p className="text-gray-600 mt-2">
                Browse verified tattoo artists near you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">2. Book Slot</h3>
              <p className="text-gray-600 mt-2">
                Select date and time that works for you.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">3. Get Tattooed</h3>
              <p className="text-gray-600 mt-2">
                Artist arrives at your place fully equipped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTIST CTA */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="rounded-2xl border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Are you a tattoo artist?</h3>
            <p className="text-gray-600 mt-2">
              Grow your business by joining InkRoom.
            </p>
          </div>

          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Become an Artist
            </Button>
          </Link>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Safety & Trust First
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            All artists are identity verified, trained, and approved
            by our team before they appear on the platform.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} InkRoom. All rights reserved.
      </footer>
    </>
  )
}
