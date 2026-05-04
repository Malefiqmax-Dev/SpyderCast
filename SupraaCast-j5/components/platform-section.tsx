"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { STREAMING_PROVIDERS } from "@/lib/tmdb"
import { getPlatformLogo } from "@/components/platform-logos"
import { motion } from "framer-motion"

const PROVIDER_GRADIENTS: Record<string, string> = {
  netflix: "from-[#220909] via-[#1a0a0a] to-[#000000]",
  "disney-plus": "from-[#0a1a4a] via-[#051030] to-[#02081a]",
  max: "from-[#1a0a3a] via-[#100525] to-[#070210]",
  "prime-video": "from-[#002a3a] via-[#001c2a] to-[#000e16]",
  "apple-tv-plus": "from-[#1a1a1a] via-[#111111] to-[#000000]",
  "paramount-plus": "from-[#0a2a5a] via-[#051535] to-[#020a1a]",
  "canal-plus": "from-[#2a2a2a] via-[#1a1a1a] to-[#000000]",
  crunchyroll: "from-[#3a200a] via-[#251505] to-[#100a02]",
}

export function PlatformSection() {
  return (
    <section className="py-16 px-4 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Plateformes
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Explorez le catalogue de vos services preferes
          </p>
        </div>
        <Link
          href="/platforms"
          className="flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/20"
        >
          Voir tout
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {STREAMING_PROVIDERS.slice(0, 8).map((provider, index) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              href={`/platforms/${provider.slug}`}
              className="group relative flex aspect-[16/9] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
            >
              {/* Main Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${PROVIDER_GRADIENTS[provider.slug] || "from-zinc-900 to-black"} transition-transform duration-700 group-hover:scale-110`}
              />
              
              {/* Glossy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent mix-blend-overlay opacity-50" />
              
              {/* Platform Specific Glow on Hover */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  background: `radial-gradient(circle at center, ${provider.color}40, transparent 70%)`,
                }}
              />

              {/* Logo Container */}
              <div className="relative z-10 flex w-full flex-1 items-center justify-center">
                <div className="w-full max-w-[140px] transition-transform duration-500 group-hover:scale-110">
                  {getPlatformLogo(provider.slug, "w-full")}
                </div>
              </div>

              {/* Platform Name */}
              <div className="relative z-10 mt-4 text-center">
                <span className="text-sm font-semibold tracking-wide text-white/50 transition-colors duration-300 group-hover:text-white">
                  {provider.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
