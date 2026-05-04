"use client"

import { Play, ShieldAlert, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { PlayerModal } from "./player-modal"

interface AdPlayerModalProps {
  tmdbId: number
  mediaType: "movie" | "tv"
  season?: number
  episode?: number
  title: string
  overview?: string
  backdropPath?: string | null
  onClose: () => void
}

export function AdPlayerModal({ 
  tmdbId, 
  mediaType, 
  season, 
  episode, 
  title, 
  overview, 
  backdropPath, 
  onClose 
}: AdPlayerModalProps) {
  const [step, setStep] = useState(0)
  const totalSteps = 3

  const smartlinks = [
    "https://manhoodinvoluntaryplash.com/yu6cwbmz0e?key=78b13d520a3d0cf9d3729fe29fc1be41",
    "https://manhoodinvoluntaryplash.com/yu6cwbmz0e?key=78b13d520a3d0cf9d3729fe29fc1be41",
    "https://eminentpercentvandalism.com/nafvy9gp?key=f33fd406565102cbb24c7cb4641b49c6"
  ]

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const handleAdClick = () => {
    window.open(smartlinks[step], "_blank")
    setStep(step + 1)
  }

  if (step >= totalSteps) {
    return (
      <PlayerModal 
        tmdbId={tmdbId}
        mediaType={mediaType}
        season={season}
        episode={episode}
        title={title}
        overview={overview}
        backdropPath={backdropPath}
        onClose={onClose} 
      />
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-900/30 bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-amber-500/10 p-4">
            <ShieldAlert className="h-12 w-12 text-amber-500" />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-foreground">Vérification Requise</h2>
          <p className="mb-4 text-sm text-muted-foreground px-4">
            Cette courte vérification nous permet de maintenir le site gratuit et de soutenir nos serveurs.
          </p>
          <p className="mb-8 text-xs text-amber-500/80 italic">
            Une fois le lien ouvert, fermez l{"'"}onglet publicitaire et revenez ici pour l{"'"}étape suivante.
          </p>
          
          <p className="mb-4 text-sm font-medium text-foreground">
            Étape <span className="text-amber-500">{step + 1} sur {totalSteps}</span>
          </p>

          <div className="mb-8 w-full space-y-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-500"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleAdClick}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-4 text-lg font-bold text-foreground shadow-lg shadow-amber-900/20 transition-all hover:scale-[1.02] hover:from-amber-400 hover:to-orange-500 active:scale-[0.98]"
          >
            {step === totalSteps - 1 ? (
              <>
                <Play className="h-6 w-6 fill-current" />
                Démarrer la Lecture
              </>
            ) : (
              <>
                Accéder à l{"'"}étape suivante
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="mt-6 text-[10px] uppercase tracking-widest text-muted-foreground/50">
            Protégé par SpyderCast Secure
          </p>
        </div>
      </div>
    </div>
  )
}
