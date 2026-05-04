"use client"

import React, { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { getImageUrl } from "@/lib/tmdb"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MediaCard } from "./media-card"

interface Top10Props {
  items: any[]
}

export function Top10({ items }: Top10Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const top10 = items.slice(0, 10)

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (top10.length === 0) return null

  return (
    <section className="px-4 py-8 lg:px-8">
      <h2 className="mb-2 font-display text-2xl font-black tracking-tight text-white uppercase italic">
        Top 10 <span className="text-amber-500">de la semaine</span>
      </h2>
      <div className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-600" />
      
      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-amber-900/70 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-amber-800/80 group-hover:opacity-100"
          aria-label="Defiler vers la gauche"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pt-10 pb-12 hide-scrollbar snap-x"
        >
          {top10.map((item, index) => {
            const title = item.title || item.name || ""
            const type = item.media_type || (item.title ? "movie" : "tv")
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex min-w-[220px] flex-none snap-start items-end pt-10"
              >
                {/* Rank Number */}
                <div className="absolute left-[-10px] bottom-[-15px] z-10 select-none">
                  <span className="text-[140px] font-black leading-none tracking-tighter text-transparent" 
                        style={{ WebkitTextStroke: "2px rgba(255,255,255,0.6)" }}>
                    {index + 1}
                  </span>
                </div>

                <div className="ml-12 w-[190px]">
                  <MediaCard
                    id={item.id}
                    title={title}
                    posterPath={item.poster_path}
                    voteAverage={item.vote_average}
                    mediaType={type}
                    releaseDate={item.release_date || item.first_air_date}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-amber-900/70 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-amber-800/80 group-hover:opacity-100"
          aria-label="Defiler vers la droite"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}
