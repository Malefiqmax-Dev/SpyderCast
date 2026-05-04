"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MediaCard } from "./media-card"
import { PlayerModal } from "./player-modal"
import { getMovieTrailer, getTVTrailer } from "@/lib/tmdb"

interface MediaItem {
  id: number
  title?: string
  name?: string
  poster_path: string | null
  vote_average: number
  media_type?: string
  release_date?: string
  first_air_date?: string
}

interface MediaRowProps {
  title: string
  items: MediaItem[]
  mediaType?: "movie" | "tv"
}

export function MediaRow({ title, items, mediaType }: MediaRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const [trailerTitle, setTrailerTitle] = useState("")

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  async function playTrailer(id: number, type: "movie" | "tv", title: string) {
    const key = type === "movie" ? await getMovieTrailer(id) : await getTVTrailer(id)
    if (key) {
      setTrailerUrl(`https://www.youtube.com/embed/${key}?autoplay=1`)
      setTrailerTitle(title)
    }
  }

  return (
    <section className="relative py-6">
      <h2 className="mb-2 px-4 font-display text-xl font-bold text-foreground lg:px-8">
        {title}
      </h2>
      <div className="mb-4 mx-4 lg:mx-8 h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-1 z-10 -translate-y-1/2 rounded-full bg-amber-900/70 p-2 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-amber-800/80 group-hover:opacity-100"
          aria-label="Defiler vers la gauche"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-3 overflow-x-auto px-4 py-4 lg:px-8"
        >
          {items.map((item) => {
            const type = mediaType || (item.media_type as "movie" | "tv") || "movie"
            const title = item.title || item.name || ""
            return (
              <div key={item.id} className="w-[140px] flex-shrink-0 sm:w-[160px] lg:w-[185px]">
                  <MediaCard
                  id={item.id}
                  title={title}
                  posterPath={item.poster_path}
                  voteAverage={item.vote_average}
                  mediaType={type}
                  releaseDate={item.release_date || item.first_air_date}
                />
              </div>
            )
          })}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-1 z-10 -translate-y-1/2 rounded-full bg-amber-900/70 p-2 text-foreground opacity-0 backdrop-blur-sm transition-opacity hover:bg-amber-800/80 group-hover:opacity-100"
          aria-label="Defiler vers la droite"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {trailerUrl && (
        <PlayerModal
          url={trailerUrl}
          title={trailerTitle}
          onClose={() => setTrailerUrl(null)}
        />
      )}
    </section>
  )
}
