"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// Fix for R3F "data-orchids-name" error
if (typeof window !== 'undefined') {
  (THREE.Object3D.prototype as any)['data-orchids-name'] = undefined;
  (THREE.BufferGeometry.prototype as any)['data-orchids-name'] = undefined;
  (THREE.Material.prototype as any)['data-orchids-name'] = undefined;
}

const SCALE_LEVELS = [
  { name: "Earth", min: 0, max: 15, cameraZ: 8, description: "Home Planet • 12,742 km diameter" },
  { name: "Solar System", min: 15, max: 40, cameraZ: 80, description: "8 Planets • 287.46 billion km" },
  { name: "Milky Way", min: 40, max: 70, cameraZ: 150, description: "200-400 Billion Stars • 100,000 ly" },
  { name: "Observable Universe", min: 70, max: 100, cameraZ: 300, description: "2 Trillion Galaxies • 93 billion ly" },
];

function useSmoothedValue(target: number, smoothing: number = 0.08) {
  const valueRef = useRef(target);
  const [value, setValue] = useState(target);
  
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      const diff = target - valueRef.current;
      if (Math.abs(diff) > 0.001) {
        valueRef.current += diff * smoothing;
        setValue(valueRef.current);
        animationId = requestAnimationFrame(animate);
      } else {
        valueRef.current = target;
        setValue(target);
      }
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, smoothing]);
  
  return value;
}

function CameraController({ targetZ }: { targetZ: number }) {
  const { camera } = useThree();
  const currentZ = useRef(camera.position.z);
  
  useFrame(() => {
    const diff = targetZ - currentZ.current;
    currentZ.current += diff * 0.02;
    camera.position.z = currentZ.current;
  });
  
  return null;
}

