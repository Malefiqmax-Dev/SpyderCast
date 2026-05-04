"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  Users, 
  Shield, 
  Activity, 
  LayoutDashboard, 
  MessageSquare, 
  Tv, 
  Radio, 
  Music, 
  Cpu, 
  Gamepad2, 
  Book, 
  History, 
  HelpCircle,
  Clock,
  Calendar,
  Database,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Smartphone
} from "lucide-react"
import Link from "next/link"

interface Stats {
  totalUsers: number
  onlineNow: number
  lastHour: number
  last24h: number
  totalContent: number
  tmdb: { ok: boolean; ms: number }
  database: { ok: boolean; ms: number }
}

interface ProfileUser {
  id: string
  username: string
  email: string
  role: string
  created_at: string
}

interface UsersResponse {
  users: ProfileUser[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

type TabType = "dashboard" | "messages" | "radio" | "music" | "software" | "games" | "ebooks" | "retro" | "demandes" | "users"

export default function AdminPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [stats, setStats] = useState<Stats | null>(null)
  const [usersData, setUsersData] = useState<UsersResponse | null>(null)
  const [usersSearch, setUsersSearch] = useState("")
  const [usersPage, setUsersPage] = useState(1)
  const [loadingStats, setLoadingStats] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchStats = useCallback(async () => {
    setLoadingStats(true)
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) setStats(await res.json())
    } catch {
      // ignore
    }
    setLoadingStats(true)
  }, [])

  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true)
    try {
      const params = new URLSearchParams({ page: String(usersPage), search: usersSearch })
      const res = await fetch(`/api/admin/users?${params}`)
      if (res.ok) setUsersData(await res.json())
    } catch {
      // ignore
    }
    setLoadingUsers(false)
  }, [usersPage, usersSearch])

  useEffect(() => { fetchStats() }, [fetchStats])
  useEffect(() => { fetchUsers() }, [fetchUsers])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center px-4 pt-16">
          <div className="max-w-md text-center">
            <Shield className="mx-auto mb-4 h-16 w-16 text-amber-500/40" />
            <h1 className="font-display text-2xl font-bold text-foreground">
              Acces refuse
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Cette page est reservee aux administrateurs.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500"
            >
              Retour a l{"'"}accueil
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", count: null, icon: LayoutDashboard },
    { id: "messages" as const, label: "Message", count: null, icon: MessageSquare },
    { id: "radio" as const, label: "Radio", count: 15, icon: Radio },
    { id: "music" as const, label: "Musique", count: 0, icon: Music },
    { id: "software" as const, label: "Logiciels", count: 8, icon: Cpu },
    { id: "games" as const, label: "Jeux", count: 0, icon: Gamepad2 },
    { id: "ebooks" as const, label: "Ebooks", count: 48, icon: Book },
    { id: "retro" as const, label: "Rétro", count: 8, icon: History },
    { id: "demandes" as const, label: "Demandes", count: 87, icon: HelpCircle },
    { id: "users" as const, label: "Users", count: stats?.totalUsers || 0, icon: Users },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0c] pt-20 pb-12">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          
          {/* Header Tab System (Image 2 style) */}
          <div className="mb-8 flex items-center gap-1 overflow-x-auto custom-scrollbar rounded-xl border border-amber-800/20 bg-card/60 p-1 backdrop-blur-sm shadow-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-600/90 text-white shadow-lg shadow-amber-600/20 translate-y-[-1px]"
                    : "text-muted-foreground/80 hover:bg-amber-500/10 hover:text-foreground"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                    activeTab === tab.id ? "bg-white/20 text-white" : "bg-amber-900/30 text-amber-400"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              
              {/* Main Dashboard Content (Left/Center) */}
              <div className="flex flex-col gap-6 xl:col-span-8">
                
                {/* Stats Row (Image 2 top row) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="relative overflow-hidden rounded-xl border border-amber-800/20 bg-card p-5 shadow-xl transition-all hover:border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">En Ligne Maintenant</span>
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                    <p className="mt-3 text-4xl font-bold bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">
                      {loadingStats ? "-" : stats?.onlineNow ?? 1}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      Actifs (5 dernieres minutes)
                    </p>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-xl border border-amber-800/20 bg-card p-5 shadow-xl transition-all hover:border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Derniere Heure</span>
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <p className="mt-3 text-4xl font-bold text-blue-400">
                      {loadingStats ? "-" : stats?.lastHour ?? 1}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Utilisateurs actifs</p>
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Clock className="h-16 w-16" />
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-amber-800/20 bg-card p-5 shadow-xl transition-all hover:border-amber-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Dernieres 24h</span>
                      <Calendar className="h-5 w-5 text-amber-400" />
                    </div>
                    <p className="mt-3 text-4xl font-bold text-amber-400">
                      {loadingStats ? "-" : stats?.last24h ?? 1}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Utilisateurs actifs</p>
                  </div>
                </div>

                {/* Total Stats Row (Image 2 middle row) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="group rounded-xl border border-amber-800/20 bg-card p-6 shadow-xl transition-all hover:border-amber-500/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Contenu Total</p>
                        <p className="mt-2 text-3xl font-extrabold text-foreground">{loadingStats ? "-" : stats?.totalContent.toLocaleString('fr-FR') ?? "1 332 918"}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Films, séries, chaînes TV, radios...</p>
                      </div>
                      <div className="rounded-lg bg-amber-600/10 p-3 text-amber-500 transition-colors group-hover:bg-amber-600/20">
                        <Database className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="group rounded-xl border border-amber-800/20 bg-card p-6 shadow-xl transition-all hover:border-amber-500/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Utilisateurs Total</p>
                        <p className="mt-2 text-3xl font-extrabold text-white">{loadingStats ? "-" : stats?.totalUsers ?? 0}</p>
                        <p className="mt-1 text-xs text-green-400">+0 VIP</p>
                      </div>
                      <div className="rounded-lg bg-amber-600/10 p-3 text-amber-500 transition-colors group-hover:bg-amber-600/20">
                        <Users className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* TMDB Update Section (Image 2 bottom left) */}
                <div className="rounded-xl border border-amber-800/20 bg-card shadow-2xl">
                  <div className="border-b border-amber-800/20 p-5">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-amber-400" />
                      <h3 className="text-lg font-bold text-foreground">Mise à jour TMDB</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Forcer la mise à jour du contenu depuis l{"'"}API TMDB</p>
                  </div>
                  <div className="p-6 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:border-amber-500/50">
                        <Tv className="h-4 w-4 text-amber-400" />
                        Films
                      </button>
                      <button className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:border-amber-500/50">
                        <Smartphone className="h-4 w-4 text-amber-400" />
                        Séries
                      </button>
                      <button className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:border-amber-500/50">
                        <Activity className="h-4 w-4 text-amber-400" />
                        Animés
                      </button>
                      <button className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-3 text-sm font-medium backdrop-blur-md transition-all hover:bg-white/10 hover:border-amber-500/50">
                        <Calendar className="h-4 w-4 text-amber-400" />
                        Calendrier
                      </button>
                    </div>
                    <button className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-white/95 px-6 py-3 font-bold text-black transition-all hover:bg-white hover:scale-[1.01] active:scale-[0.99]">
                      <RefreshCw className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" />
                      Tout mettre à jour
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/10 to-amber-600/0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar Content (Right) (Image 2 status section) */}
              <div className="xl:col-span-4 flex flex-col gap-6">
                <div className="rounded-xl border border-amber-800/20 bg-card shadow-2xl">
                  <div className="border-b border-amber-800/20 p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="h-5 w-5 text-amber-400" />
                      <h3 className="text-lg font-bold text-foreground">États du système</h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between rounded-xl border border-amber-800/10 bg-secondary/30 p-4 transition-all hover:bg-secondary/40">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${stats?.tmdb.ok ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500"}`} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">API TMDB</p>
                          <p className="text-xs text-muted-foreground">{stats?.tmdb.ok ? "Opérationnel" : "Indisponible"}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{stats?.tmdb.ms ?? 0}ms</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-amber-800/10 bg-secondary/30 p-4 transition-all hover:bg-secondary/40">
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${stats?.database.ok ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-red-500"}`} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">Base de données</p>
                          <p className="text-xs text-muted-foreground">{stats?.database.ok ? "Connectée" : "Déconnectée"}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{stats?.database.ms ?? 0}ms</span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-amber-800/10 bg-secondary/30 p-4 transition-all hover:bg-secondary/40">
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Serveurs</p>
                          <p className="text-xs text-muted-foreground">En ligne</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">89ms</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info (Extra) */}
                <div className="rounded-xl border border-amber-800/20 bg-gradient-to-br from-amber-900/20 to-orange-900/5 p-6 border-dashed">
                  <h4 className="text-sm font-semibold text-amber-400 uppercase mb-4 tracking-widest text-center">Notification Staff</h4>
                  <div className="rounded-xl bg-amber-600 px-4 py-3 text-center text-sm font-bold text-white shadow-xl shadow-amber-600/30 cursor-pointer hover:bg-amber-500 transition-all active:scale-95">
                    Message au Staff
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="rounded-xl border border-amber-800/20 bg-card overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-amber-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Gestion des Utilisateurs</h3>
                  <p className="text-xs text-muted-foreground">
                    {usersData ? `${usersData.total} utilisateurs inscrits - ${usersData.total} affichés` : "Chargement..."}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={usersSearch}
                      onChange={(e) => { setUsersSearch(e.target.value); setUsersPage(1) }}
                      placeholder="Rechercher..."
                      className="w-full sm:w-64 rounded-lg border border-amber-800/30 bg-secondary/50 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <select className="rounded-lg border border-amber-800/30 bg-secondary/50 px-3 py-2 text-xs text-foreground focus:outline-none">
                    <option>Tous les grades</option>
                    <option>Admin</option>
                    <option>Membre</option>
                  </select>
                </div>
              </div>

              {loadingUsers ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
                  <p className="text-sm text-muted-foreground">Synchronisation de la base de données...</p>
                </div>
              ) : (
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-secondary/20">
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Utilisateur</th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Statut</th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Privilèges</th>
                          <th className="px-6 py-4 text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Inscription</th>
                          <th className="px-6 py-4 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-amber-800/10">
                        {usersData?.users.map((u) => (
                          <tr key={u.id} className="transition-colors hover:bg-amber-600/5 group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-[10px] font-black text-white shadow-lg">
                                  {u.username?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <span className="text-sm font-bold text-foreground group-hover:text-amber-400 transition-colors uppercase">{u.username || "Exemple"}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground/80">{u.email}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-white/10 text-white shadow-sm ring-1 ring-white/20">
                                active
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black tracking-widest ${
                                u.role === "admin" ? "bg-amber-600/20 text-amber-300 ring-1 ring-amber-500/30" : "bg-white/5 text-muted-foreground ring-1 ring-white/10"
                              }`}>
                                {u.role === "admin" ? "Admin" : "Membre"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground/80 font-mono">
                              {u.created_at ? new Date(u.created_at).toLocaleDateString("fr-FR") : "-"}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="rounded-lg bg-white/5 p-2 text-muted-foreground transition-all hover:bg-amber-600 hover:text-white shadow-sm ring-1 ring-white/10">
                                <Edit className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {usersData && usersData.totalPages > 1 && (
                    <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Page {usersData.page} / {usersData.totalPages}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setUsersPage(Math.max(1, usersPage - 1))}
                          disabled={usersPage <= 1}
                          className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground backdrop-blur-md transition-all hover:bg-white/10 disabled:opacity-30"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setUsersPage(Math.min(usersData.totalPages, usersPage + 1))}
                          disabled={usersPage >= usersData.totalPages}
                          className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground backdrop-blur-md transition-all hover:bg-white/10 disabled:opacity-30"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Placeholder for other tabs */}
          {!["dashboard", "users"].includes(activeTab) && (
            <div className="rounded-xl border border-amber-800/20 bg-card p-20 text-center shadow-2xl">
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-600/10 flex items-center center mb-4 justify-center">
                <Cpu className="h-8 w-8 text-amber-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Module en cours de développement</h3>
              <p className="mt-2 text-muted-foreground">Cette section sera bientôt disponible avec les fonctionnalités de gestion de contenu.</p>
              <button onClick={() => setActiveTab("dashboard")} className="mt-6 rounded-lg bg-amber-600 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-amber-500 shadow-lg shadow-amber-600/20">
                Retour au Dashboard
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(245, 158, 11, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.4);
        }
      `}</style>
    </>
  )
}
