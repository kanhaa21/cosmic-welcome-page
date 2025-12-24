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

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    float r = length(uv);
    float theta = atan(uv.y, uv.x);

    // BLACK HOLE CORE
    float eventHorizon = 0.08;
    float lensedR = r;
    
    // GRAVITATIONAL LENSING WARP
    if (r > eventHorizon) {
      lensedR = r * (1.0 - eventHorizon / (r * r + 0.1));
    }

    // STAR VORTEX
    vec3 starColor = vec3(0.0);

    for(float i = 1.0; i < 8.0; i++) {
        float inwardSpeed = 0.1 * i;
        float rotationSpeed = 0.3 + (0.5 / (lensedR + 0.05));
        
        // Dynamic radial position
        float t = uTime * inwardSpeed + i * 1.5;
        float rOffset = fract(t);
        float virtualR = lensedR + rOffset * 2.5;
        
        // Spiral motion
        float virtualTheta = theta + uTime * rotationSpeed + virtualR * 3.0;
        
        // Star sampling
        vec2 starUV = vec2(virtualR, virtualTheta / (2.0 * PI)) * (20.0 + i * 2.0);
        vec2 g = floor(starUV);
        vec2 f = fract(starUV);
        
        float h = hash(g + i * 9.0);
        if (h > 0.94) {
            float distToCenter = smoothstep(0.0, 0.4, lensedR);
            float starSize = (0.08 + h * 0.1) * smoothstep(0.0, 0.1, lensedR);
            float star = smoothstep(starSize, 0.0, length(f - 0.5));
            
            // Brighten and color shift as they get closer
            vec3 col = mix(vec3(1.0, 0.4, 0.1), vec3(0.7, 0.8, 1.0), h);
            float brightness = (1.0 - rOffset) * (1.5 / (lensedR + 0.5));
            
            starColor += col * star * brightness * distToCenter;
        }
    }

    // CENTRAL SINGULARITY GLOW
    float centerGlow = exp(-(lensedR - eventHorizon) * 20.0) * step(eventHorizon, r);
    vec3 glowCol = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.8, 0.2), 0.5 + 0.5 * sin(uTime * 2.0));
    
    // ACCRETION STREAKS (Subtle flow)
    float streaks = pow(abs(sin(theta * 2.0 - uTime * 3.0 + 1.5/lensedR)), 30.0) * exp(-lensedR * 4.0);

    vec3 finalColor = starColor;
    finalColor += glowCol * centerGlow * 2.0;
    finalColor += glowCol * streaks * 0.5;
    
    // Event Horizon Shadow (The Void)
    finalColor *= smoothstep(eventHorizon, eventHorizon + 0.01, r);
    
    // Vignette
    finalColor *= smoothstep(2.2, 0.4, r);

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
