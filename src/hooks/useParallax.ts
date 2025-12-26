"use client";

import { useState, useEffect, useCallback } from "react";

interface ParallaxOffset {
  x: number;
  y: number;
}

export function useParallax(intensity = 1, disabled = false) {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    if (disabled) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let idleTimer: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(idleTimer);
      setIsIdle(false);

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) / (innerWidth / 2) * intensity;
      const y = (clientY - innerHeight / 2) / (innerHeight / 2) * intensity;
      
      setOffset({ x, y });

      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, [intensity, disabled]);

  return isIdle ? { x: 0, y: 0 } : offset;
}
