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

  // Galaxy-like spiral noise
  float spiral(vec2 uv, float t) {
    float r = length(uv);
    float a = atan(uv.y, uv.x);
    return fbm(vec2(r * 4.0 - t * 0.2, a * 3.0 + r * 8.0));
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // EXTREME GRAVITATIONAL LENSING
    // Pulls background coordinates towards the center
    float lensFactor = 1.0 / (r + 0.001);
    vec2 warpedUV = uv * (1.0 + 0.2 * pow(lensFactor, 0.8));
    
    // Rotation speed increases near the center
    float rotation = uTime * (0.2 + 0.3 / (r + 0.05));
    float distTheta = theta + rotation;
    vec2 rotUV = vec2(cos(distTheta), sin(distTheta)) * r;

    // 1. THE ENGULFED GALAXY (Background)
    float galaxy = spiral(warpedUV * 0.5, uTime * 0.1);
    galaxy *= smoothstep(0.35, 1.5, r); // Fade out near event horizon
    vec3 galaxyColor = mix(vec3(0.1, 0.05, 0.2), vec3(0.6, 0.3, 0.8), galaxy);
    galaxyColor += vec3(0.1, 0.2, 0.5) * fbm(warpedUV * 2.0 + uTime * 0.05);

    // 2. THE ACCRETION DISK (Engulfing Matter)
    float disk = 0.0;
    float diskThickness = 0.05 * (1.0 + r * 1.5);
    
    // Main Disk
    if (r > 0.35 && r < 4.0) {
      float edgeFade = smoothstep(4.0, 1.0, r) * smoothstep(0.35, 0.5, r);
      float verticalFade = smoothstep(diskThickness, 0.0, abs(uv.y));
      
      float n = fbm(vec2(r * 3.0 - uTime * 0.5, distTheta * 4.0));
      // Spaghetti-fication streaks
      float streaks = pow(fbm(vec2(distTheta * 10.0, r * 2.0 + uTime * 0.8)), 3.0);
      disk += (n * 1.5 + streaks * 2.0) * edgeFade * verticalFade;
    }

    // 3. GRAVITATIONAL WARP (Top/Bottom Arcs)
    float arcR = 0.7;
    float arcDist = abs(r - arcR);
    if (arcDist < 0.4) {
      float arcIntensity = smoothstep(0.4, 0.0, arcDist) * pow(abs(uv.y), 1.5);
      float n = fbm(vec2(distTheta * 3.0 - uTime * 0.4, r * 4.0));
      disk += n * arcIntensity * 2.5;
    }

    // 4. THE EVENT HORIZON & PHOTON SPHERE
    float photonSphere = smoothstep(0.4, 0.37, r) * smoothstep(0.32, 0.38, r) * 5.0;
    
    // COLORS
    vec3 col_inner = vec3(1.0, 0.95, 0.8); // White-hot
    vec3 col_mid = vec3(1.0, 0.5, 0.1);   // Orange
    vec3 col_outer = vec3(0.5, 0.1, 0.0); // Deep red/Purple
    
    vec3 diskColor = mix(col_outer, col_inner, disk * 0.5);
    diskColor = mix(diskColor, col_mid, pow(disk, 2.0));

    vec3 finalColor = galaxyColor * 0.4;
    finalColor += diskColor * disk * uIntensity;
    finalColor += col_inner * photonSphere * uIntensity;

    // BLACK HOLE SHADOW
    float shadow = smoothstep(0.35, 0.36, r);
    finalColor *= shadow;

    // SPATIOTEMPORAL DISTORTION (Glitchy light)
    float glitch = pow(hash(vec2(uTime * 10.0, r)), 50.0);
    finalColor += col_mid * glitch * disk * 0.5;

    gl_FragColor = vec4(finalColor, 1.0);
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
