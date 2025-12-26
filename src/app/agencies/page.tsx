"use client";

import { agencyData } from "@/lib/agencies";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { NebulaBackground } from "@/components/space/NebulaBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });

export default function AgenciesListing() {
  const agencies = Object.values(agencyData);

  return (
    <div className="bg-[#020205] text-white selection:bg-purple-500/30 min-h-screen overflow-hidden">
      <CustomCursor />
      <Taskbar />
      <NebulaBackground />
      <GSAPStars />

      <SmoothScroll>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
          <header className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-purple-500 font-mono text-xs tracking-[0.5em] uppercase mb-4 block">
                Galactic Hub
              </span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase font-[family-name:var(--font-orbitron)] bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                Space Agencies
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-8" />
              <p className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                The vanguard of human exploration. Explore the organizations shaping our destiny among the stars.
              </p>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {agencies.map((agency, index) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link href={`/agencies/${agency.id}`}>
                  <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-md p-1 transition-all duration-500 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] h-full">
                    {/* Background Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                      style={{ 
                        background: `radial-gradient(circle at 50% 50%, ${agency.accentColor}, transparent 70%)` 
                      }}
                    />

                    <div className="relative p-10 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-12">
                        <div>
                          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-2 group-hover:translate-x-2 transition-transform duration-500">
                            {agency.name}
                          </h2>
                          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                            {agency.fullname}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-zinc-400 leading-relaxed mb-8 line-clamp-3">
                          {agency.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                            <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Budget</span>
                            <span className="text-sm font-medium">{agency.budget.split('(')[0]}</span>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                            <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-widest mb-1">Personnel</span>
                            <span className="text-sm font-medium">{agency.workforce.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {agency.capabilities.slice(0, 3).map((cap, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <footer className="mt-32 text-center py-12 border-t border-white/5">
            <p className="text-zinc-600 text-[10px] font-black tracking-[0.8em] uppercase mb-4">
              Cosmic Explorers Guild
            </p>
            <div className="flex justify-center gap-8">
              <span className="text-zinc-500 text-[10px] font-mono">STATUS: NOMINAL</span>
              <span className="text-zinc-500 text-[10px] font-mono">DATA FEEDS: ACTIVE</span>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </div>
  );
}
