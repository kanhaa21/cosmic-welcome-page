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
    <div 
      ref={glowRef} 
      className="fixed top-0 left-0 w-12 h-12 bg-purple-500/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 blur-2xl mix-blend-screen"
    />
  );
}
