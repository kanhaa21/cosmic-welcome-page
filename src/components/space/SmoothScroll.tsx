"use client";

import { useEffect, useRef, ReactNode, createContext, useContext, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
          getDirection: true,
          reloadOnContextChange: true
        });

        setLocoScroll(scrollInstance);

        // Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        scrollInstance.on("scroll", ScrollTrigger.update);

        // Tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element
        ScrollTrigger.scrollerProxy(containerRef.current, {
          scrollTop(value) {
            if (scrollInstance) {
              return arguments.length
                ? scrollInstance.scrollTo(value, 0, 0)
                : scrollInstance.scroll.instance.scroll.y;
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
        ScrollTrigger.addEventListener("refresh", () => scrollInstance?.update());

        // After everything is set up, refresh() ScrollTrigger and update LocomotiveScroll
        ScrollTrigger.refresh();
      } catch (error) {
        console.error("Locomotive Scroll initialization failed:", error);
      }
    })();

    return () => {
      if (scrollInstance) scrollInstance.destroy();
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
