import { getTVDetails, getTVSeasonDetails } from "@/lib/tmdb"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MediaRow } from "@/components/media-row"
import { TVDetailClient } from "./tv-detail-client"

interface Props {
  params: Promise<{ id: string }>
}

export default async function TVPage({ params }: Props) {
  const { id } = await params
  const tvId = Number(id)
  let show: any = null
  let seasonDetails: any[] = []

  try {
    show = await getTVDetails(tvId)
    seasonDetails = await Promise.all(
      show.seasons
        .filter((s: { season_number: number }) => s.season_number > 0)
        .map((s: { season_number: number }) =>
          getTVSeasonDetails(tvId, s.season_number)
        )
    )
  } catch (error) {
    console.error("Failed to load TV show:", error)
  }

  if (!show) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="text-muted-foreground">Impossible de charger cette serie.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <TVDetailClient show={show} seasonDetails={seasonDetails} />
      {show.similar?.results?.length > 0 && (
        <div className="pb-8">
          <MediaRow
            title="Series similaires"
            items={show.similar.results}
            mediaType="tv"
          />
        </div>
      )}
      <Footer />
    </main>
  )
}
