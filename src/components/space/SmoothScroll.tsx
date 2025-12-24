"use client";

import { useEffect, useRef, ReactNode, createContext, useContext, useState } from "react";

interface SmoothScrollContextType {
  scroll: any | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ scroll: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [locoScroll, setLocoScroll] = useState<any>(null);

  useEffect(() => {
    let scrollInstance: any = null;
    
    (async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        if (!containerRef.current) return;

        scrollInstance = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-reveal",
          lerp: 0.1,
          touchMultiplier: 2,
        });

        setLocoScroll(scrollInstance);
        
        // Initial update
        setTimeout(() => {
          scrollInstance.update();
        }, 1000);
        
      } catch (error) {
        console.error("Locomotive Scroll initialization failed:", error);
      }
    })();

    return () => {
      if (scrollInstance) {
        scrollInstance.destroy();
      }
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scroll: locoScroll }}>
      <main ref={containerRef} data-scroll-container className="smooth-scroll">
        {children}
      </main>
    </SmoothScrollContext.Provider>
  );
}
