"use client";

import { motion } from "framer-motion";

export const NebulaBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#020205]">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0518_0%,#020205_100%)]" />

      {/* Nebula Clouds */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.15)_0%,transparent_70%)] blur-[100px]"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15)_0%,transparent_70%)] blur-[120px]"
      />

      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-20, 20, -20],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.1)_0%,transparent_50%)] blur-[80px]"
      />

      {/* Distant Star Dust */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
             backgroundSize: '40px 40px' 
           }} 
      />
    </div>
  );
};
