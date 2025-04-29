"use client"

import dynamic from "next/dynamic"

// Dynamically import the FAB component with no SSR
// This prevents hydration errors since it uses browser APIs
const TemikaFAB = dynamic(() => import("@/components/temika-fab-responsive").then((mod) => mod.TemikaFAB), {
  ssr: false,
})

export function TemikaFABWrapper() {
  return <TemikaFAB />
}
