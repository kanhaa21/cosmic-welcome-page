"use client";

import { use, useEffect, useState } from "react";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { NebulaBackground } from "@/components/space/NebulaBackground";
import { motion, AnimatePresence } from "framer-motion";
import { agencyData } from "@/lib/agencies";
import dynamic from "next/dynamic";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });

const HUDCorner = ({ className }: { className?: string }) => (
  <div className={`absolute w-6 h-6 pointer-events-none opacity-40 ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-white" />
    <div className="absolute top-0 left-0 w-[1px] h-full bg-white" />
  </div>
);

const DataLine = ({ label, value, color }: { label: string; value: string; color?: string }) => (
  <div className="flex items-center gap-4 py-1.5 border-b border-white/5 group">
    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest min-w-[90px]">{label}</span>
    <span className="h-px flex-1 bg-white/5 group-hover:bg-white/10 transition-colors" />
    <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors uppercase" style={{ color: color }}>{value}</span>
  </div>
);

const MetricCard = ({ label, value, trend, color }: { label: string; value: string; trend?: string; color: string }) => (
  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md relative group overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-2 group-hover:text-white/40 transition-colors">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-black tracking-tighter text-white font-[family-name:var(--font-orbitron)]" style={{ color }}>{value}</span>
      {trend && (
        <span className={`text-[8px] font-mono ${trend === 'up' ? 'text-green-500' : 'text-orange-500'}`}>
          {trend === 'up' ? '▲' : '▼'}
        </span>
      )}
    </div>
    <div className="absolute bottom-2 right-4 flex gap-0.5 opacity-20">
      {[1,2,3,4].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
    </div>
  </div>
);

export default function AgencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = agencyData[id as keyof typeof agencyData] || agencyData.nasa;
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section, header").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#020205] text-zinc-300 font-sans selection:bg-purple-500/30 min-h-screen overflow-hidden">
      <CustomCursor />
      <Taskbar />
      <NebulaBackground />
      <GSAPStars count={250} />

      {/* Global HUD Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-10 left-10 text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] vertical-text">
          SYSTEM_VERSION: 4.0.2 // DATA_LINK: ESTABLISHED
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] text-right">
          LAT: 28.5721° N<br />LON: 80.6480° W
        </div>
      </div>

      {/* Dynamic Nebula Highlight */}
      <div 
        className="fixed inset-0 z-[-1] opacity-20 pointer-events-none blur-[180px]"
        style={{ 
          background: `radial-gradient(circle at 70% 30%, ${data.accentColor} 0%, transparent 60%), radial-gradient(circle at 30% 70%, ${data.accentColor} 0%, transparent 60%)` 
        }}
      />

      {/* Futuristic Sidebar */}
      <nav className="hidden xl:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
        {["overview", "metrics", "arsenal", "projects", "milestones", "horizon"].map((section, idx) => (
          <a 
            key={section}
            href={`#${section}`} 
            className={`group relative flex items-center transition-all duration-500 ${activeSection === section ? 'text-white' : 'text-zinc-600'}`}
          >
            <div className={`absolute -left-4 w-1 transition-all duration-500 ${activeSection === section ? 'h-full bg-white opacity-100' : 'h-0 bg-zinc-800 opacity-0'}`} style={{ backgroundColor: data.accentColor }} />
            <div className="flex flex-col">
              <span className={`text-[8px] font-mono mb-1 transition-colors ${activeSection === section ? 'text-white/40' : 'text-transparent'}`}>0{idx + 1}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">
                {section}
              </span>
            </div>
            {activeSection === section && (
              <motion.div 
                layoutId="nav-dot"
                className="ml-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"
                style={{ backgroundColor: data.accentColor, boxShadow: `0 0 10px ${data.accentColor}` }}
              />
            )}
          </a>
        ))}
      </nav>

      <SmoothScroll key={id}>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
          
          {/* Hero Section */}
          <header id="overview" className="relative mb-32 min-h-[70vh] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute -right-20 top-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none font-[family-name:var(--font-orbitron)]"
            >
              {data.name}
            </motion.div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 font-mono text-[9px] tracking-[0.8em] mb-12"
                style={{ color: data.accentColor }}
              >
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-current opacity-30" />)}
                </div>
                AGENCY_PROTOTYPE // {id.toUpperCase()} // LEVEL_4_ACCESS
              </motion.div>
              
              <div className="max-w-6xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-7xl md:text-[11rem] font-black text-white tracking-tighter mb-4 uppercase leading-[0.8] font-[family-name:var(--font-orbitron)]"
                >
                  {data.name}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-6 mb-12"
                >
                  <p className="text-zinc-500 font-mono text-xs tracking-[0.4em] uppercase border-l border-white/10 pl-4">
                    {data.fullname}
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-8">
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-xl md:text-2xl text-zinc-100 font-light leading-relaxed mb-10 max-w-4xl"
                    >
                      {data.description}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md group hover:bg-white/[0.05] transition-all cursor-pointer"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style={{ color: data.accentColor }} />
                      <span className="text-[11px] font-mono tracking-widest uppercase italic text-zinc-400">"{data.motto}"</span>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-4">
                     <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group">
                        <HUDCorner className="top-0 left-0" />
                        <HUDCorner className="bottom-0 right-0 rotate-180" />
                        <h4 className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-6">Dossier_Link</h4>
                        <DataLine label="Founded" value={data.founded} />
                        <DataLine label="Headquarters" value={data.hq} />
                        <DataLine label="Leadership" value={data.leadership} />
                        <DataLine label="Budget" value={data.budget} color={data.accentColor} />
                        <DataLine label="Personnel" value={data.workforce} />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Metrics Section */}
          <section id="metrics" className="mb-48 scroll-mt-32">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[1em]">Strategic_Metrics</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {data.metrics.map((m, i) => (
                <MetricCard key={i} label={m.label} value={m.value} trend={m.trend} color={data.accentColor} />
              ))}
            </div>
          </section>

          {/* Technical Arsenal */}
          <section id="arsenal" className="mb-48 scroll-mt-32">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
               <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[10px] font-mono text-zinc-600 uppercase tracking-[1em] mb-4 block"
                  >
                    Capability_Matrix
                  </motion.span>
                  <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter font-[family-name:var(--font-orbitron)] leading-none">Arsenal</h2>
               </div>
               <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
                  <span className="w-12 h-px bg-zinc-800" />
                  TOTAL_ASSETS: {data.vehicles.length + data.facilities.length}
               </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-2xl relative overflow-hidden group">
                   <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000"
                     style={{ background: `radial-gradient(circle at 50% 50%, ${data.accentColor}, transparent 70%)` }}
                   />
                   <div className="relative">
                      <div className="flex items-center gap-4 mb-8">
                         <div className="w-8 h-[1px] bg-white/20" />
                         <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-[0.4em]">Competencies</span>
                      </div>
                      <ul className="space-y-6">
                        {data.capabilities.map((cap, i) => (
                          <li key={i} className="group/item relative pl-6">
                             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full border border-white/20 group-hover/item:bg-white group-hover/item:border-white transition-all duration-300" style={{ borderColor: activeSection === 'arsenal' ? data.accentColor : '' }} />
                             <span className="text-lg font-medium text-zinc-400 group-hover/item:text-white transition-colors">{cap}</span>
                             <div className="mt-1 text-[8px] font-mono text-zinc-700 uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">Loaded // 0{i+1}</div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-16 p-6 rounded-2xl bg-black/40 border border-white/5 text-[11px] text-zinc-500 leading-relaxed italic">
                        "{data.technicalOverview}"
                      </div>
                   </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                   {data.vehicles.map((v, i) => (
                     <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.01] border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all group relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-6xl font-black font-[family-name:var(--font-orbitron)] pointer-events-none">
                          0{i+1}
                        </div>
                        
                        <div>
                           <div className="flex justify-between items-start mb-8">
                              <h4 className="text-2xl font-black text-white group-hover:translate-x-2 transition-transform uppercase tracking-tighter font-[family-name:var(--font-orbitron)]">{v.name}</h4>
                              <div className="flex flex-col items-end gap-2">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${v.status.includes('Active') || v.status.includes('Operational') ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                                    {v.status}
                                </span>
                              </div>
                           </div>
                           
                           <div className="space-y-6">
                              <div className="group/detail">
                                 <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-[0.3em] mb-2 group-hover/detail:text-white/40 transition-colors">Classification</span>
                                 <span className="text-zinc-200 text-sm font-medium tracking-tight uppercase">{v.type}</span>
                              </div>
                              <div className="group/detail">
                                 <span className="block text-[8px] text-zinc-600 uppercase font-black tracking-[0.3em] mb-2 group-hover/detail:text-white/40 transition-colors">Payload_Capacity</span>
                                 <div className="flex items-end gap-2">
                                    <span className="text-2xl font-mono text-zinc-100 tracking-tighter" style={{ color: data.accentColor }}>{v.payload.split(' ')[0]}</span>
                                    <span className="text-[10px] font-mono text-zinc-600 mb-1.5 uppercase">{v.payload.split(' ').slice(1).join(' ')}</span>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                           <span className="text-[8px] font-mono tracking-widest">UID: {id.toUpperCase()}-{v.name.replace(/\s+/g, '')}</span>
                           <div className="flex gap-1">
                              {[1,2,3,4].map(j => <div key={j} className="w-2 h-[1px] bg-current" />)}
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Strategic Projects */}
          <section id="projects" className="mb-48 scroll-mt-32">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
                <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter font-[family-name:var(--font-orbitron)] leading-none">Initiatives</h2>
                <p className="max-w-xs text-zinc-500 text-[10px] font-mono tracking-widest uppercase text-right leading-relaxed">
                   High-priority orbital and interplanetary deployments currently under execution.
                </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.projects.map((p, i) => (
                  <div key={i} className="group relative p-[1px] rounded-[2.5rem] transition-all duration-700 hover:scale-[1.02]">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity" style={{ backgroundImage: `linear-gradient(135deg, ${data.accentColor}44, transparent, transparent)` }} />
                     
                     <div className="relative p-8 h-full rounded-[2.45rem] bg-[#050508] border border-white/5 backdrop-blur-3xl flex flex-col">
                        <HUDCorner className="top-6 left-6 opacity-10" />
                        
                        <div className="flex justify-between items-center mb-8">
                           <div className="px-3 py-0.5 rounded-sm bg-white/5 text-[9px] font-mono text-zinc-500">{p.year}</div>
                           <div className="relative">
                              <div className={`w-2.5 h-2.5 rounded-full ${p.status === 'Active' ? 'shadow-[0_0_15px_current]' : 'bg-zinc-800'}`} style={{ backgroundColor: p.status === 'Active' ? data.accentColor : '' }} />
                              {p.status === 'Active' && <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: data.accentColor }} />}
                           </div>
                        </div>

                        <h4 className="text-3xl font-black text-white mb-6 tracking-tighter uppercase font-[family-name:var(--font-orbitron)] leading-none">{p.name}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-10 flex-1 font-light">{p.description}</p>
                        
                        <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                           <div className="flex flex-col">
                              <span className="text-[7px] font-mono text-zinc-700 uppercase tracking-widest mb-1">Deployment_Phase</span>
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{p.status}</span>
                           </div>
                           <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-all">
                              <div className="w-1 h-1 rotate-45 border-t border-r border-white" />
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Milestones & Timeline */}
          <section id="milestones" className="mb-48 scroll-mt-32">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 sticky top-32 h-fit">
                   <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[1em] mb-6 block">Historical_Archive</span>
                   <h2 className="text-white text-6xl md:text-[5.5rem] font-black uppercase tracking-tighter mb-8 leading-[0.85] font-[family-name:var(--font-orbitron)]">
                     Chronicle <br /> Of Success
                   </h2>
                   <div className="w-24 h-1 bg-gradient-to-r from-white/40 to-transparent mb-8" style={{ backgroundImage: `linear-gradient(90deg, ${data.accentColor}, transparent)` }} />
                   <p className="text-zinc-400 text-base leading-relaxed font-light mb-12 max-w-sm">
                     Decades of exploration distilled into defining moments of human achievement.
                   </p>
                   
                   <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl">
                      <h5 className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-6">Key_Achievements</h5>
                      <div className="space-y-4">
                        {data.achievements.slice(0, 4).map((ach, idx) => (
                          <div key={idx} className="flex gap-4 text-xs text-zinc-400 leading-snug">
                             <span className="text-white/20 font-mono">[{idx + 1}]</span>
                             <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
                
                <div className="lg:col-span-7">
                   <div className="space-y-24 border-l border-white/5 pl-10 ml-5 relative">
                      {data.timeline.map((t, i) => (
                        <div key={i} className="relative group">
                           <div className="absolute -left-[57px] top-2 w-3.5 h-3.5 rounded-full bg-[#020205] border border-white/10 group-hover:border-white transition-all duration-500 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:scale-110 transition-transform" style={{ backgroundColor: activeSection === 'milestones' ? data.accentColor : '' }} />
                           </div>
                           
                           <div className="flex items-center gap-4 mb-4">
                              <span className="text-white font-mono text-xl font-black tracking-tighter" style={{ color: data.accentColor }}>{t.year}</span>
                              <div className="h-px w-8 bg-white/10" />
                           </div>
                           
                           <h4 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase font-[family-name:var(--font-orbitron)] group-hover:translate-x-3 transition-transform duration-500">{t.event}</h4>
                           <p className="text-base text-zinc-400 leading-relaxed font-light max-w-xl border-l border-white/5 pl-6 group-hover:border-white/20 transition-colors">
                              {t.detail}
                           </p>
                           
                           <div className="mt-8 opacity-0 group-hover:opacity-10 transition-opacity flex gap-1.5">
                              {Array.from({ length: 8 }).map((_, j) => (
                                <div key={j} className="w-[1.5px] h-6 bg-white" />
                              ))}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Strategic Horizon */}
          <section id="horizon" className="mb-48 p-12 md:p-24 rounded-[4rem] bg-white/[0.01] border border-white/5 relative overflow-hidden scroll-mt-32">
             <div 
               className="absolute inset-0 opacity-10 pointer-events-none"
               style={{ background: `radial-gradient(circle at 100% 0%, ${data.accentColor} 0%, transparent 50%)` }}
             />
             <div className="absolute -bottom-64 -left-64 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full" />
             
             <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
                   <div className="max-w-3xl">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-zinc-500 font-mono text-[9px] uppercase tracking-[1em] mb-6 block"
                      >
                        Mission_Continuum
                      </motion.span>
                      <h2 className="text-7xl md:text-[8rem] font-black text-white tracking-tighter font-[family-name:var(--font-orbitron)] uppercase leading-[0.8]">Strategic <br /> Horizon</h2>
                   </div>
                   <div className="p-6 border border-white/5 backdrop-blur-md rounded-2xl max-w-xs">
                      <p className="text-zinc-500 text-[9px] font-mono tracking-widest uppercase italic leading-loose">
                        // CAUTION: PROVISIONAL DATA<br />
                        // TIMELINES SUBJECT TO ORBITAL WINDOWS
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                   {data.futurePlans.map((plan, i) => (
                     <div key={i} className="group relative">
                        <div className="text-white/5 text-[9rem] font-black absolute -top-12 -left-6 group-hover:text-white/10 transition-colors pointer-events-none font-[family-name:var(--font-orbitron)]">0{i+1}</div>
                        <div className="relative pt-16">
                           <div className="flex items-center gap-4 mb-4">
                              <span className="text-[9px] font-mono text-zinc-500 uppercase">Epoch:</span>
                              <span className="px-2 py-0.5 bg-white/5 text-white font-mono text-xs font-black tracking-widest">{plan.timeframe}</span>
                           </div>
                           <h4 className="text-2xl font-black text-white mb-6 tracking-tighter uppercase font-[family-name:var(--font-orbitron)]">{plan.title}</h4>
                           <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent mb-6" />
                           <p className="text-sm text-zinc-400 leading-relaxed font-light group-hover:text-zinc-200 transition-colors">{plan.description}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Footer Metadata */}
          <footer className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 text-[9px] text-zinc-600 font-mono tracking-[0.5em] uppercase">
             <div className="flex items-center gap-6">
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-zinc-800" />)}
                </div>
                ARCHIVE_ENTITY: {data.name} // SOURCE: DSN_V4
             </div>
             <div className="flex flex-wrap gap-10">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                   LINK: STABLE
                </div>
                <span>LOSS: 0.00%</span>
                <span className="text-zinc-400">© {new Date().getFullYear()} GALACTIC_HUB</span>
             </div>
          </footer>

        </div>
      </SmoothScroll>
    </div>
  );
}
