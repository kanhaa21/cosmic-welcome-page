"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { WelcomeText } from "./WelcomeText";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden z-10" data-scroll-section>
      <motion.div
        style={{ opacity, scale }}
        className="text-center"
      >
        <div className="relative inline-block">
          <div className="absolute -inset-8 bg-purple-500/10 blur-[100px] rounded-full" />
          <WelcomeText />
        </div>
        <p className="mt-8 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide reveal-text">
          Venture into the cosmic abyss where galaxies dance and stars tell stories of eternity. 
          The universe is not just above us, it is within us.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] font-bold">Initiate Descent</span>
        <div className="w-px h-16 bg-gradient-to-b from-purple-500/50 to-transparent relative">
          <motion.div 
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" 
          />
        </div>
      </motion.div>
    </section>
  );
};
