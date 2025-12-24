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
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl flex items-center gap-8 shadow-2xl"
    >
      <Link href="/" className="text-white font-medium hover:text-purple-400 transition-colors">
        Home
      </Link>
      
      <div className="h-4 w-px bg-white/10" />
      
      <div className="flex items-center gap-6">
        {agencies.map((agency) => (
          <Link
            key={agency.name}
            href={agency.path}
            className="text-zinc-400 text-sm font-medium hover:text-white transition-colors"
          >
            {agency.name}
          </Link>
        ))}
      </div>
      
      <div className="h-4 w-px bg-white/10" />
      
      <Link href="#contact" className="text-white font-medium hover:text-purple-400 transition-colors">
        Contact Us
      </Link>
    </motion.nav>
  );
}
