"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionValue, useTransform } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  baseY: number;
}

interface GSAPStarsProps {
  count?: number;
  speed?: MotionValue<number> | number;
}

export function GSAPStars({ count = 1200, speed = 1 }: GSAPStarsProps) {
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

    const colors = [
      "#ffffff", // Pure white
      "#f0f9ff", // Blueish
      "#fffaf0", // Warm
      "#faf5ff", // Purplish
      "#f5f5f5", // Greyish
    ];
    
    const stars: Star[] = Array.from({ length: count }, () => {
      const p = Math.random();
      let size = 0.2 + Math.random() * 0.5;
      if (p > 0.95) size = 0.8 + Math.random() * 0.6;
      
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      return {
        x,
        y,
        baseY: y,
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1, // Increased visibility
        twinkleSpeed: 0.005 + Math.random() * 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      };
    });

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      
      const currentSpeed = speedRef.current;
      
      stars.forEach((star) => {
        // Subtle drift based on speed
        star.y -= 0.05 * currentSpeed;
        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;

        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = star.opacity * (0.3 + twinkle * 0.7);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();

        if (star.size > 0.8) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentOpacity * 0.4;
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
      
      stars.forEach(star => {
        star.x = (star.x / oldWidth) * width;
        star.y = (star.y / oldHeight) * height;
        star.baseY = (star.baseY / oldHeight) * height;
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
        style={{ filter: "blur(0.3px)" }}
      />
    );
}
