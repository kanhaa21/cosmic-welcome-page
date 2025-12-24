"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GSAPStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: Star[] = [];
    const starCount = 400;

    class Star {
      x: number;
      y: number;
      size: number;
      baseOpacity: number;
      opacity: number;
      speed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        this.baseOpacity = Math.random() * 0.3 + 0.05;
        this.opacity = this.baseOpacity;
        this.speed = Math.random() * 0.05;
      }

      update(mx: number, my: number) {
        this.y -= this.speed;
        if (this.y < 0) this.y = height;

        // Mouse interaction: glow around mouse
        const dx = mx - this.x;
        const dy = my - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const glow = (1 - distance / 150) * 0.8;
          this.opacity = Math.min(1, this.baseOpacity + glow);
          this.size = Math.random() * 2 + 1;
        } else {
          this.opacity = this.baseOpacity;
          this.size = Math.max(0.5, this.size * 0.99);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.update(mouseRef.current.x, mouseRef.current.y);
        star.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    // GSAP twinkle effect for all stars
    gsap.to({}, {
      duration: 2,
      repeat: -1,
      onUpdate: () => {
        stars.forEach(star => {
          if (Math.random() > 0.98) {
            star.opacity = 1;
          }
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-5]"
      style={{ filter: "blur(0.5px)" }}
    />
  );
}
