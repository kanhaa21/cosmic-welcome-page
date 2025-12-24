"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const sparklesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sparklesContainerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      // Create sparkle
      createSparkle(e.clientX, e.clientY);
    };

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div");
      
      // Randomize between different purplish/star colors
      const colors = ["bg-purple-400", "bg-indigo-400", "bg-fuchsia-400", "bg-white"];
      const colorClass = colors[Math.floor(Math.random() * colors.length)];
      
      const size = Math.random() > 0.8 ? "w-1.5 h-1.5" : "w-1 h-1";
      sparkle.className = `absolute pointer-events-none ${size} rounded-full ${colorClass} blur-[0.5px]`;
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      container.appendChild(sparkle);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50;
      const destinationX = Math.cos(angle) * distance;
      const destinationY = Math.sin(angle) * distance;

      gsap.to(sparkle, {
        x: destinationX,
        y: destinationY,
        opacity: 0,
        scale: 0,
        duration: 0.8 + Math.random() * 0.6,
        ease: "power2.out",
        onComplete: () => {
          sparkle.remove();
        },
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={sparklesContainerRef} className="fixed inset-0 pointer-events-none z-[9998]" />
  );
}
