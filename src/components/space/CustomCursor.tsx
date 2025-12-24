"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const sparklesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const container = sparklesContainerRef.current;
    if (!cursor || !container) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      // Create sparkle
      createSparkle(e.clientX, e.clientY);
    };

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div");
      sparkle.className = "absolute pointer-events-none w-1 h-1 rounded-full bg-amber-400";
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      container.appendChild(sparkle);

      const destinationX = x + (Math.random() - 0.5) * 40;
      const destinationY = y + (Math.random() - 0.5) * 40;

      gsap.to(sparkle, {
        x: destinationX - x,
        y: destinationY - y,
        opacity: 0,
        scale: 0,
        duration: 0.6 + Math.random() * 0.4,
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
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 -ml-2 -mt-2 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999]"
      />
      <div ref={sparklesContainerRef} className="fixed inset-0 pointer-events-none z-[9998]" />
    </>
  );
}
