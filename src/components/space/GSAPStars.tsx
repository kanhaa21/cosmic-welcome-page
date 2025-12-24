"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { MotionValue, useMotionValue } from "framer-motion";

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  color: string;
}

export function GSAPStars({ count = 800, speed = 1.5 }: { count?: number, speed?: number | MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#ffffff", "#fff4e6", "#e6f4ff", "#fdf2ff", "#fff9db"];
    
    // Starfield warp logic
    const stars: Star[] = Array.from({ length: Math.min(count, 3000) }, () => {
      const x = (Math.random() - 0.5) * width * 2;
      const y = (Math.random() - 0.5) * height * 2;
      const z = Math.random() * width;
      return {
        x,
        y,
        z,
        prevZ: z,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    const render = () => {
      // Create a slight fade effect for motion trails
      ctx.fillStyle = "rgba(3, 0, 20, 0.2)";
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = "lighter";
      
      const currentSpeed = typeof speed === "number" ? speed : speed.get();
      
      stars.forEach((star) => {
        // Move star closer to the viewer
        star.prevZ = star.z;
        star.z -= currentSpeed * 2;

        // Reset star if it passes the viewer
        if (star.z <= 0) {
          star.z = width;
          star.prevZ = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Project 3D coordinates to 2D
        const px = (star.x / star.z) * (width / 2) + width / 2;
        const py = (star.y / star.z) * (height / 2) + height / 2;

        const prevPx = (star.x / star.prevZ) * (width / 2) + width / 2;
        const prevPy = (star.y / star.prevZ) * (height / 2) + height / 2;

        // Size based on proximity
        const size = (1 - star.z / width) * star.size * 2 + 0.5;
        const opacity = (1 - star.z / width);

        ctx.beginPath();
        ctx.moveTo(prevPx, prevPy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = star.color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.globalAlpha = opacity;
        ctx.stroke();

        // Add a core point for the star
        ctx.beginPath();
        ctx.arc(px, py, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const ticker = () => render();
    gsap.ticker.add(ticker);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach(star => {
        star.z = Math.random() * width;
        star.prevZ = star.z;
      });
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(ticker);
    };
  }, [count, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ filter: "blur(0.5px) contrast(0.9) brightness(0.6)" }}
    />
  );
}
