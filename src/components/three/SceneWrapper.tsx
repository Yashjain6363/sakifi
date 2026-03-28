"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function SceneWrapper({ children, className }: SceneWrapperProps) {
  return (
    <div className={className || "three-canvas-container"}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <pointLight position={[-3, -3, 2]} intensity={0.3} color="#8B5CF6" />
          <pointLight position={[3, 3, 2]} intensity={0.3} color="#E8758A" />
          {children}
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
