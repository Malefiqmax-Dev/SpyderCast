"use client"

import { Play, ShieldAlert, ArrowRight, X } from "lucide-react"
import { useState, useEffect } from "react"

interface SportPlayerModalProps {
  name: string
  source: string
  type: 'embed' | 'hls'
  onClose: () => void
}

export function SportPlayerModal({ 
  name, 
  source, 
  type,
  onClose 
}: SportPlayerModalProps) {
  const [step, setStep] = useState(0)
  const totalSteps = 2 // Updated to 2 ads as requested

  const smartlinks = [
    "https://manhoodinvoluntaryplash.com/yu6cwbmz0e?key=78b13d520a3d0cf9d3729fe29fc1be41", // First smartlink
    "https://manhoodinvoluntaryplash.com/yu6cwbmz0e?key=78b13d520a3d0cf9d3729fe29fc1be41"  // Second smartlink
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

  // Conditional rendering for ad modal or player modal
  if (step < totalSteps) { // Show ad modal if steps are remaining
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-amber-900/30 bg-card p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

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
                  Regarder {name}
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

  // If all ad steps are completed, show the player modal
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md">
      <div className="relative h-full w-full max-h-[95vh] max-w-[95vw] lg:max-h-[90vh] lg:max-w-[90vw] overflow-hidden rounded-xl border border-amber-900/30 bg-card shadow-2xl">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4">
          <span className="truncate text-sm font-bold text-white drop-shadow-md">{name}</span>
          <button
            onClick={onClose}
            className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-amber-600 backdrop-blur-sm"
            aria-label="Fermer le lecteur"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-full w-full flex items-center justify-center bg-black">
          {type === 'embed' ? (
            <iframe
              src={source}
              title={name}
              className="h-full w-full border-none"
              allowFullScreen
              allow="autoplay; fullscreen"
            />
          ) : (
            <video
              src={source}
              controls
              autoPlay
              className="h-full w-full"
            />
          )}
        </div>
      </div>
    </div>
  )
}
