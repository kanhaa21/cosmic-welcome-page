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
  uniform float uIntensity;
  varying vec2 vUv;

  #define PI 3.14159265359

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

    // Revolving motion
    float rotation = uTime * 0.1;
    float distTheta = theta + rotation + r * 2.0; // Spiral effect
    
    vec2 rotUV = vec2(cos(distTheta), sin(distTheta)) * r;

    // 1. GALAXY SPIRAL ARMS
    float spiral = fbm(vec2(r * 3.0, distTheta * 1.5));
    spiral *= exp(-r * 1.5); // Fade towards edges
    
    // 2. CORE GLOW
    float core = exp(-r * 5.0) * 1.5;
    
    // 3. ANIMATED STAR FIELD
    vec2 starUV = uv * 10.0;
    float stars = pow(hash(floor(starUV + uTime * 0.05)), 50.0) * 0.5;
    stars *= fbm(starUV * 0.5 + uTime * 0.1); // Twinkle

    // Random bright stars
    float brightStars = pow(hash(uv * 500.0), 1000.0) * 2.0;
    brightStars *= sin(uTime * 2.0 + hash(uv) * 10.0) * 0.5 + 0.5;

    // COLORS
    vec3 col_core = vec3(1.0, 0.9, 0.7);
    vec3 col_arms = vec3(0.4, 0.2, 0.8);
    vec3 col_dust = vec3(0.1, 0.05, 0.2);

    vec3 finalColor = col_dust * (1.0 - spiral);
    finalColor += col_arms * spiral * 1.5;
    finalColor += col_core * core;
    finalColor += vec3(1.0) * stars;
    finalColor += vec3(0.9, 0.9, 1.0) * brightStars;

    // Add some nebulosity
    float nebula = fbm(uv * 1.5 + uTime * 0.05);
    finalColor += vec3(0.2, 0.1, 0.4) * nebula * exp(-r * 0.8);

    gl_FragColor = vec4(finalColor * uIntensity, 1.0);
  }
`;

const BlackHoleShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(typeof window !== "undefined" ? window.innerWidth : 1000, typeof window !== "undefined" ? window.innerHeight : 1000) },
      uIntensity: { value: 1.0 },
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
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <BlackHoleShader />
      </Canvas>
      
      {/* Post-processing-like CSS overlays for extra mood */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_30%,_black_100%)] opacity-60" />
      <div className="absolute inset-0 pointer-events-none backdrop-blur-[1px]" />
    </div>
  );
}
