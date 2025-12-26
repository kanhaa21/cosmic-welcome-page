"use client";

import { use, useEffect, useRef, useState } from "react";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { NebulaBackground } from "@/components/space/NebulaBackground";
import { motion, AnimatePresence } from "framer-motion";
import { agencyData } from "@/lib/agencies";
import dynamic from "next/dynamic";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });

export default function AgencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = agencyData[id as keyof typeof agencyData] || agencyData.nasa;

  return (
    <div className="bg-[#020205] text-zinc-300 font-sans selection:bg-purple-500/30 min-h-screen overflow-hidden">
      <CustomCursor />
      <Taskbar />
      <NebulaBackground />
      <GSAPStars />

      {/* Dynamic Nebula Highlight */}
      <div 
        className="fixed inset-0 z-[-1] opacity-30 pointer-events-none blur-[150px]"
        style={{ 
          background: `radial-gradient(circle at 80% 20%, ${data.accentColor} 0%, transparent 50%), radial-gradient(circle at 20% 80%, ${data.accentColor} 0%, transparent 50%)` 
        }}
      />

      {/* Sidebar Navigation */}
      <div className="hidden xl:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-50 text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600">
         <a href="#overview" className="hover:text-white transition-all flex items-center gap-4 group">
           <span className="w-6 h-px bg-zinc-800 group-hover:w-12 group-hover:bg-purple-500 transition-all" /> 01 Overview
         </a>
         <a href="#arsenal" className="hover:text-white transition-all flex items-center gap-4 group">
           <span className="w-6 h-px bg-zinc-800 group-hover:w-12 group-hover:bg-purple-500 transition-all" /> 02 Arsenal
         </a>
         <a href="#projects" className="hover:text-white transition-all flex items-center gap-4 group">
           <span className="w-6 h-px bg-zinc-800 group-hover:w-12 group-hover:bg-purple-500 transition-all" /> 03 Projects
         </a>
         <a href="#milestones" className="hover:text-white transition-all flex items-center gap-4 group">
           <span className="w-6 h-px bg-zinc-800 group-hover:w-12 group-hover:bg-purple-500 transition-all" /> 04 Milestones
         </a>
         <a href="#horizon" className="hover:text-white transition-all flex items-center gap-4 group">
           <span className="w-6 h-px bg-zinc-800 group-hover:w-12 group-hover:bg-purple-500 transition-all" /> 05 Horizon
         </a>
      </div>

      <SmoothScroll key={id}>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
          
          {/* Hero Section */}
          <header id="overview" className="relative mb-40 min-h-[70vh] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="absolute -left-24 top-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none font-[family-name:var(--font-orbitron)]"
            >
              {data.name}
            </motion.div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 font-mono text-[10px] tracking-[0.5em] mb-12"
                style={{ color: data.accentColor }}
              >
                <span className="w-16 h-px bg-current opacity-50" />
                GALACTIC ENTITY DOSSIER // {id.toUpperCase()}
              </motion.div>
              
              <div className="max-w-4xl mb-24">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-8xl md:text-[10rem] font-black text-white tracking-tighter mb-8 uppercase leading-[0.85] font-[family-name:var(--font-orbitron)]"
                >
                  {data.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mb-12"
                >
                  {data.fullname}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-50" />
                  <p className="text-3xl md:text-4xl text-zinc-200 font-light leading-tight italic max-w-2xl">
                    "{data.motto}"
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8">
                  <p className="text-2xl text-zinc-400 leading-relaxed font-light">
                    {data.description}
                  </p>
                </div>
                <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-3">Established</span>
                    <span className="text-white font-mono text-xl">{data.founded.split(',')[1] || data.founded}</span>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-3">Budget</span>
                    <span className="text-white font-mono text-xl">{data.budget.split('(')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Technical Arsenal */}
          <section id="arsenal" className="mb-56">
             <div className="flex items-center gap-8 mb-20">
               <h2 className="text-white text-5xl font-black uppercase tracking-tighter font-[family-name:var(--font-orbitron)]">Technical Arsenal</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                   <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                     style={{ background: `radial-gradient(circle at 50% 50%, ${data.accentColor}, transparent 70%)` }}
                   />
                   <div className="relative">
                      <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-8 block">Operational Capabilities</span>
                      <ul className="space-y-6">
                        {data.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-center gap-6 group/item">
                             <span className="w-2 h-2 rounded-full bg-white/20 group-hover/item:bg-white group-hover/item:scale-150 transition-all duration-300" />
                             <span className="text-lg font-medium text-zinc-300 group-hover/item:text-white transition-colors">{cap}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-16 pt-10 border-t border-white/5 text-sm text-zinc-500 leading-relaxed">
                        {data.technicalOverview}
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                   {data.vehicles.map((v, i) => (
                     <div key={i} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-8">
                           <h4 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform">{v.name}</h4>
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${v.status.includes('Active') || v.status.includes('Operational') ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                              {v.status}
                           </span>
                        </div>
                        <div className="space-y-6">
                           <div>
                              <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-2">Class</span>
                              <span className="text-zinc-300 font-medium">{v.type}</span>
                           </div>
                           <div>
                              <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-2">Capacity</span>
                              <span className="text-xl font-mono text-zinc-400">{v.payload}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Strategic Projects */}
          <section id="projects" className="mb-56">
             <div className="flex items-center gap-8 mb-20">
               <h2 className="text-white text-5xl font-black uppercase tracking-tighter font-[family-name:var(--font-orbitron)]">Strategic Projects</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {data.projects.map((p, i) => (
                  <div key={i} className="group relative p-1 rounded-[3rem] transition-all duration-500 hover:scale-[1.02]">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[3rem] transition-opacity" />
                     <div className="relative p-10 h-full rounded-[2.9rem] bg-black/40 border border-white/5 backdrop-blur-md flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                           <span className="font-mono text-xs opacity-50">{p.year}</span>
                           <div className={`w-3 h-3 rounded-full ${p.status === 'Active' ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse' : 'bg-zinc-800'}`} />
                        </div>
                        <h4 className="text-3xl font-black text-white mb-6 tracking-tighter uppercase">{p.name}</h4>
                        <p className="text-zinc-400 leading-relaxed mb-10 flex-1">{p.description}</p>
                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Phase: {p.status}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Milestones & Timeline */}
          <section id="milestones" className="mb-56">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-4 sticky top-32 h-fit">
                   <h2 className="text-white text-6xl font-black uppercase tracking-tighter mb-10 leading-[0.9] font-[family-name:var(--font-orbitron)]">
                     Historical <br /> Milestones
                   </h2>
                   <div className="w-20 h-2 bg-purple-500 mb-10" />
                   <p className="text-zinc-500 text-lg leading-relaxed font-light">
                     A permanent record of human ingenuity and the relentless pursuit of cosmic knowledge.
                   </p>
                </div>
                
                <div className="lg:col-span-8">
                   <div className="space-y-20 border-l border-white/5 pl-12 ml-6">
                      {data.timeline.map((t, i) => (
                        <div key={i} className="relative group">
                           <div className="absolute -left-[54px] top-2 w-3 h-3 rounded-full bg-zinc-800 border-2 border-white/10 group-hover:bg-purple-500 group-hover:scale-150 transition-all duration-500" />
                           <span className="text-purple-500 font-mono text-sm font-black mb-4 block tracking-widest">{t.year}</span>
                           <h4 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">{t.event}</h4>
                           <p className="text-xl text-zinc-400 leading-relaxed font-light max-w-2xl">{t.detail}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Strategic Horizon */}
          <section id="horizon" className="mb-56 py-32 px-12 md:px-24 rounded-[5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
             <div 
               className="absolute inset-0 opacity-10 pointer-events-none"
               style={{ background: `linear-gradient(45deg, ${data.accentColor} 0%, transparent 100%)` }}
             />
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 mb-24">
                   <div className="max-w-2xl">
                      <span className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6 block">Future Initiatives</span>
                      <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter font-[family-name:var(--font-orbitron)] uppercase">Strategic Horizon</h2>
                   </div>
                   <p className="max-w-xs text-zinc-500 text-sm font-mono tracking-widest uppercase italic">
                     Charting the next century of interplanetary expansion.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                   {data.futurePlans.map((plan, i) => (
                     <div key={i} className="group">
                        <div className="text-white/5 text-8xl font-black mb-8 group-hover:text-white/10 transition-colors">0{i+1}</div>
                        <span className="text-purple-500 font-mono text-xs font-black mb-4 block tracking-widest">EST: {plan.timeframe}</span>
                        <h4 className="text-3xl font-black text-white mb-6 tracking-tighter uppercase">{plan.title}</h4>
                        <p className="text-zinc-400 text-lg leading-relaxed font-light">{plan.description}</p>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Footer Metadata */}
          <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] text-zinc-600 font-mono tracking-[0.5em] uppercase" data-scroll-section>
             <div className="flex items-center gap-6">
                <span className="w-12 h-px bg-zinc-800" />
                ARCHIVE: {data.name} // GEN-4 DATASET
             </div>
             <div className="flex gap-12">
                <span>UPDATED: {new Date().toLocaleDateString()}</span>
                <span className="text-green-500/50">LINK STATUS: ACTIVE</span>
             </div>
          </footer>

        </div>
      </SmoothScroll>
    </div>
  );
}
