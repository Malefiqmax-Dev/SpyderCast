import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { MediaRow } from "@/components/media-row"
import { Top10 } from "@/components/top-10"
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getPopularTV,
  getTopRatedTV,
} from "@/lib/tmdb"

export default async function HomePage() {
  let trending = { results: [] }
  let popularMovies = { results: [] }
  let topRatedMovies = { results: [] }
  let nowPlaying = { results: [] }
  let popularTV = { results: [] }
  let topRatedTV = { results: [] }

  try {
    const [fetchedTrending, fetchedPopularMovies, fetchedTopRatedMovies, fetchedNowPlaying, fetchedPopularTV, fetchedTopRatedTV] =
      await Promise.allSettled([
        getTrending("all", "week"),
        getPopularMovies(),
        getTopRatedMovies(),
        getNowPlayingMovies(),
        getPopularTV(),
        getTopRatedTV(),
      ])

    if (fetchedTrending.status === "fulfilled") trending = fetchedTrending.value
    if (fetchedPopularMovies.status === "fulfilled") popularMovies = fetchedPopularMovies.value
    if (fetchedTopRatedMovies.status === "fulfilled") topRatedMovies = fetchedTopRatedMovies.value
    if (fetchedNowPlaying.status === "fulfilled") nowPlaying = fetchedNowPlaying.value
    if (fetchedPopularTV.status === "fulfilled") popularTV = fetchedPopularTV.value
    if (fetchedTopRatedTV.status === "fulfilled") topRatedTV = fetchedTopRatedTV.value
  } catch (error) {
    console.error("Failed to load homepage data:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroBanner items={trending.results} />
      <div className="-mt-16 relative z-10">
        {trending.results.length > 0 && <Top10 items={trending.results} />}
        {trending.results.length > 0 && <MediaRow title="Tendances de la semaine" items={trending.results} />}
        {popularMovies.results.length > 0 && <MediaRow title="Films populaires" items={popularMovies.results} mediaType="movie" />}
        {topRatedMovies.results.length > 0 && <MediaRow title="Films les mieux notes" items={topRatedMovies.results} mediaType="movie" />}
        {nowPlaying.results.length > 0 && <MediaRow title="En salle actuellement" items={nowPlaying.results} mediaType="movie" />}
        {popularTV.results.length > 0 && <MediaRow title="Series populaires" items={popularTV.results} mediaType="tv" />}
        {topRatedTV.results.length > 0 && <MediaRow title="Series les mieux notees" items={topRatedTV.results} mediaType="tv" />}
      </div>
      <Footer />
    </main>
  )
}
