"use client"

import Image from "next/image"

interface LogoProps {
  className?: string
}

export function NetflixLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix"
        className="h-full w-full object-contain"
      />
    </div>
  )
}

export function DisneyPlusLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney_Plus_logo.svg"
        alt="Disney+"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function MaxLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg"
        alt="Max"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function PrimeVideoLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg"
        alt="Prime Video"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function AppleTVPlusLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_logo.svg"
        alt="Apple TV+"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function ParamountPlusLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus_logo.svg"
        alt="Paramount+"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function CanalPlusLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Logo_Canal%2B_2009.svg"
        alt="Canal+"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function CrunchyrollLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_logo.svg"
        alt="Crunchyroll"
        className="h-full w-full object-contain brightness-0 invert"
      />
    </div>
  )
}

export function getPlatformLogo(slug: string, className?: string) {
  const logoClass = className || "h-10 w-auto"

  switch (slug) {
    case "netflix":
      return <NetflixLogo className={logoClass} />
    case "disney-plus":
      return <DisneyPlusLogo className={logoClass} />
    case "max":
      return <MaxLogo className={logoClass} />
    case "prime-video":
      return <PrimeVideoLogo className={logoClass} />
    case "apple-tv-plus":
      return <AppleTVPlusLogo className={logoClass} />
    case "paramount-plus":
      return <ParamountPlusLogo className={logoClass} />
    case "canal-plus":
      return <CanalPlusLogo className={logoClass} />
    case "crunchyroll":
      return <CrunchyrollLogo className={logoClass} />
    default:
      return null
  }
}
