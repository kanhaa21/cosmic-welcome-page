"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionValue } from "framer-motion";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  opacity: number;
}

interface GSAPStarsProps {
  count?: number;
  speed?: MotionValue<number> | number;
}

export function GSAPStars({ count = 1500, speed = 1 }: GSAPStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedRef = useRef(typeof speed === "number" ? speed : 1);

  useEffect(() => {
    if (typeof speed !== "number") {
      return speed.on("change", (latest) => {
        speedRef.current = latest;
      });
    }
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let centerX = width / 2;
    let centerY = height / 2;

    const colors = [
      "#ffffff", // Pure white
      "#f0f9ff", // Blueish
      "#fffaf0", // Warm
      "#faf5ff", // Purplish
    ];
    
    // 3D Starfield implementation
    const stars: Star[] = Array.from({ length: count }, () => {
      return {
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 2000,
        size: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.2 + 0.1
      };
    });

    const render = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"; // Fully clear each frame or use very low trail
      ctx.fillRect(0, 0, width, height);
      
      const currentSpeed = speedRef.current;
      const fov = 200;

      stars.forEach((star) => {
        // Move towards screen
        star.z -= 0.5 * currentSpeed * 2;
        
        // Reset star if it passes the screen or gets too far
        if (star.z <= 0) {
          star.z = 2000;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        // Project 3D to 2D
        const k = fov / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        // Only draw if within bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const s = (1 - star.z / 2000) * 3;
          const currentOpacity = (1 - star.z / 2000) * star.opacity;

          ctx.beginPath();
          ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();

          // Add a small trail for fast moving stars
          if (currentSpeed > 4) {
             ctx.beginPath();
             ctx.moveTo(px, py);
             const trailK = fov / (star.z + currentSpeed * 5);
             const tx = star.x * trailK + centerX;
             const ty = star.y * trailK + centerY;
             ctx.lineTo(tx, ty);
             ctx.strokeStyle = star.color;
             ctx.lineWidth = s * 0.5;
             ctx.globalAlpha = currentOpacity * 0.5;
             ctx.stroke();
          }
        }
      });
    };

    const ticker = () => render();
    gsap.ticker.add(ticker);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
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
      style={{ filter: "blur(0.2px)" }}
    />
  );
}
