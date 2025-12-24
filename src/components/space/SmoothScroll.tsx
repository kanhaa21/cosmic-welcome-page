"use client";

import { useEffect, useRef, ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scroll: any;
    
    (async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        if (!containerRef.current) return;

        scroll = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-reveal",
        });
        
        // Initial update
        setTimeout(() => {
          scroll.update();
        }, 1000);
        
      } catch (error) {
        console.error("Locomotive Scroll initialization failed:", error);
      }
    })();

    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <main ref={containerRef} data-scroll-container className="smooth-scroll">
      {children}
    </main>
  );
}
