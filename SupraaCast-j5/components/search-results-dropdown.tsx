"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { searchMulti } from "@/lib/tmdb"
import { Loader2, ArrowRight } from "lucide-react"

interface SearchResultsDropdownProps {
  query: string
  onClose: () => void
}

export function SearchResultsDropdown({ query, onClose }: SearchResultsDropdownProps) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await searchMulti(query)
        setResults(data.results.slice(0, 5))
      } catch (e) {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  if (query.length < 2) return null

  return (
    <div className="absolute right-0 top-full mt-2 w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e]/95 backdrop-blur-xl shadow-2xl z-50">
      {loading ? (
        <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Recherche...
        </div>
      ) : results.length > 0 ? (
        <div className="flex flex-col">
          {results.map((item) => {
            const title = item.title || item.name
            const href = item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`
            return (
              <Link
                key={item.id}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/5"
              >
                <div className="h-10 w-8 flex-shrink-0 overflow-hidden rounded bg-secondary">
                  {item.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-foreground truncate">{title}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{item.media_type}</p>
                </div>
              </Link>
            )
          })}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="flex items-center justify-between bg-amber-600/20 px-4 py-3 text-xs font-bold text-amber-500 hover:bg-amber-600/30"
          >
            Voir tous les résultats
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="p-6 text-center text-sm text-muted-foreground">
          Aucun résultat
        </div>
      )}
    </div>
  )
}
