import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MediaCard } from "@/components/media-card"
import { getPopularTV, getTopRatedTV } from "@/lib/tmdb"

export default async function TVPage() {
  let popular = { results: [] }
  let topRated = { results: [] }

  try {
    const [popularResult, topRatedResult] = await Promise.allSettled([
      getPopularTV(),
      getTopRatedTV(),
    ])
    if (popularResult.status === "fulfilled") popular = popularResult.value
    if (topRatedResult.status === "fulfilled") topRated = topRatedResult.value
  } catch (error) {
    console.error("Failed to load TV data:", error)
  }

  const allShows = [...popular.results, ...topRated.results]

  const uniqueShows = allShows.filter(
    (show: { id: number }, index: number, self: { id: number }[]) =>
      self.findIndex((s) => s.id === show.id) === index
  )

  uniqueShows.sort((a: { name: string }, b: { name: string }) =>
    a.name.localeCompare(b.name)
  )
  console.log("Sorted unique shows:", uniqueShows.map((show) => show.name))

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="px-4 pt-24 pb-12 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
          Series
        </h1>
        <p className="mt-2 text-muted-foreground">
          Decouvrez notre selection de series populaires et les mieux notees.
        </p>
        <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {uniqueShows.map(
            (show: {
              id: number
              name: string
              poster_path: string | null
              vote_average: number
              first_air_date: string
            }) => (
              <MediaCard
                key={show.id}
                id={show.id}
                title={show.name}
                posterPath={show.poster_path}
                voteAverage={show.vote_average}
                mediaType="tv"
                releaseDate={show.first_air_date}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
