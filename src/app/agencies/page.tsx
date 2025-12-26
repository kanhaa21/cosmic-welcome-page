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

const HUDCorner = ({ className }: { className?: string }) => (
  <div className={`absolute w-6 h-6 pointer-events-none opacity-40 ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white" />
    <div className="absolute top-0 left-0 w-[1px] h-full bg-white" />
  </div>
);

export default function AgenciesListing() {
  const agencies = Object.values(agencyData);

  return (
    <div className="bg-[#020205] text-white selection:bg-purple-500/30 min-h-screen overflow-hidden">
      <CustomCursor />
      <Taskbar />
      <NebulaBackground />
      <GSAPStars count={250} />

      {/* Global HUD Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-10 right-10 text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] text-right">
          NETWORK_STATUS: CONNECTED<br />HUB_ID: GALACTIC_V3
        </div>
      </div>

      <SmoothScroll>
        <div className="max-w-7xl mx-auto px-6 pt-40 pb-40 relative z-10">
          <header className="mb-32 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="flex justify-center items-center gap-4 mb-8">
                 <div className="w-12 h-px bg-purple-500/50" />
                 <span className="text-purple-500 font-mono text-[10px] tracking-[0.8em] uppercase">
                    Vanguard_Of_Exploration
                 </span>
                 <div className="w-12 h-px bg-purple-500/50" />
              </div>
              <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 uppercase font-[family-name:var(--font-orbitron)] leading-none text-white">
                Agencies
              </h1>
              <div className="max-w-2xl mx-auto flex items-start gap-8 text-left border-l border-white/10 pl-8">
                <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase italic leading-relaxed">
                  // GLOBAL DIRECTORY OF ACTIVE SPACE ENTITIES<br />
                  // MAPPING HUMANITY'S INTERPLANETARY INFRASTRUCTURE
                </p>
                <div className="h-20 w-px bg-white/10" />
                <p className="flex-1 text-zinc-400 text-lg font-light leading-relaxed">
                  Access comprehensive dossiers on the organizations shaping our destiny among the stars. From national pioneers to private innovators.
                </p>
              </div>
            </motion.div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {agencies.map((agency, index) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
              >
                <Link href={`/agencies/${agency.id}`}>
                  <div className="group relative rounded-[3rem] border border-white/5 bg-[#050508] p-[1px] transition-all duration-700 hover:scale-[1.02] hover:border-white/20 overflow-hidden">
                    {/* Hover Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
                      style={{ 
                        background: `radial-gradient(circle at 50% 50%, ${agency.accentColor}, transparent 70%)` 
                      }}
                    />

                    <div className="relative p-12 h-full rounded-[2.95rem] bg-black/40 backdrop-blur-3xl flex flex-col min-h-[500px]">
                      <HUDCorner className="top-8 left-8 opacity-20 group-hover:opacity-100 transition-opacity" />
                      <HUDCorner className="bottom-8 right-8 rotate-180 opacity-20 group-hover:opacity-100 transition-opacity" />

                      <div className="flex justify-between items-start mb-16">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: agency.accentColor }} />
                             <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Entity_ID: {agency.id.toUpperCase()}</span>
                          </div>
                          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4 font-[family-name:var(--font-orbitron)] leading-none group-hover:translate-x-4 transition-transform duration-700">
                            {agency.name}
                          </h2>
                          <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-[0.3em] max-w-[200px]">
                            {agency.fullname}
                          </p>
                        </div>
                        <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/40 transition-all duration-700 relative">
                           <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-100 transition-transform duration-700" />
                           <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-white relative z-10" />
                        </div>
                      </div>

                      <div className="flex-1 space-y-12 mb-12">
                        <p className="text-zinc-400 text-xl font-light leading-relaxed line-clamp-3">
                          {agency.description}
                        </p>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
                          <div className="group/meta">
                            <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-3 group-hover/meta:text-white/40 transition-colors">Capital_Resources</span>
                            <span className="text-2xl font-mono text-zinc-100 tracking-tighter" style={{ color: agency.accentColor }}>{agency.budget.split(' ')[0]}</span>
                          </div>
                          <div className="group/meta text-right">
                            <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-3 group-hover/meta:text-white/40 transition-colors">Operational_Personnel</span>
                            <span className="text-2xl font-mono text-zinc-100 tracking-tighter">{agency.workforce.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-auto">
                        {agency.capabilities.map((cap, i) => (
                          <span key={i} className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-200 transition-colors">
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

          <footer className="mt-40 border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <span className="text-zinc-600 text-[10px] font-black tracking-[1em] uppercase">
                Cosmic_Directory_v4
              </span>
              <div className="flex gap-1">
                 {Array.from({ length: 5 }).map((_, i) => (
                   <div key={i} className="w-4 h-1 bg-zinc-800" />
                 ))}
              </div>
            </div>
            <div className="flex gap-12">
              <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                SYSTEM_ACCESS: GRANTED
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
                DATA_ENCRYPTION: AES-256
              </div>
            </div>
          </footer>
        </div>
      </SmoothScroll>
    </div>
  );
}
