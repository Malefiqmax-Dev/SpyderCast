"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Menu, X, User, LogOut, Shield, TvIcon, Home, Film, Settings } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { ProfileSettingsModal } from "@/components/profile-settings-modal"
import { SearchResultsDropdown } from "@/components/search-results-dropdown"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [authOpen, setAuthOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, signOut, isAdmin } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/movies", label: "Films" },
    { href: "/tv", label: "Series" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-amber-900/30"
            : "bg-gradient-to-b from-background/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
                Spyder<span className="text-amber-500">Cast</span>
              </span>
            </Link>
            <div className="hidden items-center gap-5 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.icon && <link.icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="relative">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    autoFocus
                    className="w-40 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground backdrop-blur-md focus:border-amber-500/50 focus:outline-none sm:w-64"
                  />
                  <button type="button" onClick={() => { setSearchOpen(false); setSearchQuery("") }} className="text-muted-foreground hover:text-foreground" aria-label="Fermer la recherche">
                    <X className="h-5 w-5" />
                  </button>
                </form>
                <SearchResultsDropdown query={searchQuery} onClose={() => { setSearchOpen(false); setSearchQuery("") }} />
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Ouvrir la recherche">
                <Search className="h-5 w-5" />
              </button>
            )}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-amber-500/50"
                  aria-label="Menu utilisateur"
                >
                  <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e]/95 backdrop-blur-xl shadow-2xl shadow-black/50">
                    <div className="border-b border-white/5 p-4">
                      <p className="text-sm font-black uppercase italic tracking-tight" style={{ color: user.nameColor }}>{user.username}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      {isAdmin && <span className="mt-1 inline-block rounded bg-amber-600/30 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300">Admin</span>}
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => { setSettingsOpen(true); setDropdownOpen(false) }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 transition-all hover:bg-white/5 backdrop-blur-sm"
                      >
                        <Settings className="h-4 w-4" />
                        Paramètres
                      </button>
                      {isAdmin && (
                        <Link href="/admin" onClick={() => setDropdownOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-400 transition-all hover:bg-white/5 backdrop-blur-sm">
                          <Shield className="h-4 w-4" />
                          Administration
                        </Link>
                      )}
                      <button
                        onClick={async () => { await signOut(); setDropdownOpen(false) }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-all hover:bg-white/5 backdrop-blur-sm"
                      >
                        <LogOut className="h-4 w-4" />
                        Se deconnecter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:from-amber-400 hover:to-orange-500 sm:text-sm"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Connexion</span>
              </button>
            )}

            <button className="text-muted-foreground transition-colors hover:text-foreground lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-amber-900/30 bg-background/95 backdrop-blur-md lg:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {user && (
                <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-4">
                  <img src={user.avatar} alt={user.username} className="h-10 w-10 rounded-full ring-2 ring-amber-500/30" />
                  <div>
                    <p className="text-sm font-black uppercase italic" style={{ color: user.nameColor }}>{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-all hover:bg-white/5 hover:text-foreground backdrop-blur-sm">
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={() => { setSettingsOpen(true); setMenuOpen(false) }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-all hover:bg-white/5 hover:text-foreground backdrop-blur-sm"
                >
                  <Settings className="h-4 w-4" />
                  Paramètres
                </button>
              )}
              {isAdmin && (
                <Link 
                  href="/admin" 
                  onClick={() => setMenuOpen(false)} 
                  className="mt-2 flex items-center gap-2 rounded-xl bg-amber-600/10 px-4 py-3 text-sm font-bold text-amber-400 border border-amber-500/20 transition-all hover:bg-amber-600/20"
                >
                  <Shield className="h-4 w-4" />
                  Administration
                </Link>
              )}
              {!user && (
                <button onClick={() => { setMenuOpen(false); setAuthOpen(true) }} className="mt-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2 text-sm font-semibold text-white">
                  Connexion / Inscription
                </button>
              )}
              {user && (
                <button onClick={async () => { await signOut(); setMenuOpen(false) }} className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition-all hover:bg-white/5 backdrop-blur-sm">
                  <LogOut className="h-4 w-4" />
                  Se deconnecter
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <ProfileSettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}
