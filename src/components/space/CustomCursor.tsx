"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const sparklesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const container = sparklesContainerRef.current;
      if (!container) return;

      let lastTime = 0;
      const throttle = 60; // milliseconds

      const onMouseMove = (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastTime < throttle) return;
        lastTime = now;
        
        createSparkle(e.clientX, e.clientY);
      };

      const onClick = (e: MouseEvent) => {
        createRipple(e.clientX, e.clientY);
      };

      const createSparkle = (x: number, y: number) => {
        const sparkle = document.createElement("div");
        
        const colors = ["bg-purple-400/30", "bg-indigo-400/30", "bg-white/30"];
        const colorClass = colors[Math.floor(Math.random() * colors.length)];
        
        const size = "w-[1px] h-[1px]";
        sparkle.className = `absolute pointer-events-none ${size} rounded-full ${colorClass} blur-[0.1px]`;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        container.appendChild(sparkle);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 12;
        const destinationX = Math.cos(angle) * distance;
        const destinationY = Math.sin(angle) * distance;

        gsap.to(sparkle, {
          x: destinationX,
          y: destinationY,
          opacity: 0,
          scale: 0.1,
          duration: 0.8,
          ease: "power1.out",
          onComplete: () => {
            sparkle.remove();
          },
        });
      };

      const createRipple = (x: number, y: number) => {
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        ripple.style.left = `${x - 10}px`;
        ripple.style.top = `${y - 10}px`;
        ripple.style.width = "20px";
        ripple.style.height = "20px";
        document.body.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onClick);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onClick);
      };
    }, []);


  return (
    <div ref={sparklesContainerRef} className="fixed inset-0 pointer-events-none z-[9998]" />
  );
}
