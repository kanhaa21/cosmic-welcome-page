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

  // Noise function for the disk texture
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Center and scale UVs
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // Black hole shadow
    float shadow = smoothstep(0.38, 0.4, r);
    
    // Accretion disk simulation with gravitational lensing effect
    // We simulate the Interstellar look by calculating two main regions:
    // 1. The horizontal disk (near side)
    // 2. The warped rings (far side bent over/under)

    float disk = 0.0;
    
    // 1. Horizontal Disk approximation
    float diskH = abs(uv.y) - (0.05 * (1.0 + smoothstep(0.4, 1.5, r)));
    if (r > 0.4 && r < 1.8) {
      float intensity = smoothstep(0.1, 0.0, abs(uv.y) / (r * 0.5));
      intensity *= smoothstep(0.4, 0.6, r) * smoothstep(1.8, 1.2, r);
      
      // Texture
      float n = fbm(vec2(r * 5.0 - uTime * 0.5, theta * 3.0));
      disk += intensity * n * 1.5;
    }

    // 2. Gravitational Lensing (The "Halo" around the shadow)
    // This is the far side of the disk appearing as a ring
    float lensingRing = abs(r - 0.55) - 0.08;
    if (lensingRing < 0.0) {
        float intensity = smoothstep(0.08, 0.0, abs(lensingRing));
        // Fade it where the horizontal disk is
        intensity *= smoothstep(0.0, 0.2, abs(uv.y));
        
        float n = fbm(vec2(theta * 5.0 + uTime, r * 10.0));
        disk += intensity * n * 2.0;
    }
    
    // 3. The "Top" and "Bottom" arcs (Vertical bending)
    float arcWidth = 0.15;
    float arcR = 0.7;
    float arcDist = abs(r - arcR);
    if (arcDist < arcWidth) {
        float intensity = smoothstep(arcWidth, 0.0, arcDist);
        // Only show above and below, and far away from the horizontal center
        intensity *= pow(abs(uv.y), 1.5); 
        
        float n = fbm(vec2(theta * 4.0 - uTime * 0.8, r * 8.0));
        disk += intensity * n * 1.8;
    }

    // Colors
    vec3 color = vec3(0.0);
    
    // Core glow (Photon sphere)
    float coreGlow = smoothstep(0.45, 0.35, r) * smoothstep(0.35, 0.4, r) * 2.0;
    color += vec3(1.0, 0.8, 0.5) * coreGlow;

    // Accretion disk colors (Orange/Gold/White)
    vec3 diskColor = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.9, 0.5), disk);
    color += diskColor * disk;
    
    // Final shadow
    color *= shadow;

    // Atmospheric bloom/glow
    color += vec3(0.8, 0.4, 0.1) * (0.05 / (r - 0.35)) * shadow;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const BlackHoleShader = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
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
