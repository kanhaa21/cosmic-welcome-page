"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(glow, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
      />
      <div 
        ref={glowRef} 
        className="fixed top-0 left-0 w-8 h-8 bg-purple-500/30 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 blur-lg"
      />
    </>
  );
}
