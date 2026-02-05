"use client"

import dynamic from "next/dynamic"

const Portfolio3D = dynamic(() => import("@/components/portfolio-3d"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-white/60 text-lg animate-pulse">Loading 3D Experience...</div>
    </div>
  ),
})

export default function Page() {
  return <Portfolio3D />
}
