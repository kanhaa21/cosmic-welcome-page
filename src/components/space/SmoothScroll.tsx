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
          lerp: 0.08, // Slightly smoother lerp
          scrollFromAnywhere: true,
          reloadOnContextChange: false,
          resetNativeScroll: true
        });

        if (!isMounted) {
          scrollInstance.destroy();
          return;
        }

        setLocoScroll(scrollInstance);

          // Tell ScrollTrigger to use these proxy methods (getter/setter) for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
          ScrollTrigger.scrollerProxy(containerRef.current, {
            scrollTop(value) {
              if (scrollInstance && scrollInstance.scroll && scrollInstance.scroll.instance) {
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
            // LocomotiveScroll handles things with transforms
            pinType: containerRef.current.style.transform ? "transform" : "fixed",
          });

          scrollInstance.on("scroll", () => {
            ScrollTrigger.update();
          });

          let rafId: number;
          resizeObserver = new ResizeObserver(() => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              if (scrollInstance && isMounted && containerRef.current) {
                try {
                  scrollInstance.update();
                  ScrollTrigger.refresh();
                } catch (e) {
                  // Silent catch for potential race conditions during destruction
                }
              }
            });
          });
          resizeObserver.observe(containerRef.current);

          // Force a refresh after a small delay to ensure all components are rendered
          setTimeout(() => {
            if (isMounted) {
              ScrollTrigger.refresh();
              window.dispatchEvent(new Event('resize'));
            }
          }, 500);
        
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
      if (containerRef.current) {
        ScrollTrigger.scrollerProxy(containerRef.current, null);
      }
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scroll: locoScroll }}>
      {fixedChildren}
      <main ref={containerRef} data-scroll-container className="smooth-scroll">
        {children}
      </main>
    </SmoothScrollContext.Provider>
  );
}
