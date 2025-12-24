"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const agencies = [
  { name: "NASA", path: "/agencies/nasa" },
  { name: "ISRO", path: "/agencies/isro" },
  { name: "ESA", path: "/agencies/esa" },
  { name: "SpaceX", path: "/agencies/spacex" }
];

export function Taskbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-8 py-3 md:py-4 rounded-full border border-white/5 bg-[#030014]/40 backdrop-blur-2xl flex items-center gap-4 md:gap-10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/10 w-[95%] md:w-auto justify-between md:justify-center"
    >
      <Link href="/" className="text-zinc-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-all whitespace-nowrap">
        Nexus
      </Link>
      
      <div className="hidden xs:block h-4 w-px bg-white/5" />
      
      <div className="flex items-center gap-3 md:gap-8 overflow-x-auto no-scrollbar max-w-[50vw] md:max-w-none px-2">
        {agencies.map((agency) => (
          <Link
            key={agency.name}
            href={agency.path}
            className="text-zinc-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-purple-400 transition-all relative group whitespace-nowrap"
          >
            {agency.name}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 transition-all group-hover:w-full" />
          </Link>
        ))}
      </div>
      
      <div className="hidden xs:block h-4 w-px bg-white/5" />
      
      <Link href="#contact" className="text-zinc-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-all whitespace-nowrap">
        Terminal
      </Link>
    </motion.nav>
  );
}
