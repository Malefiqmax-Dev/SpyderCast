"use client"

import React, { useState } from "react"
import { X, Loader2, Palette, User, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface ProfileSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

const AVATARS = [
  "https://static.crunchyroll.com/assets/avatar/170x170/0011-puck.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0002-natsu.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0004-lucy.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0034-rimuru.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0035-milim.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0060-senku.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0024-boruto.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0025-sarada.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0048-legoshi.png",
  "https://static.crunchyroll.com/assets/avatar/170x170/0013-emilia.png",
]

const COLORS = [
  "#ffffff", "#fbbf24", "#f97316", "#ef4444", "#ec4899", "#a855f7", "#6366f1", "#3b82f6", "#0ea5e9", "#10b981", "#22c55e"
]

export function ProfileSettingsModal({ isOpen, onClose }: ProfileSettingsModalProps) {
  const { user, updateProfile } = useAuth()
  const [username, setUsername] = useState(user?.username || "")
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || AVATARS[0])
  const [selectedColor, setSelectedColor] = useState(user?.nameColor || "#ffffff")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  if (!isOpen || !user) return null

  async function handleSave() {
    setError("")
    if (!username.trim()) { setError("Le nom d'utilisateur est requis."); return }
    
    setLoading(true)
    const result = await updateProfile({
      username: username.trim(),
      avatar: selectedAvatar,
      nameColor: selectedColor
    })
    setLoading(false)

    if (result.success) {
      onClose()
    } else {
      setError(result.error || "Erreur lors de la sauvegarde.")
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="relative mx-4 w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c0c0e] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase italic text-white tracking-tight">
            Personnalisation <span className="text-amber-500">Profil</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Configurez votre identité visuelle sur SpyderCast.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <User className="h-3 w-3" /> Nom d{"'"}utilisateur
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground focus:border-amber-500/50 focus:outline-none backdrop-blur-sm"
              style={{ color: selectedColor }}
            />
          </div>

          {/* Avatar Selection */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Choisir une icône</label>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-5">
              {AVATARS.map((url) => (
                <button
                  key={url}
                  onClick={() => setSelectedAvatar(url)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedAvatar === url ? "border-amber-500 shadow-lg shadow-amber-500/20" : "border-white/10 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                >
                  <img src={url} alt="Avatar" className="h-full w-full object-cover" />
                  {selectedAvatar === url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-amber-500/20">
                      <div className="rounded-full bg-amber-500 p-0.5">
                        <Check className="h-3 w-3 text-black" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Name Color */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Palette className="h-3 w-3" /> Couleur du nom
            </label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
                    selectedColor === color ? "border-white shadow-lg" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-bold text-white transition-all hover:from-amber-400 hover:to-orange-500 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
