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
    
    // THE ENGULFING HOLE
    // Growing and pulsating hole
    float holeExpansion = 0.5 + sin(uTime * 0.2) * 0.2;
    float holeSize = holeExpansion;
    
    // Distort galaxy UVs towards the hole
    float distortion = smoothstep(2.5, holeSize, r);
    vec2 distortedUV = uv * (1.0 + distortion * 0.5);
    float dr = length(distortedUV);
    float dtheta = atan(distortedUV.y, distortedUV.x);

    // Revolving motion: outer stars move slower, inner move faster
    float rotationSpeed = 0.15 / (dr + 0.2);
    
    // SPIRAL CALCULATION
    float arms = 2.0;
    float spiral = sin(dtheta * arms + dr * 5.0 - uTime * 0.5);
    spiral = pow(max(0.0, spiral), 3.0);
    
    // FBM for gas/dust details
    float revolvingTheta = dtheta - uTime * 0.2;
    vec2 rotUV = vec2(cos(revolvingTheta), sin(revolvingTheta)) * dr;
    float dust = fbm(rotUV * 3.0 + dr * 2.0);
    
    // CORE GLOW (Galaxy center)
    float core = exp(-dr * 6.0) * 1.5;
    float glow = exp(-dr * 2.0) * 0.3;
    
    // REVOLVING STARS
    float starField = 0.0;
    for(float i = 1.0; i < 5.0; i++) {
        float scale = i * 30.0;
        float sTheta = dtheta + uTime * (0.05 + 0.1 / i) + hash(vec2(i)) * PI;
        vec2 sUV = vec2(cos(sTheta), sin(sTheta)) * dr * scale;
        vec2 grid = floor(sUV);
        float h = hash(grid);
        if (h > 0.97) {
            float size = 0.08 * h;
            float dist = length(fract(sUV) - 0.5);
            float star = smoothstep(size, 0.0, dist);
            starField += star * h * (sin(uTime * 3.0 + h * 60.0) * 0.5 + 0.5);
        }
    }

    // BRIGHT CENTER STARS
    float centerStars = pow(hash(distortedUV * 100.0), 500.0) * (1.0 - smoothstep(0.0, 1.5, dr));

    // COLORS
    vec3 col_core = vec3(1.0, 0.95, 0.85);
    vec3 col_arms = vec3(0.5, 0.3, 0.9);
    vec3 col_gas = vec3(0.1, 0.05, 0.3);
    vec3 col_dust = vec3(0.05, 0.02, 0.1);

    vec3 galaxyColor = col_dust;
    galaxyColor = mix(galaxyColor, col_arms, spiral * 0.6);
    galaxyColor = mix(galaxyColor, col_gas, dust * 0.4);
    galaxyColor += col_core * core;
    galaxyColor += col_core * glow * 0.3;
    galaxyColor += vec3(1.0) * starField;
    galaxyColor += vec3(0.9, 0.9, 1.0) * centerStars;

    // THE HOLE EFFECT (Yellow/Redish)
    float holeEdge = smoothstep(holeSize + 0.4, holeSize, r);
    float voidMask = smoothstep(holeSize, holeSize - 0.1, r);
    
    vec3 holeColor = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.8, 0.0), noise(uv * 2.0 + uTime * 0.5));
    float holeGlow = exp(-(r - holeSize) * 4.0) * step(holeSize, r);
    
    vec3 finalColor = mix(galaxyColor, vec3(0.0), voidMask);
    finalColor += holeColor * holeGlow * 1.2;
    
    // Add "weird" noise to the hole edge
    float edgeNoise = fbm(uv * 5.0 + uTime * 0.3);
    finalColor += holeColor * edgeNoise * holeGlow * 0.5;

    // Outer vignette
    finalColor *= smoothstep(2.5, 0.5, r);

    gl_FragColor = vec4(finalColor * uIntensity, 1.0);
  }
`;

const BlackHoleShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(typeof window !== "undefined" ? window.innerWidth : 1000, typeof window !== "undefined" ? window.innerHeight : 1000) },
      uIntensity: { value: 0.5 },
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
