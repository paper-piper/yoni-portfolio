"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { BackSide, Group } from "three"
import type { Mesh } from "three"

// Sky gradient shader
const skyVertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const skyFragmentShader = `
  varying vec3 vWorldPosition;
  uniform vec3 topColor;
  uniform vec3 bottomColor;
  uniform float offset;
  uniform float exponent;
  void main() {
    float h = normalize(vWorldPosition + offset).y;
    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
  }
`

function SkyGradient() {
  const uniforms = useMemo(() => ({
    topColor: { value: [0.15, 0.18, 0.25] },
    bottomColor: { value: [0.22, 0.25, 0.28] },
    offset: { value: 20 },
    exponent: { value: 0.4 },
  }), [])

  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[50, 32, 32]} />
      <shaderMaterial
        vertexShader={skyVertexShader}
        fragmentShader={skyFragmentShader}
        uniforms={uniforms}
        side={BackSide}
      />
    </mesh>
  )
}

function SoftHalo() {
  return (
    <group position={[0, 10, -18]}>
      {/* Soft distant halo - cool neutral tone */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#c0c8d0" transparent opacity={0.8} />
      </mesh>
      
      {/* First halo layer */}
      <mesh>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial color="#a8b0b8" transparent opacity={0.25} />
      </mesh>
      
      {/* Second halo layer */}
      <mesh>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial color="#909098" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function Stars() {
  const starData = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30 + 5,
        (Math.random() - 0.5) * 30 - 10,
      ] as [number, number, number],
      size: Math.random() * 0.08 + 0.02,
    }))
  }, [])

  return (
    <group>
      {starData.map((data, i) => (
        <mesh key={i} position={data.position}>
          <sphereGeometry args={[data.size, 8, 8]} />
          <meshBasicMaterial color="#d0d8e0" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

// Minimal rectangular frame - doorway/screen
function RectangularFrame() {
  const frameThickness = 0.08
  const frameWidth = 4
  const frameHeight = 6

  return (
    <group position={[0, 0, 0]}>
      {/* Top bar */}
      <mesh position={[0, frameHeight / 2, 0]}>
        <boxGeometry args={[frameWidth + frameThickness * 2, frameThickness, frameThickness]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Bottom bar */}
      <mesh position={[0, -frameHeight / 2, 0]}>
        <boxGeometry args={[frameWidth + frameThickness * 2, frameThickness, frameThickness]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Left bar */}
      <mesh position={[-frameWidth / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, frameHeight, frameThickness]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Right bar */}
      <mesh position={[frameWidth / 2, 0, 0]}>
        <boxGeometry args={[frameThickness, frameHeight, frameThickness]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
    </group>
  )
}

export function IntroStation() {
  return (
    <group>
      <SkyGradient />
      <SoftHalo />
      <Stars />
      <RectangularFrame />
    </group>
  )
}