function Earth({ opacity }: { opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.12;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = t * 0.05;
    }
  });

  if (opacity <= 0.01) return <group visible={false} />;

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          color="#1a4d7c"
          transparent
          opacity={opacity}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={opacity * 0.3}
          depthWrite={false}
        />
      </mesh>
      
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={{
            uOpacity: { value: opacity },
          }}
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uOpacity;
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(0.3, 0.6, 1.0, intensity * uOpacity * 0.6);
            }
          `}
          side={THREE.BackSide}
        />
      </mesh>
      
      <pointLight intensity={15} distance={30} color="#ffffff" position={[5, 3, 5]} />
      
      <mesh position={[2.2, 0.8, 0]} scale={0.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#888888" transparent opacity={opacity * 0.8} />
      </mesh>
    </group>
  );
}

function SolarSystemView({ opacity }: { opacity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const planets = useMemo(() => [
    { name: "Sun", color: "#FDB813", size: 4, distance: 0, speed: 0, emissive: true },
    { name: "Mercury", color: "#B5B5B5", size: 0.3, distance: 8, speed: 4.15 },
    { name: "Venus", color: "#E6C87A", size: 0.6, distance: 12, speed: 1.62 },
    { name: "Earth", color: "#6B93D6", size: 0.65, distance: 16, speed: 1 },
    { name: "Mars", color: "#C1440E", size: 0.4, distance: 20, speed: 0.53 },
    { name: "Jupiter", color: "#D4A574", size: 2.2, distance: 32, speed: 0.084 },
    { name: "Saturn", color: "#C9B896", size: 1.8, distance: 44, speed: 0.034, hasRings: true },
    { name: "Uranus", color: "#D1E7E7", size: 1.1, distance: 54, speed: 0.012 },
    { name: "Neptune", color: "#5B5DDF", size: 1.0, distance: 62, speed: 0.006 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} scale={0.8}>
      {planets.map((planet, idx) => (
        <PlanetOrbit key={planet.name} {...planet} opacity={opacity} time={idx} />
      ))}
    </group>
  );
}

function PlanetOrbit({ name, color, size, distance, speed, opacity, emissive, hasRings, time }: any) {
  const planetRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  const orbitPoints = useMemo(() => {
    if (distance === 0) return [];
    const points = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
    }
    return points;
  }, [distance]);

  const orbitPositions = useMemo(() => {
    if (distance === 0 || orbitPoints.length === 0) return new Float32Array(0);
    return new Float32Array(orbitPoints.flatMap(p => [p.x, p.y, p.z]));
  }, [distance, orbitPoints]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planetRef.current && distance > 0) {
      const angle = t * speed * 0.1 + time;
      planetRef.current.position.x = Math.cos(angle) * distance;
      planetRef.current.position.z = Math.sin(angle) * distance;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {distance > 0 && orbitPositions.length > 0 && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={orbitPositions.length / 3}
              array={orbitPositions}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ffffff" transparent opacity={opacity * 0.15} />
        </line>
      )}
      
      <group ref={planetRef} position={[distance, 0, 0]}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
            emissive={emissive ? color : "#000000"}
            emissiveIntensity={emissive ? 2 : 0}
            roughness={0.7}
          />
        </mesh>
        
        {emissive && (
          <pointLight intensity={100} distance={100} color={color} />
        )}
        
        {hasRings && (
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[size * 1.5, size * 2.5, 64]} />
            <meshStandardMaterial
              color="#A89F91"
              transparent
              opacity={opacity * 0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </group>
  );
}

function GalaxyView({ opacity }: { opacity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const [arms, core] = useMemo(() => {
    const armCount = 4;
    const particlesPerArm = 8000;
    const armPositions: Float32Array[] = [];
    const armColors: Float32Array[] = [];
    
    for (let arm = 0; arm < armCount; arm++) {
      const positions = new Float32Array(particlesPerArm * 3);
      const colors = new Float32Array(particlesPerArm * 3);
      const armAngle = (arm / armCount) * Math.PI * 2;
      
      for (let i = 0; i < particlesPerArm; i++) {
        const r = Math.random() * 60 + 5;
        const spiralAngle = armAngle + r * 0.12 + (Math.random() - 0.5) * 0.5;
        const spread = Math.random() * 4 - 2;
        
        positions[i * 3] = Math.cos(spiralAngle) * r + spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * (2 + r * 0.02);
        positions[i * 3 + 2] = Math.sin(spiralAngle) * r + spread;
        
        const t = r / 60;
        const color = new THREE.Color().lerpColors(
          new THREE.Color("#FFE4C4"),
          new THREE.Color("#4169E1"),
          t + Math.random() * 0.3
        );
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      armPositions.push(positions);
      armColors.push(colors);
    }
    
    const coreCount = 5000;
    const corePos = new Float32Array(coreCount * 3);
    const coreCol = new Float32Array(coreCount * 3);
    
    for (let i = 0; i < coreCount; i++) {
      const r = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      corePos[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 0.5;
      corePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3;
      corePos[i * 3 + 2] = r * Math.cos(phi) * 0.5;
      
      const brightness = 1 - r / 10;
      coreCol[i * 3] = 1;
      coreCol[i * 3 + 1] = 0.9 * brightness + 0.5;
      coreCol[i * 3 + 2] = 0.6 * brightness;
    }
    
    return [{ positions: armPositions, colors: armColors }, { positions: corePos, colors: coreCol }];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef} rotation={[Math.PI * 0.15, 0, 0]}>
      {arms.positions.map((pos, idx) => (
        <points key={idx}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={pos.length / 3} array={pos} itemSize={3} />
            <bufferAttribute attach="attributes-color" count={arms.colors[idx].length / 3} array={arms.colors[idx]} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial
            size={0.15}
            vertexColors
            transparent
            opacity={opacity * 0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      ))}
      
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={core.positions.length / 3} array={core.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={core.colors.length / 3} array={core.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          vertexColors
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <mesh ref={coreRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#FFF8DC" transparent opacity={opacity * 0.3} />
      </mesh>
    </group>
  );
}

function UniverseView({ opacity }: { opacity: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const [galaxies, filaments] = useMemo(() => {
    const galaxyCount = 3000;
    const galaxyPos = new Float32Array(galaxyCount * 3);
    const galaxyCol = new Float32Array(galaxyCount * 3);
    const galaxySizes = new Float32Array(galaxyCount);
    
    for (let i = 0; i < galaxyCount; i++) {
      const r = 50 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      galaxyPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      galaxyPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      galaxyPos[i * 3 + 2] = r * Math.cos(phi);
      
      const type = Math.random();
      if (type < 0.3) {
        galaxyCol[i * 3] = 1; galaxyCol[i * 3 + 1] = 0.8; galaxyCol[i * 3 + 2] = 0.6;
      } else if (type < 0.6) {
        galaxyCol[i * 3] = 0.6; galaxyCol[i * 3 + 1] = 0.7; galaxyCol[i * 3 + 2] = 1;
      } else {
        galaxyCol[i * 3] = 1; galaxyCol[i * 3 + 1] = 1; galaxyCol[i * 3 + 2] = 0.9;
      }
      
      galaxySizes[i] = 0.5 + Math.random() * 1.5;
    }
    
    const filamentCount = 10000;
    const filamentPos = new Float32Array(filamentCount * 3);
    const filamentCol = new Float32Array(filamentCount * 3);
    
    for (let i = 0; i < filamentCount; i++) {
      const t = Math.random();
      const baseX = (Math.random() - 0.5) * 400;
      const baseY = (Math.random() - 0.5) * 400;
      const baseZ = (Math.random() - 0.5) * 400;
      
      const offset = Math.sin(t * Math.PI * 4) * 30;
      
      filamentPos[i * 3] = baseX + offset;
      filamentPos[i * 3 + 1] = baseY + Math.cos(t * Math.PI * 4) * 20;
      filamentPos[i * 3 + 2] = baseZ;
      
      filamentCol[i * 3] = 0.3;
      filamentCol[i * 3 + 1] = 0.2;
      filamentCol[i * 3 + 2] = 0.5;
    }
    
    return [
      { positions: galaxyPos, colors: galaxyCol, sizes: galaxySizes },
      { positions: filamentPos, colors: filamentCol }
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  if (opacity <= 0.01) return null;

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={filaments.positions.length / 3} array={filaments.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={filaments.colors.length / 3} array={filaments.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          vertexColors
          transparent
          opacity={opacity * 0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={galaxies.positions.length / 3} array={galaxies.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={galaxies.colors.length / 3} array={galaxies.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={1}
          vertexColors
          transparent
          opacity={opacity * 0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function WarpEffect({ active }: { active: boolean }) {
  const points = useMemo(() => {
    const p = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 50;
      p[i * 3 + 2] = Math.random() * -100;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    if (active) {
      ref.current.position.z += 2;
      if (ref.current.position.z > 50) ref.current.position.z = 0;
      ref.current.visible = true;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={1000} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function Scene({ zoom }: { zoom: number }) {
  const zoomVel = useRef(0);
  const lastZoom = useRef(zoom);
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    const diff = Math.abs(zoom - lastZoom.current);
    if (diff > 5) {
      setIsWarping(true);
      const timer = setTimeout(() => setIsWarping(false), 800);
      return () => clearTimeout(timer);
    }
    lastZoom.current = zoom;
  }, [zoom]);

  const earthOpacity = useSmoothedValue(Math.max(0, 1 - zoom / 20), 0.05);
  const solarOpacity = useSmoothedValue(
    Math.min(1, Math.max(0, (zoom - 10) / 15)) * Math.max(0, 1 - (zoom - 35) / 15),
    0.05
  );
  const galaxyOpacity = useSmoothedValue(
    Math.min(1, Math.max(0, (zoom - 35) / 15)) * Math.max(0, 1 - (zoom - 65) / 15),
    0.05
  );
  const universeOpacity = useSmoothedValue(Math.min(1, Math.max(0, (zoom - 60) / 20)), 0.05);

  const targetCameraZ = useMemo(() => {
    const level = SCALE_LEVELS.find(l => zoom >= l.min && zoom < l.max) || SCALE_LEVELS[3];
    const progress = (zoom - level.min) / (level.max - level.min);
    const nextLevel = SCALE_LEVELS[SCALE_LEVELS.indexOf(level) + 1] || level;
    return THREE.MathUtils.lerp(level.cameraZ, nextLevel.cameraZ, Math.min(1, progress));
  }, [zoom]);

  return (
    <>
      <CameraController targetZ={targetCameraZ} />
      <ambientLight intensity={0.3} />
      <Stars radius={400} depth={200} count={8000} factor={4} saturation={0} fade speed={0.5} />
      
      <Earth opacity={earthOpacity} />
      <SolarSystemView opacity={solarOpacity} />
      <GalaxyView opacity={galaxyOpacity} />
      <UniverseView opacity={universeOpacity} />
    </>
  );
}

export function CosmicNavigator() {
  const [zoom, setZoom] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const smoothedZoom = useSmoothedValue(zoom, 0.06);

  const currentLevel = useMemo(() => {
    return SCALE_LEVELS.find(l => smoothedZoom >= l.min && smoothedZoom < l.max) || SCALE_LEVELS[3];
  }, [smoothedZoom]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(prev => Math.max(0, Math.min(100, prev + e.deltaY * 0.05)));
  }, []);

  const scaleIndicators = useMemo(() => {
    const scales = [
      { label: "1 km", zoom: 0 },
      { label: "1 AU", zoom: 20 },
      { label: "1 ly", zoom: 45 },
      { label: "1 Mpc", zoom: 75 },
      { label: "∞", zoom: 100 },
    ];
    return scales;
  }, []);

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden" onWheel={handleWheel}>
      <div className="absolute top-28 left-12 z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel.name}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-purple-400">Current Scale</span>
            </div>
            <h2 className="text-6xl font-extralight text-white tracking-tight font-[family-name:var(--font-orbitron)]">
              {currentLevel.name}
            </h2>
            <p className="text-sm text-zinc-500 tracking-wide">{currentLevel.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1">
        {scaleIndicators.map((scale, idx) => (
          <motion.div
            key={scale.label}
            className="flex items-center gap-3"
            animate={{
              opacity: Math.abs(smoothedZoom - scale.zoom) < 20 ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-8 h-px transition-all duration-300 ${
              smoothedZoom >= scale.zoom ? 'bg-purple-500' : 'bg-zinc-700'
            }`} />
            <span className={`text-[10px] font-mono transition-colors duration-300 ${
              smoothedZoom >= scale.zoom ? 'text-purple-400' : 'text-zinc-600'
            }`}>
              {scale.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-8">
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0 flex justify-between px-2">
            {SCALE_LEVELS.map((level) => (
              <motion.button
                key={level.name}
                onClick={() => setZoom(level.min + 5)}
                className={`text-[9px] uppercase tracking-wider transition-colors ${
                  currentLevel.name === level.name ? 'text-purple-400' : 'text-zinc-600 hover:text-zinc-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {level.name.split(' ')[0]}
              </motion.button>
            ))}
          </div>
          
          <div className="bg-black/60 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl">
            <div className="relative h-2 bg-zinc-900 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full"
                style={{ width: `${smoothedZoom}%` }}
                transition={{ duration: 0.1 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50 cursor-grab active:cursor-grabbing"
                style={{ left: `calc(${smoothedZoom}% - 8px)` }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                onDrag={(_, info) => {
                  const parent = (info.point.x / window.innerWidth) * 100;
                }}
              />
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing"
            />
          </div>
          
          <div className="flex justify-between mt-4 text-[10px] text-zinc-600 uppercase tracking-widest">
            <span>Micro</span>
            <span className="text-purple-400 font-mono">{smoothedZoom.toFixed(1)}%</span>
            <span>Macro</span>
          </div>
        </div>
      </div>

      <div className="absolute top-28 right-12 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-right space-y-6"
        >
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Distance from Origin</span>
            <span className="text-2xl font-mono text-white">
              {smoothedZoom < 20 ? `${(smoothedZoom * 637).toFixed(0)} km` :
               smoothedZoom < 45 ? `${((smoothedZoom - 20) * 0.4).toFixed(2)} AU` :
               smoothedZoom < 75 ? `${((smoothedZoom - 45) * 3333).toFixed(0)} ly` :
               `${((smoothedZoom - 75) * 40).toFixed(0)} Mly`}
            </span>
          </div>
          
          <div className="w-32 h-px bg-gradient-to-l from-purple-500/50 to-transparent" />
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Light Travel Time</span>
            <span className="text-lg font-mono text-purple-400">
              {smoothedZoom < 20 ? `${(smoothedZoom * 0.002).toFixed(3)}s` :
               smoothedZoom < 45 ? `${((smoothedZoom - 20) * 8).toFixed(0)} min` :
               smoothedZoom < 75 ? `${((smoothedZoom - 45) * 3333).toFixed(0)} yr` :
               `${((smoothedZoom - 75) * 40).toFixed(0)} Myr`}
            </span>
          </div>
        </motion.div>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={["#010101"]} />
        <fog attach="fog" args={["#010101", 100, 400]} />
        <Scene zoom={smoothedZoom} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.1}
          maxPolarAngle={Math.PI * 0.7}
          minPolarAngle={Math.PI * 0.3}
        />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="absolute bottom-4 right-4 z-30 text-[9px] text-zinc-700 font-mono">
        SCROLL OR DRAG TO NAVIGATE
      </div>
    </div>
  );
}
