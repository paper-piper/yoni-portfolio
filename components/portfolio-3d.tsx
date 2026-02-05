"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { Scene } from "./scene/scene"
import { HTMLOverlay } from "./scene/html-overlay"

function CanvasContent({ scrollProgress }: { scrollProgress: number }) {
  // Calculate background color based on scroll position
  // TanksInc section is roughly 0.4-0.6 of scroll
  const tanksSectionStart = 0.35
  const tanksSectionEnd = 0.65
  
  // Interpolate between colors
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  
  // Calculate transition factor for TanksInc (0 = not in tanks, 1 = fully in tanks)
  let tanksFactor = 0
  if (scrollProgress > tanksSectionStart && scrollProgress < tanksSectionEnd) {
    const midPoint = (tanksSectionStart + tanksSectionEnd) / 2
    if (scrollProgress < midPoint) {
      // Transitioning into TanksInc
      tanksFactor = (scrollProgress - tanksSectionStart) / (midPoint - tanksSectionStart)
    } else {
      // Transitioning out of TanksInc
      tanksFactor = 1 - (scrollProgress - midPoint) / (tanksSectionEnd - midPoint)
    }
  }
  
  // Smooth the transition
  tanksFactor = tanksFactor * tanksFactor * (3 - 2 * tanksFactor)
  
  // Base color: #0a0a0f (dark blue-ish)
  // Tanks color: #0d100d (darker, more neutral/green-ish)
  const bgR = lerp(0.039, 0.051, tanksFactor)
  const bgG = lerp(0.039, 0.063, tanksFactor)
  const bgB = lerp(0.059, 0.051, tanksFactor)
  
  // Fog becomes denser and closer for TanksInc
  const fogNear = lerp(20, 15, tanksFactor)
  const fogFar = lerp(100, 60, tanksFactor)
  
  return (
    <>
      <color attach="background" args={[bgR, bgG, bgB]} />
      <fog attach="fog" args={[`rgb(${Math.round(bgR * 255)}, ${Math.round(bgG * 255)}, ${Math.round(bgB * 255)})`, fogNear, fogFar]} />
      
      <Suspense fallback={null}>
        <Scene scrollProgress={scrollProgress} />
      </Suspense>
      
      <ambientLight intensity={lerp(0.3, 0.25, tanksFactor)} />
      <directionalLight position={[10, 10, 5]} intensity={lerp(0.5, 0.4, tanksFactor)} />
    </>
  )
}

export default function Portfolio3D() {
  const [isClient, setIsClient] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0
    setScrollProgress(Math.min(1, Math.max(0, progress)))
  }, [])

  useEffect(() => {
    setIsClient(true)
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  if (!isClient) {
    return (
      <div className="h-screen w-full bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/50 font-mono text-sm">Initializing...</div>
      </div>
    )
  }

  return (
    <div className="relative bg-[#0a0a0f]">
      {/* Fixed Canvas that responds to scroll */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <CanvasContent scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      {/* Scrollable HTML content */}
      <div className="relative z-10 pointer-events-none">
        <HTMLOverlay />
      </div>
    </div>
  )
}
