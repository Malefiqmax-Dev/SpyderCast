import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getPopularMovies } from "@/lib/tmdb"
import { MovieClient } from "./movie-client"

export const metadata = {
  title: "Films - SpyderCast",
  description: "Explorez notre sélection de films.",
}

export default async function MoviesPage() {
  let initialMovies = { results: [], total_pages: 1 }

  try {
    const data = await getPopularMovies(1)
    initialMovies = data
    // Sort movies alphabetically by title
    initialMovies.results.sort((a: { title: string }, b: { title: string }) =>
      a.title.localeCompare(b.title)
    )
  } catch (error) {
    console.error("Failed to load movies:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="px-4 pt-24 pb-12 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
          Films
        </h1>
        <p className="mt-2 text-muted-foreground">
          Découvrez notre sélection de films.
        </p>
        <MovieClient initialMovies={initialMovies.results} totalPages={initialMovies.total_pages} />
      </div>
      <Footer />
    </main>
  )
}
