"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function AccretionDisk({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const particles = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * (radius * 0.4);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * 0.1;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [radius, color]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.6} 
        blending={THREE.AdditiveBlending} 
      />
    </points>
  );
}

function Singularity({ size }: { size: number }) {
  return (
    <mesh>
      <sphereGeometry args={[size, 64, 64]} />
      <meshBasicMaterial color="black" />
      {/* Event Horizon Glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.1} 
          emissive="#8b5cf6" 
          emissiveIntensity={2} 
        />
      </mesh>
    </mesh>
  );
}

export function BlackHoleSimulator() {
  const [mass, setMass] = useState(1);
  const [speed, setSpeed] = useState(0.01);

  return (
    <div className="w-full h-full min-h-[700px] relative bg-black">
      {/* UI Controls */}
      <div className="absolute top-8 left-8 z-30 bg-black/40 backdrop-blur-md p-6 border border-white/10 rounded-xl max-w-xs">
        <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Singularity Parameters</h3>
        <div className="space-y-6">
          <div>
            <label className="text-[10px] text-zinc-500 uppercase block mb-2">Mass (Solar Masses)</label>
            <input 
              type="range" 
              min="0.5" 
              max="5" 
              step="0.1" 
              value={mass} 
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <span className="text-white font-mono text-xs mt-1 block">{mass.toFixed(1)} M☉</span>
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase block mb-2">Accretion Velocity</label>
            <input 
              type="range" 
              min="0.001" 
              max="0.05" 
              step="0.001" 
              value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <span className="text-white font-mono text-xs mt-1 block">{(speed * 100).toFixed(1)}c</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[9px] text-zinc-600 leading-relaxed">
            Simulation of a Schwarzschild black hole with a rotating accretion disk. 
            Relativistic effects are approximated using additive blending.
          </p>
        </div>
      </div>

      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <color attach="background" args={["#020202"]} />
        <ambientLight intensity={0.1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Singularity size={mass} />
        <AccretionDisk radius={mass * 2.5} color="#8b5cf6" speed={speed} />
        <AccretionDisk radius={mass * 3.5} color="#f59e0b" speed={speed * 0.7} />
        <AccretionDisk radius={mass * 4.5} color="#ef4444" speed={speed * 0.5} />
        
        <OrbitControls 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxDistance={20}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}
