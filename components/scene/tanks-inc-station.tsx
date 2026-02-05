"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { TextureLoader, DoubleSide } from "three"
import type { Mesh, Group, Texture } from "three"

interface TanksIncStationProps {
  scrollOffset: () => number
}

// 2D sprite cutout with thickness for the tank
function TankSprite() {
  const tankRef = useRef<Group>(null)
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(
      "/textures/tanksinc-tank.png",
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      () => {
        // Fallback handled in render
      }
    )
  }, [])

  useFrame((state) => {
    if (tankRef.current) {
      tankRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })

  const thickness = 0.15

  return (
    <group ref={tankRef} position={[-3, -0.5, 0]} rotation={[0, 0.2, 0]}>
      {/* Front face with texture */}
      <mesh position={[0, 0, thickness / 2]}>
        <planeGeometry args={[4, 2.5]} />
        {texture ? (
          <meshBasicMaterial map={texture} transparent side={DoubleSide} />
        ) : (
          <meshBasicMaterial color="#4ade80" transparent opacity={0.8} />
        )}
      </mesh>
      
      {/* Back face */}
      <mesh position={[0, 0, -thickness / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[4, 2.5]} />
        <meshBasicMaterial color="#2a3a2a" />
      </mesh>
      
      {/* Side edges - subtle */}
      <mesh position={[2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[thickness, 2.5]} />
        <meshBasicMaterial color="#1a2a1a" />
      </mesh>
      <mesh position={[-2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[thickness, 2.5]} />
        <meshBasicMaterial color="#1a2a1a" />
      </mesh>
    </group>
  )
}

// Cannonball sprite cutout with thickness
function AnimatedCannonball({ scrollOffset }: { scrollOffset: () => number }) {
  const ballRef = useRef<Group>(null)
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(
      "/textures/tanksinc-cannonball.png",
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      () => {
        // Fallback handled in render
      }
    )
  }, [])

  useFrame(() => {
    const offset = scrollOffset()
    // Extended scroll range for longer visibility
    const tankSectionStart = 0.35
    const tankSectionEnd = 0.65
    
    const normalizedProgress = Math.max(0, Math.min(1, 
      (offset - tankSectionStart) / (tankSectionEnd - tankSectionStart)
    ))

    if (ballRef.current) {
      const startX = 0
      const endX = 12
      const startY = 0.5
      const maxHeight = 2.5
      
      const x = startX + normalizedProgress * (endX - startX)
      const y = startY + Math.sin(normalizedProgress * Math.PI) * maxHeight
      
      ballRef.current.position.x = x
      ballRef.current.position.y = y
      
      // Rotate the sprite cutout
      ballRef.current.rotation.z = normalizedProgress * Math.PI * 3
      
      // Scale based on arc
      const scale = 0.8 + Math.sin(normalizedProgress * Math.PI) * 0.2
      ballRef.current.scale.setScalar(scale)
      
      // Visibility - stays visible longer
      ballRef.current.visible = normalizedProgress > 0.02 && normalizedProgress < 0.98
    }
  })

  const thickness = 0.1

  return (
    <group ref={ballRef} position={[0, 0.5, 0]}>
      {/* Front face with texture */}
      <mesh position={[0, 0, thickness / 2]}>
        <planeGeometry args={[0.8, 0.8]} />
        {texture ? (
          <meshBasicMaterial map={texture} transparent side={DoubleSide} />
        ) : (
          <meshBasicMaterial color="#1a1a1a" />
        )}
      </mesh>
      
      {/* Back face */}
      <mesh position={[0, 0, -thickness / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
    </group>
  )
}

// Floor with texture
function FloorPlane() {
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(
      "/textures/tanksinc-floor.png",
      (loadedTexture) => {
        loadedTexture.wrapS = loadedTexture.wrapT = 1000 // RepeatWrapping
        loadedTexture.repeat.set(4, 4)
        setTexture(loadedTexture)
      },
      undefined,
      () => {
        // Fallback handled in render
      }
    )
  }, [])

  return (
    <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[25, 25]} />
      {texture ? (
        <meshBasicMaterial map={texture} />
      ) : (
        <meshBasicMaterial color="#1a1f1a" />
      )}
    </mesh>
  )
}

// Title bar geometry
function TitleBar() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 4, 0]}>
      {/* Abstract title bars for TANKS INC */}
      {[-3, -2, -1, 0, 1, 2, 3].map((x, i) => (
        <mesh key={i} position={[x * 0.4, 0, 0]}>
          <boxGeometry args={[0.25, 0.5 + Math.abs(Math.sin(i * 0.8)) * 0.3, 0.1]} />
          <meshStandardMaterial
            color="#4ade80"
            emissive="#4ade80"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Subtitle indicator */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[1.5, 0.08, 0.05]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  )
}

export function TanksIncStation({ scrollOffset }: TanksIncStationProps) {
  return (
    <group>
      <TitleBar />

      {/* Tank sprite cutout */}
      <TankSprite />

      {/* Animated cannonball sprite */}
      <AnimatedCannonball scrollOffset={scrollOffset} />

      {/* Floor with texture */}
      <FloorPlane />

      {/* Subtle lighting */}
      <pointLight position={[0, 5, 5]} color="#4ade80" intensity={0.6} />
    </group>
  )
}
