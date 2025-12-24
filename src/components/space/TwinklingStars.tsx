"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Stars() {
  const ref = useRef<THREE.Points>(null!);
  
    const stars = useMemo(() => {
    const count = 15000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sizes[i] = Math.random();
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.005;
      
      // Simple twinkling effect by pulsing overall opacity
      const material = ref.current.material as THREE.PointsMaterial;
      material.opacity = 0.4 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
    }
  });

  return (
    <Points ref={ref} positions={stars.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export function TwinklingStars() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars />
      </Canvas>
    </div>
  );
}
