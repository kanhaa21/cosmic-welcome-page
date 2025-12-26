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
  twinklePhase: number;
  twinkleSpeed: number;
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
      "#fef08a", // Yellow 200
      "#fde047", // Yellow 400
      "#d8b4fe", // Purple 300
      "#c084fc", // Purple 500
      "#e0f2fe", // Blue 100
    ];
    
    // 3D Starfield implementation
    const stars: Star[] = Array.from({ length: count }, () => {
        const colorWeight = Math.random();
        let color = colors[0];
        if (colorWeight > 0.85) color = colors[1]; // Yellow 200
        else if (colorWeight > 0.95) color = colors[2]; // Yellow 400
        else if (colorWeight > 0.7) color = colors[3]; // Purple 300
        else if (colorWeight > 0.8) color = colors[4]; // Purple 500
        else if (colorWeight > 0.6) color = colors[5]; // Blue 100

        return {
          x: (Math.random() - 0.5) * 3000,
          y: (Math.random() - 0.5) * 3000,
          z: Math.random() * 2000,
          size: Math.random() * 2 + 0.5,
          color,
          opacity: Math.random() * 0.5 + 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.015 + 0.005 // Faster twinkling
        };
    });

    let backgroundStars: Star[] = [];
    const initBackgroundStars = (w: number, h: number) => {
      backgroundStars = Array.from({ length: 1000 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0,
        size: Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.01 + 0.002
      }));
    };

    initBackgroundStars(width, height);

    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      
      const currentSpeed = speedRef.current;
      const fov = 250;
      const time = Date.now();

      // Draw distant background stars first
      backgroundStars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity * (0.3 + twinkle * 0.7);
        ctx.fill();
      });

      stars.forEach((star) => {
        // Move towards screen
        star.z -= 0.5 * currentSpeed * 1.5;
        
        // Reset star if it passes the screen or gets too far
        if (star.z <= 0) {
          star.z = 2000;
          star.x = (Math.random() - 0.5) * 3000;
          star.y = (Math.random() - 0.5) * 3000;
        }

        // Project 3D to 2D
        const k = fov / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        // Only draw if within bounds
        if (px >= -100 && px <= width + 100 && py >= -100 && py <= height + 100) {
          const s = (1 - star.z / 2000) * 3.5;
          
          // More pronounced radial fade for better readability of center content
          const distFromCenter = Math.sqrt(Math.pow(px - centerX, 2) + Math.pow(py - centerY, 2));
            const fadeRadius = Math.min(width, height) * 1.4; 
            const centerFade = Math.pow(Math.min(distFromCenter / fadeRadius, 1), 6);
          
          // Twinkle effect
          const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
          const currentOpacity = (1 - star.z / 2000) * star.opacity * centerFade * (0.4 + twinkle * 0.6);

          ctx.beginPath();
          ctx.arc(px, py, s, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();

          // Outer glow for brighter stars
          if (star.size > 1.5 && currentOpacity > 0.5) {
            ctx.beginPath();
            ctx.arc(px, py, s * 2, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = currentOpacity * 0.2;
            ctx.fill();
          }

            // Add a small trail for fast moving stars
            if (currentSpeed > 5) {
               ctx.beginPath();
               ctx.moveTo(px, py);
                 const trailK = fov / (star.z + currentSpeed * 0.05);
               const tx = star.x * trailK + centerX;
               const ty = star.y * trailK + centerY;
               ctx.lineTo(tx, ty);
               ctx.strokeStyle = star.color;
               ctx.lineWidth = s * 0.3;
               ctx.globalAlpha = currentOpacity * 0.3;
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
      className="fixed inset-0 pointer-events-none z-[-2]"
      style={{ filter: "blur(0.2px)" }}
    />
  );
}
