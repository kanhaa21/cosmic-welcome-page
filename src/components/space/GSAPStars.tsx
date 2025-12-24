"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function GSAPStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const starCount = 800;
    const speedMultiplier = 1.5;

    class Star {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;

      constructor() {
        this.reset();
        // Distribute stars initially along the Z axis
        this.z = Math.random() * width;
      }

      reset() {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = width;
        this.px = 0;
        this.py = 0;
      }

      update() {
        this.px = ((this.x / this.z) * width) / 2 + width / 2;
        this.py = ((this.y / this.z) * height) / 2 + height / 2;

        this.z -= speedMultiplier;

        if (this.z < 1) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        
        const sx = ((this.x / this.z) * width) / 2 + width / 2;
        const sy = ((this.y / this.z) * height) / 2 + height / 2;

        // Only draw if within bounds
        if (sx < 0 || sx > width || sy < 0 || sy > height) return;

        const size = (1 - this.z / width) * 2;
        const opacity = (1 - this.z / width);

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        // Draw the star head
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw the tail if moving fast enough
        if (this.px !== 0) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
          ctx.lineWidth = size / 2;
          ctx.beginPath();
          ctx.moveTo(this.px, this.py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        }
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      // Create a slight trail effect by not clearing completely
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);
      
      stars.forEach((star) => {
        star.update();
        star.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    // Subtle GSAP speed fluctuation
    gsap.to({ val: speedMultiplier }, {
      val: speedMultiplier * 1.5,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-5] bg-transparent"
    />
  );
}
