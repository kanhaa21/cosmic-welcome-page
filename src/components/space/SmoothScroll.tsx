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

    // Small delay to ensure Next.js has finished initial hydration
    const timeoutId = setTimeout(async () => {
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
          // Disable reloadOnContextChange as it can cause issues in React
          reloadOnContextChange: false,
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
          pinType: containerRef.current?.style.transform ? "transform" : "fixed",
        });

        // Sync ScrollTrigger with Locomotive Scroll
        scrollInstance.on("scroll", ScrollTrigger.update);

        // Resize Observer with debounced RAF
        let rafId: number;
        resizeObserver = new ResizeObserver(() => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            if (scrollInstance && isMounted) {
              try {
                scrollInstance.update();
                ScrollTrigger.refresh();
              } catch (e) {
                // Silently handle errors during update if the DOM is in a weird state
              }
            }
          });
        });
        resizeObserver.observe(containerRef.current);

        // Initial refresh
        ScrollTrigger.refresh();
        
      } catch (error) {
        console.error("Locomotive Scroll initialization failed:", error);
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (scrollInstance) {
        scrollInstance.destroy();
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      // Clean up ScrollTrigger proxy
      if (containerRef.current) {
        ScrollTrigger.scrollerProxy(containerRef.current, null);
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
