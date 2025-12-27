"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text, Trail, Line } from "@react-three/drei";
import * as THREE from "three";

// Fix for R3F "data-orchids-name" error
if (typeof window !== 'undefined') {
  (THREE.Object3D.prototype as any)['data-orchids-name'] = undefined;
  (THREE.BufferGeometry.prototype as any)['data-orchids-name'] = undefined;
  (THREE.Material.prototype as any)['data-orchids-name'] = undefined;
}

const PLANET_DATA = [
  { name: "Mercury", color: "#A5A5A5", size: 0.4, distance: 4, speed: 1.5, orbitalSpeed: 0.04 },
  { name: "Venus", color: "#E3BB76", size: 0.7, distance: 7, speed: 1.2, orbitalSpeed: 0.015 },
  { name: "Earth", color: "#2271B3", size: 0.8, distance: 10, speed: 1.0, orbitalSpeed: 0.01 },
  { name: "Mars", color: "#E27B58", size: 0.5, distance: 13, speed: 0.8, orbitalSpeed: 0.008 },
  { name: "Jupiter", color: "#D39C7E", size: 2.0, distance: 18, speed: 0.5, orbitalSpeed: 0.004 },
  { name: "Saturn", color: "#C5AB6E", size: 1.7, distance: 24, speed: 0.4, orbitalSpeed: 0.002, hasRings: true },
  { name: "Uranus", color: "#BBE1E4", size: 1.2, distance: 30, speed: 0.3, orbitalSpeed: 0.0015 },
  { name: "Neptune", color: "#6081FF", size: 1.2, distance: 35, speed: 0.2, orbitalSpeed: 0.001 },
];

function Planet({ name, color, size, distance, orbitalSpeed, hasRings }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * orbitalSpeed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
    }
    return points;
  }, [distance]);

  return (
    <group>
      {/* Orbit Line */}
      <Line
        points={orbitPoints}
        color="white"
        lineWidth={0.5}
        transparent
        opacity={0.1}
      />
      
      <group ref={groupRef}>
        <mesh ref={meshRef} position={[distance, 0, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.7} 
            metalness={0.3}
            emissive={color}
            emissiveIntensity={0.2}
          />
          
          {hasRings && (
            <mesh rotation={[Math.PI / 2.5, 0, 0]}>
              <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
              <meshStandardMaterial 
                color={color} 
                transparent 
                opacity={0.4} 
                side={THREE.DoubleSide} 
              />
            </mesh>
          )}

          <Text
            position={[0, size + 0.5, 0]}
            fontSize={0.4}
            color="white"
            font="/fonts/Orbitron-Bold.ttf" // Fallback to system font if not exists
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        </mesh>
      </group>
    </group>
  );
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial 
        emissive="#ffcc00" 
        emissiveIntensity={2} 
        color="#ffcc00" 
      />
      <pointLight intensity={100} distance={100} color="#ffcc00" />
    </mesh>
  );
}

export function SolarSystem3D() {
  return (
    <div className="w-full h-full min-h-[600px] bg-black">
      <Canvas camera={{ position: [0, 25, 40], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Sun />
        
        {PLANET_DATA.map((planet) => (
          <Planet key={planet.name} {...planet} />
        ))}
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          maxDistance={100}
          minDistance={10}
        />
      </Canvas>
    </div>
  );
}
