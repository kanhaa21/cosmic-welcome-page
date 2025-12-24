"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let locoScroll: any = null;

    (async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        if (!containerRef.current) return;

        locoScroll = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-reveal",
          getDirection: true,
          reloadOnContextChange: true
        });

        // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        locoScroll.on("scroll", ScrollTrigger.update);

        // Tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element
        ScrollTrigger.scrollerProxy(containerRef.current, {
          scrollTop(value) {
            if (locoScroll) {
              return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
            }
            return 0;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: containerRef.current?.style.transform ? "transform" : "fixed",
        });

        // Each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
        ScrollTrigger.addEventListener("refresh", () => locoScroll?.update());

        // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll
        ScrollTrigger.refresh();
      } catch (error) {
        console.error("Locomotive Scroll initialization failed:", error);
      }
    })();

    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} data-scroll-container className="smooth-scroll">
      {children}
    </main>
  );
}
