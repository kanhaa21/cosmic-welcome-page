"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SolarSystem = dynamic(() => import("./SolarSystem").then(mod => mod.SolarSystem), { ssr: false });

export function PageTransition() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayPath, setDisplayPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== displayPath) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setDisplayPath(pathname);
      }, 1500); // 1.5s loading duration for seamless transition
      return () => clearTimeout(timer);
    }
  }, [pathname, displayPath]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Solar System Loader */}
          <div className="w-full h-full relative flex items-center justify-center">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 pointer-events-none" />
             <SolarSystem />
             
             {/* Loading Text */}
             <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[10px] font-bold uppercase tracking-[0.8em] text-purple-400"
                >
                  Initializing Warp Drive
                </motion.div>
                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
