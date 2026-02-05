"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh, Group } from "three"

function FloatingShapes() {
  const shapesRef = useRef<Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    shapesRef.current.forEach((shape, i) => {
      if (shape) {
        shape.rotation.x = t * 0.2 + i
        shape.rotation.y = t * 0.3 + i * 0.5
        shape.position.y = Math.sin(t * 0.5 + i) * 0.5 + (i - 1.5) * 2
      }
    })
  })

  return (
    <group position={[0, 0, -5]}>
      {/* Decorative shapes */}
      <mesh
        ref={(el) => {
          if (el) shapesRef.current[0] = el
        }}
        position={[-6, 2, 0]}
      >
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh
        ref={(el) => {
          if (el) shapesRef.current[1] = el
        }}
        position={[6, -1, 0]}
      >
        <icosahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh
        ref={(el) => {
          if (el) shapesRef.current[2] = el
        }}
        position={[-5, -2, 2]}
      >
        <tetrahedronGeometry args={[0.7]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh
        ref={(el) => {
          if (el) shapesRef.current[3] = el
        }}
        position={[5, 1, -2]}
      >
        <dodecahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

function ConnectingLines() {
  const linesRef = useRef<Group>(null)

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={linesRef} position={[0, 0, -3]}>
      {/* Abstract connecting lines */}
      {[-3, -1.5, 0, 1.5, 3].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[12, 0.02, 0.02]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1 + i * 0.05}
          />
        </mesh>
      ))}
      {[-5, -2.5, 0, 2.5, 5].map((x, i) => (
        <mesh key={`v-${i}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.02, 8, 0.02]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1 + i * 0.03}
          />
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
      {/* Abstract title bars for ABOUT & CONTACT */}
      {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((x, i) => (
        <mesh key={i} position={[x * 0.35, 0, 0]}>
          <boxGeometry args={[0.2, 0.4 + Math.sin(i * 0.5) * 0.2, 0.08]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

export function AboutStation() {
  return (
    <group>
      <TitleBar />

      {/* Decorative elements */}
      <FloatingShapes />
      <ConnectingLines />

      {/* Ambient lighting */}
      <pointLight position={[0, 5, 5]} color="#8b5cf6" intensity={1} />
      <pointLight position={[-5, 0, 0]} color="#06b6d4" intensity={0.5} />
      <pointLight position={[5, 0, 0]} color="#ec4899" intensity={0.5} />
    </group>
  )
}
