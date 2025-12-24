"use client";

import { use, useEffect, useRef, useState } from "react";
import { MilkyWay } from "@/components/space/MilkyWay";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StoryItem {
  title: string;
  year: string;
  description: string;
  image: string;
}

interface AgencyData {
  name: string;
  tagline: string;
  description: string;
  color: string;
  accent: string;
  flagGradient: string;
  founded: string;
  hq: string;
  stats: { label: string; value: string; suffix?: string }[];
  achievements: StoryItem[];
  projects: StoryItem[];
}

const agencyData: Record<string, AgencyData> = {
  nasa: {
    name: "NASA",
    tagline: "Exploring the secrets of the universe for the benefit of all.",
    description: "The National Aeronautics and Space Administration is America's civil space program and the global leader in space exploration.",
    color: "from-blue-600",
    accent: "#2563eb",
    flagGradient: "from-[#3C3B6E] via-[#FFFFFF] to-[#B22234]",
    founded: "1958",
    hq: "Washington, D.C.",
    stats: [
      { label: "Annual Budget", value: "25.4", suffix: "B" },
      { label: "Active Missions", value: "80", suffix: "+" },
      { label: "Moon Landings", value: "6" },
      { label: "Workforce", value: "18", suffix: "k" }
    ],
    achievements: [
      {
        title: "The Apollo Era",
        year: "1969",
        description: "A moment that unified the world. Humans walked on the Moon for the first time, proving that no goal is out of reach.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Voyager Interstellar",
        year: "1977",
        description: "Two spacecraft carrying the sounds and sights of Earth, traveling beyond the sun's influence into the great unknown.",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Hubble's Vision",
        year: "1990",
        description: "Rewriting textbooks with every image. Hubble revealed the age of the universe and the beauty of nebulae.",
        image: "https://images.unsplash.com/photo-1446776879694-90d17c71283d?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    projects: [
      {
        title: "Artemis Program",
        year: "Current",
        description: "Returning to the Moon with the first woman and first person of color, establishing a long-term presence.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Mars Sample Return",
        year: "Future",
        description: "A complex multi-mission campaign to bring pieces of the Red Planet back to Earth for study.",
        image: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&q=80&w=1200"
      }
    ]
  },
  isro: {
    name: "ISRO",
    tagline: "Space technology in the service of humankind.",
    description: "India's premier space agency, known for its cost-effective and innovative approach to planetary exploration.",
    color: "from-orange-500",
    accent: "#f97316",
    flagGradient: "from-[#FF9933] via-[#FFFFFF] to-[#138808]",
    founded: "1969",
    hq: "Bengaluru, India",
    stats: [
      { label: "Launch Missions", value: "120", suffix: "+" },
      { label: "Satellites Built", value: "150", suffix: "+" },
      { label: "Cost Efficiency", value: "90", suffix: "%" },
      { label: "Planetary Missions", value: "4" }
    ],
    achievements: [
      {
        title: "Mangalyaan Success",
        year: "2014",
        description: "India becomes the first nation to reach Martian orbit in its first attempt, at a fraction of the usual cost.",
        image: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Lunar South Pole",
        year: "2023",
        description: "Chandrayaan-3 successfully soft-lands near the Moon's south pole, a historic first for humanity.",
        image: "https://images.unsplash.com/photo-1444703686981-a3abb997b724?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    projects: [
      {
        title: "Gaganyaan",
        year: "Upcoming",
        description: "India's first human spaceflight mission, carrying three astronauts to low Earth orbit.",
        image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=1200"
      }
    ]
  },
  esa: {
    name: "ESA",
    tagline: "Shaping the development of Europe's space capability.",
    description: "The European Space Agency is Europe's gateway to space, coordinating resources of its member states.",
    color: "from-blue-800",
    accent: "#1e3a8a",
    flagGradient: "from-[#003399] to-[#FFCC00]",
    founded: "1975",
    hq: "Paris, France",
    stats: [
      { label: "Member States", value: "22" },
      { label: "Science Budget", value: "7.1", suffix: "B" },
      { label: "Operational Sites", value: "8" },
      { label: "Active Projects", value: "50", suffix: "+" }
    ],
    achievements: [
      {
        title: "Rosetta Mission",
        year: "2014",
        description: "The first mission to orbit and land on a comet, unlocking secrets of the solar system's origins.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Ariane Rockets",
        year: "Ongoing",
        description: "Providing Europe with independent access to space through highly reliable launch vehicles.",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    projects: [
      {
        title: "JUICE",
        year: "Current",
        description: "Exploring Jupiter's icy moons to determine if they could harbor life in their hidden oceans.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
      }
    ]
  },
  spacex: {
    name: "SpaceX",
    tagline: "Making humanity multi-planetary.",
    description: "Revolutionizing space transportation through reusable rocketry and visionary engineering.",
    color: "from-zinc-600",
    accent: "#52525b",
    flagGradient: "from-[#3C3B6E] via-[#FFFFFF] to-[#B22234]",
    founded: "2002",
    hq: "Hawthorne, CA",
    stats: [
      { label: "Successful Launches", value: "300", suffix: "+" },
      { label: "Reused Boosters", value: "250", suffix: "+" },
      { label: "Starlink Satellites", value: "5000", suffix: "+" },
      { label: "Market Value", value: "180", suffix: "B" }
    ],
    achievements: [
      {
        title: "First Landing",
        year: "2015",
        description: "The moment that changed everything. An orbital-class rocket booster returns to Earth and lands vertically.",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Crew Dragon",
        year: "2020",
        description: "Restoring human spaceflight capability to the US with the first commercial mission to the ISS.",
        image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    projects: [
      {
        title: "Starship",
        year: "Current",
        description: "The most powerful rocket ever built, designed to carry humans and cargo to the Moon, Mars, and beyond.",
        image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200"
      }
    ]
  }
};

export default function AgencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = agencyData[id as keyof typeof agencyData] || agencyData.nasa;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const scroller = document.querySelector(".smooth-scroll");
    if (!scroller) return;

    const ctx = gsap.context(() => {
      // Achievement scaling and reveals
      gsap.utils.toArray(".story-section").forEach((section: any) => {
        const content = section.querySelector(".content-box");
        const img = section.querySelector(".bg-image");

        gsap.fromTo(content,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              scroller: scroller,
              start: "top 60%",
              end: "bottom center",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.to(img, {
          scale: 1.1,
          scrollTrigger: {
            trigger: section,
            scroller: scroller,
            scrub: true,
            start: "top bottom",
            end: "bottom top"
          }
        });
      });

      // Stats stagger reveal
      gsap.from(".stat-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-grid",
          scroller: scroller,
          start: "top 80%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-[#030014] selection:bg-purple-500/30 font-[family-name:var(--font-orbitron)]">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />

        {/* Dynamic Background Overlays */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.05)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Hero Section - Advanced Editorial Layout */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
          <motion.div 
            style={{ y: titleY, opacity: titleOpacity }}
            className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end z-20"
          >
            {/* Left Side: Large Technical Typography */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8 overflow-hidden">
                <motion.div 
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="h-px w-24 bg-white/20" 
                />
                <span className="text-zinc-500 text-xs font-bold tracking-[1em] uppercase">Sector Profile</span>
              </div>
              
              <h1 className="relative">
                <motion.span
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`block text-[15vw] lg:text-[18rem] font-black leading-[0.8] tracking-tighter bg-gradient-to-br ${data.flagGradient} bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]`}
                >
                  {data.name}
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-left"
                />
              </h1>
            </div>

            {/* Right Side: Quick Specs */}
            <div className="lg:col-span-4 space-y-12 mb-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass-card p-10 rounded-[2.5rem] border-white/5 relative group hover:border-white/10 transition-colors"
              >
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
                <p className="text-zinc-400 text-xl md:text-2xl font-light italic leading-relaxed relative z-10">
                  "{data.tagline}"
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col gap-6 pl-4"
              >
                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                  <span className="text-zinc-600 text-[10px] uppercase tracking-widest font-black">Est. Date</span>
                  <span className="text-white text-xl font-bold font-mono tracking-tighter">{data.founded}</span>
                </div>
                <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
                  <span className="text-zinc-600 text-[10px] uppercase tracking-widest font-black">HQ Loc</span>
                  <span className="text-white text-xl font-bold tracking-tighter">{data.hq}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Background Decorative Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[conic-gradient(from_0deg,transparent,rgba(168,85,247,0.1),transparent)] animate-[spin_20s_linear_infinite]" />
          </div>
        </section>

        {/* Stats Section - Data Intensive Grid */}
        <section className="relative py-32 z-20">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stats-grid">
              {data.stats.map((stat, i) => (
                <div key={i} className="stat-card glass-card p-12 rounded-[3rem] border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.05] transition-all duration-500">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] font-black mb-6 group-hover:text-purple-400 transition-colors">{stat.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-7xl font-black text-white tracking-tighter tabular-nums">{stat.value}</span>
                    {stat.suffix && <span className="text-3xl font-black text-purple-500">{stat.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement with Reveal */}
        <section className="relative py-60 z-20 overflow-hidden">
           <div className="max-w-5xl mx-auto px-6 text-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5 }}
               className="relative"
             >
                <span className="absolute -top-20 left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/[0.02] tracking-tighter pointer-events-none whitespace-nowrap">MISSION</span>
                <p className="text-4xl md:text-6xl text-white font-black leading-[1.1] tracking-tighter mb-12">
                  Driving the frontiers of <span className="text-purple-500 italic">human knowledge</span> across the cosmic ocean.
                </p>
                <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-16 opacity-30" />
                <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                  {data.description} Our work is not just about exploring space; it's about understanding our origin and securing our future.
                </p>
             </motion.div>
           </div>
        </section>

        {/* Achievements - Advanced Sticky Scroller */}
        <div className="relative z-10 bg-[#030014]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden pointer-events-none z-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
          </div>

          {data.achievements.map((item, i) => (
            <section key={i} className="story-section relative min-h-screen flex items-center justify-center py-40">
              <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Visual Side */}
                <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-[4rem] group shadow-2xl">
                   <img src={item.image} alt={item.title} className="bg-image absolute inset-0 w-full h-full object-cover transition-transform duration-[2s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                   <div className="absolute bottom-12 left-12">
                      <span className="text-white/60 font-mono text-sm tracking-widest uppercase mb-2 block">Archive Ref. // 0{i+1}</span>
                      <h3 className="text-4xl font-black text-white tracking-tighter uppercase">{item.year}</h3>
                   </div>
                </div>

                {/* Content Side */}
                <div className="content-box">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-px w-12 bg-purple-500" />
                    <span className="text-purple-400 font-black uppercase tracking-[0.4em] text-[10px]">Historic Milestone</span>
                  </div>
                  <h3 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase leading-none">{item.title}</h3>
                  <div className="glass-card p-12 rounded-[3rem] border-white/5 bg-white/[0.02]">
                    <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-light">
                      {item.description}
                    </p>
                    <div className="mt-12 flex items-center gap-6">
                       <button className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-3 group/btn">
                          Launch Archive <span className="w-8 h-px bg-white/20 group-hover/btn:w-12 transition-all" />
                       </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          ))}
        </div>

        {/* Future Spectrums Grid */}
        <section className="relative py-60 bg-[#05001a] z-20 border-t border-white/5 overflow-hidden">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
              <div className="max-w-2xl">
                <h2 className="text-purple-500 text-[10px] font-black uppercase tracking-[1.5em] mb-8">Active Spectrums</h2>
                <div className="text-6xl md:text-[9rem] font-black text-white tracking-tighter italic leading-none">
                  Future <span className="text-zinc-800">Frontiers</span>
                </div>
              </div>
              <p className="text-zinc-500 text-xl max-w-sm font-light italic leading-relaxed pb-6">
                Redefining the boundaries of possible through relentless technological evolution.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {data.projects.map((project, i) => (
                <div key={i} className="group relative aspect-video rounded-[4rem] overflow-hidden glass-card border-white/5 transition-all duration-700 hover:scale-[1.01] hover:border-white/20">
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-50 transition-all duration-1000 scale-100 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05001a] via-[#05001a]/20 to-transparent" />
                  
                  <div className="absolute bottom-16 left-16 right-16 z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="h-px w-12 bg-purple-500" />
                      <span className="text-purple-400 font-bold uppercase tracking-[0.3em] text-[11px]">{project.year}</span>
                    </div>
                    <h4 className="text-5xl font-black text-white mb-6 tracking-tighter uppercase">{project.title}</h4>
                    <p className="text-zinc-400 text-xl leading-relaxed font-light line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specification Footer */}
        <footer className="relative py-40 px-6 border-t border-white/5 z-20 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
             <div className="lg:col-span-8">
                <h2 className={`text-9xl lg:text-[12rem] font-black bg-gradient-to-br ${data.flagGradient} bg-clip-text text-transparent tracking-tighter opacity-10 leading-none mb-12`}>
                   {data.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                   <div>
                      <span className="block text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-4">Core Systems</span>
                      <ul className="space-y-2 text-zinc-500 text-xs font-mono uppercase tracking-tight">
                         <li>Guidance Nav</li>
                         <li>Propulsion</li>
                         <li>Life Support</li>
                         <li>Avionics</li>
                      </ul>
                   </div>
                   <div>
                      <span className="block text-[10px] font-black text-zinc-700 uppercase tracking-widest mb-4">Operations</span>
                      <ul className="space-y-2 text-zinc-500 text-xs font-mono uppercase tracking-tight">
                         <li>Ground Ctrl</li>
                         <li>Deep Space</li>
                         <li>Satellite Ops</li>
                         <li>Telemetry</li>
                      </ul>
                   </div>
                </div>
             </div>
             
             <div className="lg:col-span-4 flex flex-col justify-end text-right">
                <p className="text-zinc-700 text-[10px] font-black tracking-[1em] uppercase mb-8">
                  Voyage Protocol: Active
                </p>
                <p className="text-zinc-500 text-2xl font-light italic leading-snug">
                  "The stars are not reachable by the feet, but by the mind and the heart of the curious."
                </p>
                <div className="mt-16 pt-8 border-t border-white/5 text-[10px] text-zinc-800 font-mono tracking-[0.2em]">
                  ENCRYPTED DATA STREAM // {new Date().getFullYear()} // COSMOS CORE
                </div>
             </div>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
