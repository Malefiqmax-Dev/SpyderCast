"use client"

import { useState, useCallback } from "react"
import { MediaCard } from "@/components/media-card"
import { Loader2 } from "lucide-react"

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date: string
}

export function MovieClient({ initialMovies, totalPages }: { initialMovies: Movie[], totalPages: number }) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (page >= totalPages || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/movies/discover?page=${page + 1}`)
      const data = await res.json()
      if (data.results) {
        setMovies((prev) => [...prev, ...data.results])
        setPage((p) => p + 1)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [page, totalPages, loading])

  return (
    <>
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MediaCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            voteAverage={movie.vote_average}
            mediaType="movie"
            releaseDate={movie.release_date}
          />
        ))}
      </div>
      {page < totalPages && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Charger plus"}
          </button>
        </div>
      )}
    </>
  )
}
