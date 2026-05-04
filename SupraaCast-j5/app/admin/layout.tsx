import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SpyderCast - Administration",
  description: "Panneau d'administration SpyderCast",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
