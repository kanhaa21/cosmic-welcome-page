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

    // Revolving motion: outer stars move slower, inner move faster
    float rotationSpeed = 0.15 / (r + 0.2);
    float timeRotation = uTime * rotationSpeed;
    
    // SPIRAL CALCULATION
    // Arms wrap around based on radius
    float arms = 2.0;
    float spiral = sin(theta * arms + r * 5.0 - uTime * 0.5);
    spiral = pow(max(0.0, spiral), 3.0);
    
    // FBM for gas/dust details that also rotates
    float revolvingTheta = theta - uTime * 0.2;
    vec2 rotUV = vec2(cos(revolvingTheta), sin(revolvingTheta)) * r;
    float dust = fbm(rotUV * 3.0 + r * 2.0);
    
    // 2. CORE GLOW
    float core = exp(-r * 6.0) * 1.5;
    float glow = exp(-r * 2.0) * 0.3;
    
    // 3. REVOLVING STARS
    float starField = 0.0;
    for(float i = 1.0; i < 5.0; i++) {
        float scale = i * 30.0;
        // Each layer of stars revolves at different speed
        float sTheta = theta + uTime * (0.05 + 0.1 / i) + hash(vec2(i)) * PI;
        vec2 sUV = vec2(cos(sTheta), sin(sTheta)) * r * scale;
        vec2 grid = floor(sUV);
        float h = hash(grid);
        if (h > 0.97) {
            float size = 0.08 * h;
            float dist = length(fract(sUV) - 0.5);
            float star = smoothstep(size, 0.0, dist);
            // Twinkle based on hash and time
            starField += star * h * (sin(uTime * 3.0 + h * 60.0) * 0.5 + 0.5);
        }
    }

    // 4. BRIGHT CENTER STARS
    float centerStars = pow(hash(uv * 100.0), 500.0) * (1.0 - smoothstep(0.0, 1.5, r));

    // COLORS
    vec3 col_core = vec3(1.0, 0.95, 0.85);
    vec3 col_arms = vec3(0.5, 0.3, 0.9); // Purple/Violet
    vec3 col_gas = vec3(0.1, 0.05, 0.3);
    vec3 col_dust = vec3(0.05, 0.02, 0.1);

    vec3 finalColor = col_dust;
    finalColor = mix(finalColor, col_arms, spiral * 0.6);
    finalColor = mix(finalColor, col_gas, dust * 0.4);
    finalColor += col_core * core;
    finalColor += col_core * glow * 0.3;
    finalColor += vec3(1.0) * starField;
    finalColor += vec3(0.9, 0.9, 1.0) * centerStars;

    // Outer vignette-like fade
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

    // Revolving motion: outer stars move slower, inner move faster
    float rotationSpeed = 0.15 / (r + 0.2);
    float timeRotation = uTime * rotationSpeed;
    
    // SPIRAL CALCULATION
    // Arms wrap around based on radius
    float arms = 2.0;
    float spiral = sin(theta * arms + r * 5.0 - uTime * 0.5);
    spiral = pow(max(0.0, spiral), 3.0);
    
    // FBM for gas/dust details that also rotates
    float revolvingTheta = theta - uTime * 0.2;
    vec2 rotUV = vec2(cos(revolvingTheta), sin(revolvingTheta)) * r;
    float dust = fbm(rotUV * 3.0 + r * 2.0);
    
    // 2. CORE GLOW
    float core = exp(-r * 6.0) * 1.5;
    float glow = exp(-r * 2.0) * 0.3;
    
    // 3. REVOLVING STARS
    float starField = 0.0;
    for(float i = 1.0; i < 5.0; i++) {
        float scale = i * 30.0;
        // Each layer of stars revolves at different speed
        float sTheta = theta + uTime * (0.05 + 0.1 / i) + hash(vec2(i)) * PI;
        vec2 sUV = vec2(cos(sTheta), sin(sTheta)) * r * scale;
        vec2 grid = floor(sUV);
        float h = hash(grid);
        if (h > 0.97) {
            float size = 0.08 * h;
            float dist = length(fract(sUV) - 0.5);
            float star = smoothstep(size, 0.0, dist);
            // Twinkle based on hash and time
            starField += star * h * (sin(uTime * 3.0 + h * 60.0) * 0.5 + 0.5);
        }
    }

    // 4. BRIGHT CENTER STARS
    float centerStars = pow(hash(uv * 100.0), 500.0) * (1.0 - smoothstep(0.0, 1.5, r));

    // COLORS
    vec3 col_core = vec3(1.0, 0.95, 0.85);
    vec3 col_arms = vec3(0.5, 0.3, 0.9); // Purple/Violet
    vec3 col_gas = vec3(0.1, 0.05, 0.3);
    vec3 col_dust = vec3(0.05, 0.02, 0.1);

    vec3 finalColor = col_dust;
    finalColor = mix(finalColor, col_arms, spiral * 0.6);
    finalColor = mix(finalColor, col_gas, dust * 0.4);
    finalColor += col_core * core;
    finalColor += col_core * glow * 0.3;
    finalColor += vec3(1.0) * starField;
    finalColor += vec3(0.9, 0.9, 1.0) * centerStars;

    // Outer vignette-like fade
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
