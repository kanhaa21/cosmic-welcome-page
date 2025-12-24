"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label: string;
  color?: string;
}

export function SectionDivider({ label, color = "purple-500" }: SectionDividerProps) {
  return (
    <div className="relative w-full py-24 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Background Glow */}
      <div className={`absolute left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-${color}/20 blur-xl`} />
      
      <div className="flex items-center gap-6 w-full max-w-7xl px-4 md:px-20">
        {/* Left Line */}
        <div className="relative flex-1 h-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-zinc-500" />
          <motion.div
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-${color}/50 to-${color}`}
          />
          {/* Animated Spark */}
          <motion.div
            animate={{ 
              x: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className={`absolute top-1/2 -translate-y-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent`}
          />
        </div>

        {/* Center Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className={`w-1 h-1 rounded-full bg-${color} mb-3 shadow-[0_0_8px_rgba(168,85,247,0.8)]`} />
          <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] text-zinc-500 whitespace-nowrap`}>
            {label}
          </span>
        </motion.div>

        {/* Right Line */}
        <div className="relative flex-1 h-[1px]">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-zinc-800 to-zinc-500" />
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className={`absolute inset-0 bg-gradient-to-l from-transparent via-${color}/50 to-${color}`}
          />
          {/* Animated Spark */}
          <motion.div
            animate={{ 
              x: ["100%", "-100%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className={`absolute top-1/2 -translate-y-1/2 w-20 h-[1px] bg-gradient-to-l from-transparent via-white to-transparent`}
          />
        </div>
      </div>
    </div>
  );
}
