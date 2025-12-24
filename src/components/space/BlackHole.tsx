"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  #define PI 3.14159265359

  // Noise functions for accretion disk
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), 
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // BLACK HOLE PARAMETERS
    float eventHorizon = 0.4;
    float photonSphere = 0.55;
    
    // GRAVITATIONAL LENSING
    // Light bends near the mass. We simulate this by warping UVs.
    float lensing = 0.0;
    if (r > eventHorizon) {
        lensing = eventHorizon / (r * 1.5);
    }
    vec2 lUv = uv * (1.0 - lensing);
    float lr = length(lUv);
    float ltheta = atan(lUv.y, lUv.x);

    // ACCRETION DISK
    // Rotating hot gas around the event horizon
    float diskInner = 0.6;
    float diskOuter = 1.8;
    
    float diskMask = smoothstep(diskInner, diskInner + 0.1, lr) * (1.0 - smoothstep(diskOuter - 0.4, diskOuter, lr));
    
    // Animate the disk
    float diskSpeed = 1.5 / (lr + 0.1);
    float diskPattern = fbm(vec2(ltheta * 3.0 + uTime * diskSpeed, lr * 5.0 - uTime * 0.2));
    diskPattern *= fbm(vec2(ltheta * 1.0 - uTime * diskSpeed * 0.5, lr * 10.0));
    
    // Colors for the accretion disk (high energy white to orange/red)
    vec3 colHot = vec3(1.0, 1.0, 0.9);
    vec3 colWarm = vec3(1.0, 0.5, 0.1);
    vec3 colCool = vec3(0.5, 0.1, 0.0);
    
    vec3 diskColor = mix(colCool, colWarm, diskPattern);
    diskColor = mix(diskColor, colHot, pow(diskPattern, 3.0));
    
    // Add glow near the inner edge (Doppler boosting simulation)
    float innerGlow = exp(-(lr - diskInner) * 10.0) * diskMask;
    diskColor += colHot * innerGlow * 0.5;

    // PHOTON SPHERE GLOW
    float sphereGlow = exp(-(r - photonSphere) * 15.0) * step(eventHorizon, r);
    vec3 sphereColor = vec3(1.0, 0.8, 0.4) * sphereGlow * 0.8;

    // BACKGROUND STARS (Lensed)
    float starField = 0.0;
    for(float i = 1.0; i < 4.0; i++) {
        vec2 sUv = lUv * (10.0 + i * 15.0);
        vec2 grid = floor(sUv);
        float h = hash(grid);
        if (h > 0.98) {
            float star = smoothstep(0.1, 0.0, length(fract(sUv) - 0.5));
            starField += star * h;
        }
    }

    // FINAL COMPOSITION
    vec3 finalColor = vec3(0.0);
    
    // 1. Add lensed stars
    finalColor += vec3(0.8, 0.8, 1.0) * starField * (1.0 - step(eventHorizon, r)); // Block stars behind EH
    finalColor *= smoothstep(eventHorizon, eventHorizon + 0.01, r); // Clean EH edge
    
    // 2. Add Accretion Disk
    finalColor += diskColor * diskMask * 1.5;
    
    // 3. Add Photon Sphere
    finalColor += sphereColor;
    
    // 4. Shadow/Darkness of the Event Horizon
    float ehMask = 1.0 - smoothstep(eventHorizon - 0.05, eventHorizon, r);
    finalColor = mix(finalColor, vec3(0.0), ehMask);

    // Atmospheric haze
    finalColor += vec3(0.1, 0.05, 0.0) * exp(-r * 2.0) * 0.3;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const BlackHoleShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1000, 1000) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[15, 15]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
};

export function BlackHole() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <BlackHoleShader />
      </Canvas>
      
      {/* Cinematic overlays */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_20%,_black_90%)] opacity-80" />
      <div className="absolute inset-0 pointer-events-none backdrop-blur-[0.5px] opacity-50" />
      
      {/* Film grain effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
