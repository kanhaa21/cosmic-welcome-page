"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Float, Line, Sphere, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function Earth({ scale }: { scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const opacity = Math.max(0, 1 - scale / 20);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  if (opacity <= 0) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        color="#2271B3" 
        transparent 
        opacity={opacity} 
        roughness={0.5}
      />
      <pointLight intensity={10} distance={20} color="#ffffff" />
    </mesh>
  );
}

function SolarSystem({ scale }: { scale: number }) {
  const opacity = Math.min(1, Math.max(0, (scale - 10) / 20)) * Math.max(0, 1 - (scale - 40) / 20);
  
  const planets = useMemo(() => [
    { name: "Sun", color: "#ffcc00", size: 3, distance: 0 },
    { name: "Mercury", color: "#A5A5A5", size: 0.4, distance: 8 },
    { name: "Venus", color: "#E3BB76", size: 0.7, distance: 12 },
    { name: "Earth", color: "#2271B3", size: 0.8, distance: 16 },
    { name: "Mars", color: "#E27B58", size: 0.5, distance: 20 },
    { name: "Jupiter", color: "#D39C7E", size: 2.0, distance: 28 },
    { name: "Saturn", color: "#C5AB6E", size: 1.7, distance: 36 },
  ], []);

  if (opacity <= 0) return null;

  return (
    <group scale={0.5}>
      {planets.map((p, i) => (
        <group key={p.name}>
          {p.distance > 0 && (
            <Line
              points={Array.from({ length: 65 }, (_, j) => {
                const a = (j / 64) * Math.PI * 2;
                return new THREE.Vector3(Math.cos(a) * p.distance, 0, Math.sin(a) * p.distance);
              })}
              color="white"
              lineWidth={0.5}
              transparent
              opacity={opacity * 0.1}
            />
          )}
          <mesh position={[p.distance, 0, 0]}>
            <sphereGeometry args={[p.size, 32, 32]} />
            <meshStandardMaterial color={p.color} transparent opacity={opacity} emissive={p.color} emissiveIntensity={p.name === "Sun" ? 1 : 0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Galaxy({ scale }: { scale: number }) {
  const opacity = Math.min(1, Math.max(0, (scale - 50) / 20)) * Math.max(0, 1 - (scale - 80) / 20);
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  const particles = useMemo(() => {
    const count = 10000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 50;
      const a = r * 0.5 + Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  if (opacity <= 0) return null;

  return (
    <group ref={ref}>
      <Points positions={particles} stride={3}>
        <PointMaterial 
          transparent 
          opacity={opacity * 0.5} 
          size={0.1} 
          color="#8b5cf6" 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function Universe({ scale }: { scale: number }) {
  const opacity = Math.min(1, Math.max(0, (scale - 80) / 20));
  
  const points = useMemo(() => {
    const count = 5000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 100 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  if (opacity <= 0) return null;

  return (
    <Points positions={points} stride={3}>
      <PointMaterial 
        transparent 
        opacity={opacity * 0.8} 
        size={0.5} 
        color="#ffffff" 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </Points>
  );
}

export function CosmicNavigator() {
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const labels = [
    { threshold: 0, text: "Earth Sanctuary" },
    { threshold: 25, text: "The Solar Neighborhood" },
    { threshold: 55, text: "The Milky Way Galaxy" },
    { threshold: 85, text: "The Observable Universe" },
  ];

  const currentLabel = labels.reduce((prev, curr) => zoom >= curr.threshold ? curr : prev).text;

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      {/* UI Overlay */}
      <div className="absolute top-32 left-12 z-30 pointer-events-none">
        <motion.div
          key={currentLabel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-purple-500 block">Current Location</span>
          <h2 className="text-5xl font-light text-white uppercase tracking-tighter font-[family-name:var(--font-orbitron)]">
            {currentLabel}
          </h2>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-12">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-full flex items-center gap-8">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest min-w-[80px]">Micro-Scale</span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="0.1" 
            value={zoom} 
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="flex-1 accent-purple-500"
          />
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest min-w-[80px] text-right">Macro-Scale</span>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#010101"]} />
        <ambientLight intensity={0.5} />
        <Stars radius={300} depth={100} count={10000} factor={4} saturation={0} fade speed={1} />
        
        <Earth scale={zoom} />
        <SolarSystem scale={zoom} />
        <Galaxy scale={zoom} />
        <Universe scale={zoom} />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    </div>
  );
}
