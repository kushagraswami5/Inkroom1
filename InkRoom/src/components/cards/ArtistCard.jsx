import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ArtistCard({ artist }) {
  const navigate = useNavigate()
  const profile = artist.artistProfile || {}

  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-40 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
        Artist Portfolio
      </div>

      <CardContent className="flex-1 p-4 space-y-2">
        {/* Name */}
        <h3 className="text-lg font-semibold">
          {profile.name || "Unnamed Artist"}
        </h3>

        {/* City */}
        <p className="text-sm text-muted-foreground">
          📍 {profile.city || "Unknown City"}
        </p>

        {/* Styles */}
        {profile.tattooStyles?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.tattooStyles.map(style => (
              <span
                key={style}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                {style}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        {profile.priceRange && (
          <p className="text-sm font-medium">
            💰 {profile.priceRange}
          </p>
        )}
      </CardContent>

      {/* CTA */}
      <div className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => navigate(`/book/${artist._id}`)}
        >
          Book Now
        </Button>
      </div>
    </Card>
  )
}
