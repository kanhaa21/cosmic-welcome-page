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
    let resizeObserver: ResizeObserver | null = null;
    let isMounted = true;

    const init = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        
        if (!containerRef.current || !isMounted) return;

        scrollInstance = new LocomotiveScroll({
          el: containerRef.current,
          smooth: true,
          multiplier: 1,
          class: "is-reveal",
          getDirection: true,
          touchMultiplier: 2,
          lerp: 0.1,
          scrollFromAnywhere: true,
        });

        if (!isMounted) {
          scrollInstance.destroy();
          return;
        }

        setLocoScroll(scrollInstance);

        // Tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element
        ScrollTrigger.scrollerProxy(containerRef.current, {
          scrollTop(value) {
            if (scrollInstance) {
              return arguments.length
                ? scrollInstance.scrollTo(value, { duration: 0, disableLerp: true })
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
          // We don't need to specify pinType if we're not pinning, 
          // but if we do, "transform" is generally better for Locomotive Scroll
          pinType: containerRef.current?.style.transform ? "transform" : "fixed",
        });

        // Sync ScrollTrigger with Locomotive Scroll
        scrollInstance.on("scroll", ScrollTrigger.update);

        // Resize Observer to handle dynamic content height changes accurately
        let rafId: number;
        resizeObserver = new ResizeObserver(() => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            if (scrollInstance && isMounted) {
              scrollInstance.update();
              ScrollTrigger.refresh();
            }
          });
        });
        resizeObserver.observe(containerRef.current);

        // Refresh on all ScrollTrigger refreshes
        const refreshHandler = () => {
          if (scrollInstance && isMounted) {
            scrollInstance.update();
          }
        };
        ScrollTrigger.addEventListener("refresh", refreshHandler);

        // Initial refresh
        ScrollTrigger.refresh();
        
      } catch (error) {
        console.error("Locomotive Scroll initialization failed:", error);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (scrollInstance) {
        scrollInstance.destroy();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      ScrollTrigger.removeEventListener("refresh", () => {});
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
