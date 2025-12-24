"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const { mouse } = useThree();
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 2;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;
    
    // Smoothly follow mouse
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.2, 0.1);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.2, 0.1);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function Galaxy() {
  const ref = useRef<THREE.Group>(null!);
  const materialRef = useRef<any>(null!);
  const { mouse } = useThree();
  
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
    
    // Tilt galaxy towards mouse
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -mouse.y * 0.2, 0.1);
    ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, mouse.x * 0.2, 0.1);
    
    if (materialRef.current) {
      materialRef.current.size = 0.015 + Math.sin(state.clock.elapsedTime * 2) * 0.005;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={particles.positions} colors={particles.colors} stride={3}>
        <PointMaterial
          ref={materialRef}
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
      <Canvas camera={{ position: [0, 3, 6], fov: 60 }}>
        <StarField />
        <Galaxy />
      </Canvas>
    </div>
  );
}
