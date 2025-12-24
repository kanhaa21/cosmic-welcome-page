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

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        
        if (star.glow) {
          ctx.shadowBlur = 10 * star.opacity;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    // Use GSAP to animate star properties
    const timelines: gsap.core.Tween[] = [];
    
    stars.forEach((star) => {
      const tween = gsap.to(star, {
        opacity: star.opacity * 0.2,
        size: star.size * 0.5,
        duration: star.twinkleSpeed,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 5,
      });
      timelines.push(tween);
    });

    const ticker = () => render();
    gsap.ticker.add(ticker);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-position stars proportionally or just redraw
      stars.forEach(star => {
        star.x = Math.random() * width;
        star.y = Math.random() * height;
      });
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(ticker);
      timelines.forEach(t => t.kill());
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
