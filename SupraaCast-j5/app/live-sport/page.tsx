"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SPORT_CHANNELS, SportChannel } from "@/lib/constants/sport-channels"
import { SportPlayerModal } from "@/components/sport-player-modal"
import Image from "next/image"
import { Trophy, Play } from "lucide-react"

export default function LiveSportPage() {
  const [selectedChannel, setSelectedChannel] = useState<SportChannel | null>(null)

  // Group channels by category
  const categories = Array.from(new Set(SPORT_CHANNELS.map(c => c.category)))

  return (
    <main className="min-h-screen bg-[#0c0c0e]">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <div className="rounded-2xl bg-amber-500/10 p-3 ring-1 ring-amber-500/20">
            <Trophy className="h-8 w-8 text-amber-500" />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
              Live <span className="text-amber-500">Sport</span>
            </h1>
            <p className="text-muted-foreground">Regardez vos compétitions préférées en direct et en HD</p>
          </div>
        </div>

        {categories.map(category => (
          <section key={category} className="mb-12">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white/90">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              {category}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {SPORT_CHANNELS.filter(c => c.category === category).map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-white/5 bg-white/5 transition-all hover:border-amber-500/50 hover:bg-white/10"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{channel.name}</span>
                      <Play className="h-3 w-3 text-amber-500 fill-amber-500" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />

      {selectedChannel && (
        <SportPlayerModal
          name={selectedChannel.name}
          source={selectedChannel.source}
          type={selectedChannel.type}
          onClose={() => setSelectedChannel(null)}
        />
      )}
    </main>
  )
}
