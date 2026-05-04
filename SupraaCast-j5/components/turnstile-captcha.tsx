"use client"

import { useEffect, useRef } from "react"

interface TurnstileProps {
  onVerify: (token: string) => void
  siteKey?: string
}

export function Turnstile({ onVerify, siteKey }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  const finalSiteKey = siteKey || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAADJDC_EPmDS_64My"

  useEffect(() => {
    // Load script
    if (!document.getElementById("turnstile-script")) {
      const script = document.createElement("script")
      script.id = "turnstile-script"
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    const checkTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetId.current) {
        widgetId.current = window.turnstile.render(containerRef.current, {
          sitekey: finalSiteKey,
          callback: (token: string) => {
            onVerify(token)
          },
          theme: "dark",
        })
      }
    }

    const interval = setInterval(() => {
      if (window.turnstile) {
        checkTurnstile()
        clearInterval(interval)
      }
    }, 100)

    return () => {
      clearInterval(interval)
      if (widgetId.current && window.turnstile) {
        // window.turnstile.remove(widgetId.current);
      }
    }
  }, [onVerify, finalSiteKey])

  return <div ref={containerRef} className="flex justify-center my-4" />
}

declare global {
  interface Window {
    turnstile: any
  }
}
