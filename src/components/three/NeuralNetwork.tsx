"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 40;
const CONNECTION_DISTANCE = 1.8;

export function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 1.5;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    return positions;
  }, []);

  const connections = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECTION_DISTANCE) {
          lines.push([nodes[i], nodes[j]]);
        }
      }
    }
    return lines;
  }, [nodes]);

  const lineGeometries = useMemo(() => {
    return connections.map(([start, end]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
      return geo;
    });
  }, [connections]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#E8758A" : i % 3 === 1 ? "#8B5CF6" : "#C9A96E"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Connections */}
      {lineGeometries.map((geo, i) => (
        <lineSegments key={`line-${i}`} geometry={geo}>
          <lineBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.12}
          />
        </lineSegments>
      ))}
    </group>
  );
}
