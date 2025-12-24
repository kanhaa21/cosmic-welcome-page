"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const secondaryGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const secondaryGlow = secondaryGlowRef.current;
    if (!glow || !secondaryGlow) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(secondaryGlow, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={glowRef} 
        className="fixed top-0 left-0 w-12 h-12 bg-purple-500/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 blur-xl mix-blend-screen"
      />
      <div 
        ref={secondaryGlowRef} 
        className="fixed top-0 left-0 w-24 h-24 bg-purple-600/10 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 blur-3xl mix-blend-screen"
      />
    </>
  );
}
