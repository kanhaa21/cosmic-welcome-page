"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 1.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Galaxy() {
  const ref = useRef<THREE.Group>(null!);
  
  const particles = useMemo(() => {
    const count = 15000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 5;
      const spinAngle = radius * 5;
      const branchAngle = ((i % 3) * 2 * Math.PI) / 3;
      
      const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius);
      const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius);
      const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius);
      
      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      const colorInside = new THREE.Color("#ff6030");
      const colorOutside = new THREE.Color("#1b3984");
      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / 5);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={ref}>
      <Points positions={particles.positions} colors={particles.colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export function MilkyWay() {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
        <StarField />
        <Galaxy />
      </Canvas>
    </div>
  );
}
