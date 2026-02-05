"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import type { Mesh, Group } from "three"

function CentralScreen() {
  const screenRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (screenRef.current) {
      screenRef.current.rotation.y = Math.sin(t * 0.2) * 0.05
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.02)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Screen frame */}
      <RoundedBox
        ref={screenRef}
        args={[5, 3, 0.2]}
        radius={0.1}
        smoothness={4}
      >
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Screen display */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[4.6, 2.6]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Screen glow */}
      <mesh ref={glowRef} position={[0, 0, -0.2]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.1} />
      </mesh>

      {/* Dashboard elements */}
      <mesh position={[-1.5, 0.8, 0.12]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.5, 0.8, 0.12]}>
        <planeGeometry args={[1.2, 0.6]} />
        <meshStandardMaterial color="#fb923c" emissive="#fb923c" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.5, 0.12]}>
        <planeGeometry args={[3, 1]} />
        <meshStandardMaterial color="#d97706" emissive="#d97706" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function OrbitingCoin({
  index,
  totalCoins,
  radius,
}: {
  index: number
  totalCoins: number
  radius: number
}) {
  const coinRef = useRef<Mesh>(null)
  const angle = (index / totalCoins) * Math.PI * 2

  useFrame((state) => {
    if (coinRef.current) {
      const t = state.clock.elapsedTime
      const currentAngle = angle + t * 0.5
      
      coinRef.current.position.x = Math.cos(currentAngle) * radius
      coinRef.current.position.z = Math.sin(currentAngle) * radius
      coinRef.current.position.y = Math.sin(t * 2 + index) * 0.3
      
      coinRef.current.rotation.y = t * 2
      coinRef.current.rotation.x = Math.PI / 6
    }
  })

  return (
    <group ref={coinRef}>
      {/* Coin body */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.08, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Coin edge detail */}
      <mesh>
        <torusGeometry args={[0.4, 0.02, 8, 32]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Dollar sign on coin */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.03, 8, 16]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>
    </group>
  )
}

function FloatingCoins() {
  const numCoins = 7
  const radius = 5

  return (
    <group>
      {Array.from({ length: numCoins }).map((_, i) => (
        <OrbitingCoin key={i} index={i} totalCoins={numCoins} radius={radius} />
      ))}
    </group>
  )
}

function SparkleParticles() {
  const particlesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const angle = (i / 15) * Math.PI * 2 + t * 0.3
        particle.position.x = Math.cos(angle) * (6 + Math.sin(t + i) * 0.5)
        particle.position.z = Math.sin(angle) * (6 + Math.cos(t + i) * 0.5)
        particle.position.y = Math.sin(t * 2 + i * 0.5) * 2
        
        const scale = 0.05 + Math.sin(t * 4 + i) * 0.03
        particle.scale.setScalar(scale)
      }
    })
  })

  return (
    <group>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el
          }}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}

// Title bar geometry instead of Text3D
function TitleBar() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 4, 0]}>
      {/* Abstract title bars for DINI */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x * 0.6, 0, 0]}>
          <boxGeometry args={[0.4, 0.7, 0.1]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Subtitle indicator */}
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[2.5, 0.08, 0.05]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  )
}

export function DiniStation() {
  return (
    <group>
      <TitleBar />

      {/* Central screen */}
      <CentralScreen />

      {/* Orbiting coins */}
      <FloatingCoins />

      {/* Sparkle effects */}
      <SparkleParticles />

      {/* Lighting */}
      <pointLight position={[0, 5, 5]} color="#f59e0b" intensity={1.5} />
      <pointLight position={[5, 0, 0]} color="#fbbf24" intensity={0.5} />
      <pointLight position={[-5, 0, 0]} color="#d97706" intensity={0.5} />
    </group>
  )
}
