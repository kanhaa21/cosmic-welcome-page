"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Fix for R3F "data-orchids-name" error
if (typeof window !== 'undefined') {
  (THREE.Object3D.prototype as any)['data-orchids-name'] = undefined;
  (THREE.BufferGeometry.prototype as any)['data-orchids-name'] = undefined;
  (THREE.Material.prototype as any)['data-orchids-name'] = undefined;
}

function RealisticAccretionDisk({ radius, mass, speed }: { radius: number; mass: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uRadius: { value: radius },
      uMass: { value: mass },
      uSpeed: { value: speed },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uRadius;
      uniform float uMass;
      uniform float uSpeed;
      varying vec2 vUv;
      varying vec3 vPosition;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        float r = length(vPosition.xz);
        float angle = atan(vPosition.z, vPosition.x);
        
        // Dynamic noise for disk texture
        float n = noise(vec2(r * 0.5 - uTime * uSpeed, angle * 3.0));
        float n2 = noise(vec2(r * 2.0 + uTime * uSpeed * 0.5, angle * 5.0));
        
        // Heat gradient: white/blue near center, orange/red further out
        float heat = 1.0 - (r - uMass) / (uRadius - uMass);
        vec3 color = mix(vec3(1.0, 0.3, 0.1), vec3(1.0, 0.8, 0.5), heat);
        color = mix(color, vec3(0.5, 0.7, 1.0), pow(heat, 3.0));
        
        // Alpha mask
        float alpha = smoothstep(uRadius, uMass * 1.5, r) * smoothstep(uMass, uMass * 1.2, r);
        alpha *= (n * 0.5 + 0.5) * (n2 * 0.3 + 0.7);
        
        gl_FragColor = vec4(color * 2.0, alpha * 0.8);
      }
    `
  }), [radius, mass, speed]);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.y += speed * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.2, 0, 0]}>
      <ringGeometry args={[mass * 1.1, radius, 128]} />
      <shaderMaterial
        args={[shaderArgs]}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function LensingEffect({ mass }: { mass: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <mesh ref={meshRef} scale={mass * 2.5}>
      <planeGeometry />
      <shaderMaterial
        transparent
        blending={THREE.AdditiveBlending}
        uniforms={{
          uMass: { value: mass },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5);
            float intensity = pow(0.05 / d, 2.0);
            gl_FragColor = vec4(1.0, 1.0, 1.0, intensity * 0.15);
          }
        `}
      />
    </mesh>
  );
}

function Singularity({ size }: { size: number }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[size, 64, 64]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* Event Horizon Glow */}
      <mesh scale={1.05}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.2} 
          emissive="#ffffff" 
          emissiveIntensity={5} 
        />
      </mesh>
    </group>
  );
}

export function BlackHoleSimulator() {
  const [mass, setMass] = useState(1.5);
  const [speed, setSpeed] = useState(0.02);

  return (
    <div className="w-full h-full min-h-[700px] relative bg-black">
      {/* UI Controls */}
      <div className="absolute top-8 left-8 z-30 bg-black/40 backdrop-blur-md p-6 border border-white/10 rounded-xl max-w-xs">
        <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Event Horizon Controls</h3>
        <div className="space-y-6">
          <div>
            <label className="text-[10px] text-zinc-500 uppercase block mb-2">Singularity Mass</label>
            <input 
              type="range" 
              min="0.5" 
              max="4" 
              step="0.1" 
              value={mass} 
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <span className="text-white font-mono text-xs mt-1 block">{mass.toFixed(1)} Solar Masses</span>
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase block mb-2">Rotation Speed</label>
            <input 
              type="range" 
              min="0.005" 
              max="0.08" 
              step="0.005" 
              value={speed} 
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
            <span className="text-white font-mono text-xs mt-1 block">{(speed * 100).toFixed(1)}c</span>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-[9px] text-zinc-600 leading-relaxed italic">
            "The gravitational pull of a black hole is so strong that even light cannot escape it once it passes the event horizon."
          </p>
        </div>
      </div>

      <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
        <color attach="background" args={["#000000"]} />
        <Stars radius={150} depth={50} count={10000} factor={6} saturation={0} fade speed={0.5} />
        
        <Singularity size={mass} />
        <RealisticAccretionDisk radius={mass * 6} mass={mass} speed={speed} />
        <LensingEffect mass={mass} />
        
        <OrbitControls 
          enablePan={false}
          autoRotate={false}
          maxDistance={30}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}
