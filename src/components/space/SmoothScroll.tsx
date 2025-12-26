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

export function SmoothScroll({ children, fixedChildren }: { children: ReactNode, fixedChildren?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [locoScroll, setLocoScroll] = useState<any>(null);

    useEffect(() => {
      let scrollInstance: any = null;
      let resizeObserver: ResizeObserver | null = null;
      let isMounted = true;

      // Use a stable reference for the refresh handler to avoid leaks
      const handleRefresh = () => {
        if (scrollInstance && !scrollInstance.destroyed) {
          scrollInstance.update();
        }
      };

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
            reloadOnContextChange: false,
            resetNativeScroll: true
          });

          if (!isMounted) {
            scrollInstance.destroy();
            return;
          }

          // Set up scroller proxy for GSAP
          ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
              if (scrollInstance && !scrollInstance.destroyed) {
                return arguments.length
                  ? scrollInstance.scrollTo(value, 0, 0)
                  : (scrollInstance.scroll.instance ? scrollInstance.scroll.instance.scroll.y : 0);
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
            // Improved pinType detection: only use transform if locomotive is actually moving the container
            pinType: containerRef.current!.style.transform ? "transform" : "fixed",
          });

          scrollInstance.on("scroll", ScrollTrigger.update);

          // Update ScrollTrigger on refresh
          ScrollTrigger.addEventListener("refresh", handleRefresh);
          ScrollTrigger.refresh();

          setLocoScroll(scrollInstance);

          // Resize handling with debounce to prevent excessive updates and race conditions
          let resizeTimer: NodeJS.Timeout;
          resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              if (scrollInstance && !scrollInstance.destroyed && isMounted) {
                scrollInstance.update();
                ScrollTrigger.refresh();
              }
            }, 100);
          });
          resizeObserver.observe(containerRef.current);

        } catch (error) {
          console.error("Locomotive Scroll initialization failed:", error);
        }
      };

      // Small delay to ensure DOM is ready and hydrated
      const timeoutId = setTimeout(init, 100);

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
        
        ScrollTrigger.removeEventListener("refresh", handleRefresh);
        
        if (scrollInstance) {
          scrollInstance.destroy();
          scrollInstance.destroyed = true; // Flag for safety
        }
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, []);

  return (
    <SmoothScrollContext.Provider value={{ scroll: locoScroll }}>
      {fixedChildren}
      <main ref={containerRef} data-scroll-container className="smooth-scroll relative">
        {children}
      </main>
    </SmoothScrollContext.Provider>
  );
}
