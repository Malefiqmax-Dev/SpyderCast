"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Bookmark, Eye, Play } from "lucide-react"
import { getImageUrl } from "@/lib/tmdb"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"

interface MediaCardProps {
  id: number
  title: string
  posterPath: string | null
  voteAverage: number
  mediaType: "movie" | "tv"
  releaseDate?: string
}

export function MediaCard({
  id,
  title,
  posterPath,
  voteAverage,
  mediaType,
  releaseDate,
}: MediaCardProps) {
  const { user, toggleWatchLater, toggleWatched, isWatchLater, isWatched } = useAuth()
  const imageUrl = getImageUrl(posterPath, "w342")
  const href = mediaType === "movie" ? `/movie/${id}` : `/tv/${id}`
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null

  const handleAction = (action: "watchLater" | "watched") => {
    if (!user) {
      toast.error("Veuillez vous connecter pour utiliser cette fonctionnalité.")
      return
    }
    const item = { id, type: mediaType, title, poster_path: posterPath, vote_average: voteAverage }
    if (action === "watchLater") toggleWatchLater(item)
    else toggleWatched(item)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1, zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative"
    >
      <Link href={href} className="group block h-full">
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-white/5 bg-secondary/20">
          <div className="relative aspect-[2/3] w-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary">
                <span className="text-sm text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Action buttons */}
          <div className="absolute top-2 left-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
             {user && (
               <>
                 <button onClick={(e) => { e.preventDefault(); handleAction("watchLater") }} className="rounded-full bg-black/50 p-1.5 backdrop-blur-sm hover:bg-amber-500">
                   <Bookmark className={`h-4 w-4 ${isWatchLater(id, mediaType) ? "fill-amber-500 text-amber-500" : "text-white"}`} />
                 </button>
                 <button onClick={(e) => { e.preventDefault(); handleAction("watched") }} className="rounded-full bg-black/50 p-1.5 backdrop-blur-sm hover:bg-green-500">
                   <Eye className={`h-4 w-4 ${isWatched(id, mediaType) ? "fill-green-500 text-green-500" : "text-white"}`} />
                 </button>
               </>
             )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="text-[11px] font-bold text-white">
                {voteAverage.toFixed(1)}
              </span>
            </div>
            <h3 className="line-clamp-1 text-[11px] font-black uppercase italic tracking-tight text-white">{title}</h3>
            {year && (
              <p className="text-[10px] font-medium text-amber-500/80">{year}</p>
            )}
          </div>
          
          <div className="absolute top-2 right-2 rounded bg-amber-600/90 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-tighter text-white backdrop-blur-sm shadow-xl">
            {mediaType === "movie" ? "Film" : "Serie"}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
