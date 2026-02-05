"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { IntroStation } from "./intro-station"
import { ParleyStation } from "./parley-station"
import { TanksIncStation } from "./tanks-inc-station"
import { DiniStation } from "./dini-station"
import { AboutStation } from "./about-station"

// Station positions along Z axis
const STATION_Z = {
  intro: 0,
  parley: -25,
  tanksInc: -50,
  dini: -75,
  about: -100,
}

interface SceneProps {
  scrollProgress: number
}

export function Scene({ scrollProgress }: SceneProps) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    
    // Move the scene group based on scroll
    // This effectively moves the camera through the stations
    const totalDistance = Math.abs(STATION_Z.about)
    const targetZ = scrollProgress * totalDistance
    
    // Smooth damping
    groupRef.current.position.z +=
      (targetZ - groupRef.current.position.z) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Intro Station */}
      <group position={[0, 0, STATION_Z.intro]}>
        <IntroStation />
      </group>

      {/* Parley Station */}
      <group position={[0, 0, STATION_Z.parley]}>
        <ParleyStation />
      </group>

      {/* TanksInc Station */}
      <group position={[0, 0, STATION_Z.tanksInc]}>
        <TanksIncStation scrollOffset={() => scrollProgress} />
      </group>

      {/* Dini Station */}
      <group position={[0, 0, STATION_Z.dini]}>
        <DiniStation />
      </group>

      {/* About Station */}
      <group position={[0, 0, STATION_Z.about]}>
        <AboutStation />
      </group>
    </group>
  )
}
