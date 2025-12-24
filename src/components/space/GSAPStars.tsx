"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  glow: boolean;
}

export function GSAPStars({ count = 2000 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#ffffff", "#fff4e6", "#e6f4ff", "#fdf2ff", "#fff9db"];
    
    const stars: Star[] = Array.from({ length: Math.min(count, 5000) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      twinkleSpeed: 1 + Math.random() * 3,
      glow: Math.random() > 0.8,
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      
      stars.forEach((star, i) => {
        // Calculate twinkle based on time and star's unique offset
        const twinkle = Math.sin(time * star.twinkleSpeed + i) * 0.5 + 0.5;
        const currentOpacity = star.opacity * (0.3 + twinkle * 0.7);
        const currentSize = star.size * (0.8 + twinkle * 0.2);

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        
        if (star.glow && currentOpacity > 0.5) {
          ctx.shadowBlur = 10 * currentOpacity;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const ticker = () => render(gsap.ticker.time);
    gsap.ticker.add(ticker);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach(star => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
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
      style={{ filter: "contrast(1.2) brightness(1.2)" }}
    />
  );
}
