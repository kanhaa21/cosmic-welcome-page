"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function GSAPStars({ count = 1200 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "#ffffff", // Pure white
      "#f0f9ff", // Blueish
      "#fffaf0", // Warm
      "#faf5ff", // Purplish
      "#f5f5f5", // Greyish
    ];
    
    // Create static stars with random properties
    const stars: Star[] = Array.from({ length: count }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 0.8 + 0.1, // Very small stars
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1, // Dim opacity
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      };
    });

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach((star) => {
        // Calculate twinkling effect using sine wave
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = star.opacity * (0.4 + twinkle * 0.6);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();

        // Optional very subtle glow for slightly larger stars
        if (star.size > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 1.5);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentOpacity * 0.3;
          ctx.fill();
        }
      });
    };

    const ticker = () => render();
    gsap.ticker.add(ticker);

    const handleResize = () => {
      const oldWidth = width;
      const oldHeight = height;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Re-distribute stars on resize to fill the screen
      stars.forEach(star => {
        star.x = (star.x / oldWidth) * width;
        star.y = (star.y / oldHeight) * height;
      });
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(ticker);
    };
  }, [count]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: "blur(0.4px)" }} // Add a tiny bit of soft focus
    />
  );
}
