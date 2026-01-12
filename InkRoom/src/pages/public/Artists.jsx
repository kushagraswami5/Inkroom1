import { useEffect, useState } from "react"
import { getApprovedArtists } from "@/services/artist.service"
import ArtistCard from "@/components/cards/ArtistCard"

export default function Artists() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApprovedArtists()
      .then(setArtists)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">All Artists</h1>

      {loading && (
        <p className="text-muted-foreground">
          Loading artists…
        </p>
      )}

      {!loading && artists.length === 0 && (
        <p className="text-muted-foreground">
          No artists available right now.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map(a => (
          <ArtistCard key={a._id} artist={a} />
        ))}
      </div>
    </div>
  )
}
