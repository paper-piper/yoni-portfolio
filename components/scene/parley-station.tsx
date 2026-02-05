"use client"

import { useRef, Suspense, useState, useEffect } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { RoundedBox, Html } from "@react-three/drei"
import { TextureLoader } from "three"
import type { Mesh, Group, Texture } from "three"
import { getPublicPath } from "@/lib/public-path"

function PhoneScreen() {
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(
      getPublicPath("/textures/parley-screen.png"),
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      () => {
        console.log("[v0] Texture not found, using fallback color")
      }
    )
  }, [])
  
  return (
    <mesh position={[0, 0, 0.16]}>
      <planeGeometry args={[2.6, 5.4]} />
      {texture ? (
        <meshBasicMaterial map={texture} />
      ) : (
        <meshBasicMaterial color="#111827" />
      )}
    </mesh>
  )
}

function PhoneFrame() {
  const phoneRef = useRef<Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(t * 0.3) * 0.08
      phoneRef.current.position.y = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group ref={phoneRef} position={[0, 0, 0]}>
      {/* Phone body */}
      <RoundedBox args={[3, 6, 0.3]} radius={0.2} smoothness={4}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Screen with texture */}
      <Suspense fallback={
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[2.6, 5.4]} />
          <meshBasicMaterial color="#111827" />
        </mesh>
      }>
        <PhoneScreen />
      </Suspense>

      {/* Notch */}
      <mesh position={[0, 2.55, 0.17]}>
        <planeGeometry args={[0.8, 0.15]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Camera dot */}
      <mesh position={[0, 2.55, 0.18]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
    </group>
  )
}

function ChatBubble({ 
  index, 
  text, 
  isLeft 
}: { 
  index: number
  text: string
  isLeft: boolean 
}) {
  const groupRef = useRef<Group>(null)
  const baseX = isLeft ? -4 : 4
  const baseY = -1 + index * 1.5

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y = baseY + Math.sin(t * 0.4 + index) * 0.08
      groupRef.current.position.x = baseX + Math.sin(t * 0.25 + index) * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[baseX, baseY, 0]}>
      <RoundedBox
        args={[2.4, 0.9, 0.1]}
        radius={0.25}
      >
        <meshStandardMaterial
          color={isLeft ? "#3b82f6" : "#22c55e"}
          emissive={isLeft ? "#3b82f6" : "#22c55e"}
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
        />
      </RoundedBox>
      
      <Html
        position={[0, 0, 0.1]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            width: "180px",
            lineHeight: "1.4",
            padding: "8px 12px",
            whiteSpace: "normal",
          }}
        >
          {text}
        </div>
      </Html>
    </group>
  )
}

function ChatBubbles() {
  const bubbles = [
    { text: "Hey! Can you send the update?", isLeft: true },
    { text: "ETA 10 mins.", isLeft: true },
    { text: "On it", isLeft: false },
  ]

  return (
    <group>
      {bubbles.map((bubble, i) => (
        <ChatBubble
          key={i}
          index={i}
          text={bubble.text}
          isLeft={bubble.isLeft}
        />
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
      {/* Abstract title bars */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x * 0.5, 0, 0]}>
          <boxGeometry args={[0.3, 0.6 + Math.abs(x) * 0.1, 0.1]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Subtitle indicator */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[2, 0.1, 0.05]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
    </group>
  )
}

export function ParleyStation() {
  return (
    <group>
      <TitleBar />

      {/* Phone mockup */}
      <PhoneFrame />

      {/* Floating chat bubbles */}
      <ChatBubbles />

      {/* Ambient particles */}
      <pointLight position={[5, 5, 5]} color="#3b82f6" intensity={1} />
      <pointLight position={[-5, -5, 5]} color="#22c55e" intensity={0.5} />
    </group>
  )
}
