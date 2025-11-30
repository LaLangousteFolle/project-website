"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function SharkModel() {
  const { scene } = useGLTF("/models/shark.glb");
  return (
    <primitive
      object={scene}
      scale={1.0}
      rotation={[0, Math.PI / 2, 0]}
      position={[0.3, -0.45, 0]} 
    />
  );
}

export function Shark3D() {
  return (
    <div className="w-64 h-64 rounded-xl bg-slate-900/60 border border-cyan-500/30 shadow-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0.3, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Suspense fallback={null}>
          <SharkModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={10}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/shark.glb");
