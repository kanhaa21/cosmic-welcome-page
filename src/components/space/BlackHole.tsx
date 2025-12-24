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

    // Dynamic rotation speed based on radius
    float rotation = uTime * (0.5 + 0.2 / (r + 0.1));
    float distortedTheta = theta + rotation;

    float disk = 0.0;
    
    // 1. Core Accretion Disk (High Energy)
    float diskThickness = 0.04 * (1.0 + r * 0.5);
    float diskH = abs(uv.y) - diskThickness;
    if (r > 0.38 && r < 2.5) {
      float edgeFade = smoothstep(2.5, 1.5, r) * smoothstep(0.38, 0.5, r);
      float verticalFade = smoothstep(diskThickness * 2.0, 0.0, abs(uv.y));
      
      float n = fbm(vec2(r * 4.0 - uTime * 0.3, distortedTheta * 2.0));
      float strands = pow(fbm(vec2(distortedTheta * 5.0, r * 10.0 + uTime)), 2.0);
      disk += (n * 1.2 + strands * 0.8) * edgeFade * verticalFade;
    }

    // 2. Gravitational Bending (The Top/Bottom Warp)
    float bendR = 0.65;
    float bendDist = abs(r - bendR);
    if (bendDist < 0.3) {
      float bendIntensity = smoothstep(0.3, 0.0, bendDist) * pow(abs(uv.y), 1.2);
      float n = fbm(vec2(distortedTheta * 3.0 - uTime * 0.5, r * 5.0));
      disk += n * bendIntensity * 1.5;
    }

    // 3. Photon Sphere Glow
    float photonSphere = smoothstep(0.42, 0.38, r) * smoothstep(0.35, 0.4, r) * 3.0;
    
    vec3 color = vec3(0.0);
    
    // Intense Golden-Orange Palette from reference
    vec3 col1 = vec3(1.0, 0.9, 0.4); // Brightest
    vec3 col2 = vec3(1.0, 0.4, 0.0); // Mid
    vec3 col3 = vec3(0.4, 0.1, 0.0); // Deep red

    vec3 diskColor = mix(col3, col1, disk);
    color += diskColor * disk * uIntensity;
    color += col1 * photonSphere * uIntensity;

    // Shadow
    float shadow = smoothstep(0.36, 0.38, r);
    color *= shadow;

    // Background stars/dust
    float stars = pow(hash(uv * 500.0), 100.0) * 0.5;
    color += stars * (1.0 - shadow);

    gl_FragColor = vec4(color, 1.0);
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
