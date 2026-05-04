"use client"

import { X, Loader2, ShieldCheck, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Turnstile } from "./turnstile-captcha"
import Image from "next/image"

interface PlayerModalProps {
  url?: string // If provided, use iframe (for trailers)
  tmdbId?: number
  mediaType?: "movie" | "tv"
  season?: number
  episode?: number
  title: string
  overview?: string
  backdropPath?: string | null
  onClose: () => void
}

export function PlayerModal({ 
  url,
  tmdbId, 
  mediaType, 
  season, 
  episode, 
  title, 
  overview, 
  backdropPath, 
  onClose 
}: PlayerModalProps) {
  const [sourceUrl, setSourceUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  const handleVerify = async (token: string) => {
    if (!tmdbId || !mediaType) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/player/source", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId,
          mediaType,
          season,
          episode,
          turnstileToken: token,
        }),
      })

      const data = await res.json()
      if (data.url) {
        setSourceUrl(data.url)
      } else {
        setError(data.error || "Impossible de récupérer la source")
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="relative h-full w-full max-h-[95vh] max-w-[95vw] lg:max-h-[90vh] lg:max-w-[90vw] overflow-hidden rounded-xl border border-amber-900/30 bg-card shadow-2xl">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
          <span className="truncate text-sm font-bold text-white drop-shadow-md">{title}</span>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-amber-600 backdrop-blur-sm"
            aria-label="Fermer le lecteur"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-full w-full flex flex-col md:flex-row">
          {url ? (
            <iframe
              src={url}
              title={title}
              className="h-full w-full border-none"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          ) : !sourceUrl ? (
            <div className="relative flex-1 flex flex-col items-center justify-center p-8">
              {backdropPath && (
                <Image
                  src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                  alt={title}
                  fill
                  className="object-cover opacity-20"
                />
              )}
              
              <div className="relative z-10 max-w-lg text-center">
                <ShieldCheck className="mx-auto h-16 w-16 text-amber-500 mb-6" />
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-4">
                  Vérification SpyderCast
                </h2>
                <p className="text-sm text-foreground/70 mb-8 px-4">
                  Veuillez valider le captcha pour débloquer le flux vidéo HD.
                </p>

                {error && (
                  <div className="mx-auto mb-6 flex max-w-sm items-center gap-2 rounded-lg bg-red-500/10 p-4 text-xs text-red-500 border border-red-500/20">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {!loading ? (
                  <Turnstile onVerify={handleVerify} />
                ) : (
                  <div className="flex flex-col items-center gap-3 py-6">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
                    <p className="text-xs font-medium text-amber-500 uppercase tracking-widest">Récupération du flux...</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <video
              src={sourceUrl}
              controls
              autoPlay
              className="h-full w-full bg-black"
              poster={backdropPath ? `https://image.tmdb.org/t/p/original${backdropPath}` : undefined}
            />
          )}
        </div>
      </div>
    </div>
  )
}
