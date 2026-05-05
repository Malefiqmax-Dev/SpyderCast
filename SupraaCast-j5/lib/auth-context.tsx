"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export interface AppUser {
  id: string
  username: string
  email: string
  role: string
  avatar: string
  nameColor: string
  createdAt: string
}

export interface MediaItem {
  id: number
  type: "movie" | "tv"
  title: string
  poster_path: string | null
  vote_average: number
}

interface AuthContextType {
  user: AppUser | null
  isLoading: boolean
  isAdmin: boolean
  
  signUp: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  updateProfile: (updates: { username?: string; avatar?: string; nameColor?: string }) => Promise<{ success: boolean; error?: string }>
  isLiked: (id: number, type: "movie" | "tv") => boolean
  isWatched: (id: number, type: "movie" | "tv") => boolean
  isWatchLater: (id: number, type: "movie" | "tv") => boolean
  toggleLike: (item: MediaItem) => void
  toggleWatched: (item: MediaItem) => void
  toggleWatchLater: (item: MediaItem) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

function mapUser(supabaseUser: SupabaseUser, profile?: { username?: string; role?: string; avatar?: string; name_color?: string }): AppUser {
  const isMalefiq = supabaseUser.email === "malefiqmax@gmail.com"
  return {
    id: supabaseUser.id,
    username: profile?.username || supabaseUser.user_metadata?.username || (isMalefiq ? "MalefiqMax" : "Utilisateur"),
    email: supabaseUser.email || "",
    role: isMalefiq ? "admin" : (profile?.role || "member"),
    avatar: profile?.avatar || "https://static.crunchyroll.com/assets/avatar/170x170/0011-puck.png",
    nameColor: profile?.name_color || "#ffffff",
    createdAt: supabaseUser.created_at,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [likedItems, setLikedItems] = useState<MediaItem[]>([])
  const [watchedItems, setWatchedItems] = useState<MediaItem[]>([])
  const [watchLaterItems, setWatchLaterItems] = useState<MediaItem[]>([])
  
  useEffect(() => {
    let supabaseClient: ReturnType<typeof createClient> | null = null
    try {
      supabaseClient = createClient()
    } catch (e) {}

    async function init() {
      try {
        if (!supabaseClient) throw new Error("No client")
        const { data: { user: currentUser }, error } = await supabaseClient.auth.getUser()
        if (error) throw error
        if (currentUser) {
          const { data: profile } = await supabaseClient
            .from("profiles")
            .select("username, role, avatar, name_color")
            .eq("id", currentUser.id)
            .single()
            .catch(() => ({ data: null }))
          setUser(mapUser(currentUser, profile || undefined))
        }
      } catch (e) {}
      setIsLoading(false)
    }
    init()

    let subscription: { unsubscribe: () => void } | null = null
    try {
      if (supabaseClient) {
        const { data } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
          if (session?.user) {
            const { data: profile } = await supabaseClient!
              .from("profiles")
              .select("username, role, avatar, name_color")
              .eq("id", session.user.id)
              .single()
              .catch(() => ({ data: null }))
            setUser(mapUser(session.user, profile || undefined))
          } else {
            setUser(null)
          }
        })
        subscription = data?.subscription
      }
    } catch (e) {}

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        try { subscription.unsubscribe() } catch(e) {}
      }
    }
  }, [])

  const signUp = useCallback(async (username: string, email: string, password: string) => {
    try {
      const supabaseClient = createClient()
      const { error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/`,
        },
      })
      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Echec de l'inscription." }
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const supabaseClient = createClient()
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || "Email ou mot de passe incorrect." }
    }
  }, [])

  const signOut = useCallback(async () => {
    try {
      const supabaseClient = createClient()
      await supabaseClient.auth.signOut()
    } catch (e) {}
    setUser(null)
  }, [])

  const updateProfile = useCallback(async (updates: { username?: string; avatar?: string; nameColor?: string }) => {
    if (!user) return { success: false, error: "Non connecte" }
    try {
      const supabase = createClient()
      const dbUpdates: any = {}
      if (updates.username) dbUpdates.username = updates.username
      if (updates.avatar) dbUpdates.avatar = updates.avatar
      if (updates.nameColor) dbUpdates.name_color = updates.nameColor

      const { error } = await supabase
        .from("profiles")
        .update(dbUpdates)
        .eq("id", user.id)

      if (error) throw error

      setUser((prev: AppUser | null) => {
        if (!prev) return null
        return {
          ...prev,
          username: updates.username || prev.username,
          avatar: updates.avatar || prev.avatar,
          nameColor: updates.nameColor || prev.nameColor,
        }
      })
      return { success: true }
    } catch (error) {
      return { success: false, error: "Erreur lors de la mise a jour du profil." }
    }
  }, [user])

  const toggleLike = useCallback((item: MediaItem) => {
    setLikedItems((prev: MediaItem[]) => {
      const isAlready = prev.some((i: MediaItem) => i.id === item.id && i.type === item.type)
      return isAlready 
        ? prev.filter((i: MediaItem) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    })
  }, [])

  const toggleWatched = useCallback((item: MediaItem) => {
    setWatchedItems((prev: MediaItem[]) => {
      const isAlready = prev.some((i: MediaItem) => i.id === item.id && i.type === item.type)
      return isAlready 
        ? prev.filter((i: MediaItem) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    })
  }, [])

  const toggleWatchLater = useCallback((item: MediaItem) => {
    setWatchLaterItems((prev: MediaItem[]) => {
      const isAlready = prev.some((i: MediaItem) => i.id === item.id && i.type === item.type)
      return isAlready 
        ? prev.filter((i: MediaItem) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    })
  }, [])

  const isLiked = useCallback((id: number, type: "movie" | "tv") => likedItems.some((i: MediaItem) => i.id === id && i.type === type), [likedItems])
  const isWatched = useCallback((id: number, type: "movie" | "tv") => watchedItems.some((i: MediaItem) => i.id === id && i.type === type), [watchedItems])
  const isWatchLater = useCallback((id: number, type: "movie" | "tv") => watchLaterItems.some((i: MediaItem) => i.id === id && i.type === type), [watchLaterItems])

  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, signUp, signIn, signOut, updateProfile, isLiked, isWatched, isWatchLater, toggleLike, toggleWatched, toggleWatchLater }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
