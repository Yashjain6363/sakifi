"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

export function FinancialOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.6, 64, 64]}>
        <MeshDistortMaterial
          color="#E8758A"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.85}
          envMapIntensity={1.5}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere args={[1.3, 32, 32]}>
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}