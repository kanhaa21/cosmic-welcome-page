"use client";

import { use, useEffect, useRef } from "react";
import { MilkyWay } from "@/components/space/MilkyWay";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion, useScroll, useTransform } from "framer-motion";
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
    description: "The European Space Agency is Europe's gateway to space, coordinating the financial and intellectual resources of its member states.",
    color: "from-blue-800",
    accent: "#1e3a8a",
    flagGradient: "from-[#003399] to-[#FFCC00]",
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

  useEffect(() => {
    const sections = gsap.utils.toArray(".story-section");
    const scroller = document.querySelector(".smooth-scroll");
    
    if (!scroller) return;

    const ctx = gsap.context(() => {
      sections.forEach((section: any) => {
        gsap.fromTo(section.querySelector(".content-box"),
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            scrollTrigger: {
              trigger: section,
              scroller: scroller,
              start: "top 70%",
              end: "bottom center",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        gsap.fromTo(section.querySelector(".bg-image"),
          { scale: 1.2, filter: "brightness(0.3)" },
          {
            scale: 1,
            filter: "brightness(0.6)",
            scrollTrigger: {
              trigger: section,
              scroller: scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id]);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-[#030014] selection:bg-purple-500/30">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />

        {/* Hero Header */}
        <section className="relative h-screen flex flex-col items-center justify-center px-4 z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-center"
          >
            <span className="text-zinc-500 font-bold tracking-[0.8em] uppercase text-xs mb-6 block">Agency Profile</span>
            <h1 className={`text-8xl md:text-[14rem] font-black bg-gradient-to-br ${data.flagGradient} bg-clip-text text-transparent leading-none tracking-tighter mb-8 drop-shadow-2xl`}>
              {data.name}
            </h1>
            <p className="text-zinc-400 text-xl md:text-3xl font-light italic max-w-2xl mx-auto leading-relaxed">
              "{data.tagline}"
            </p>
          </motion.div>
          
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
            <span className="text-[10px] text-white uppercase tracking-[0.5em] font-bold">The Journey Begins</span>
            <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* Introduction */}
        <section className="relative py-40 px-4 md:px-20 z-20 bg-black/50 backdrop-blur-3xl border-y border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 mb-8">
               <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500" />
               <div className="w-2 h-0.5 bg-purple-500" />
               <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight uppercase tracking-widest">The Mission</h2>
            <p className="text-zinc-400 text-xl md:text-3xl leading-relaxed font-light">
              {data.description} Our journey through space is a testament to the indomitable human spirit and our innate curiosity to explore the unknown.
            </p>
          </div>
        </section>

        {/* Achievements Storyteller */}
        <div className="relative z-10">
          <div className="sticky top-20 left-20 z-30 pointer-events-none p-8">
             <h3 className="text-purple-500 text-[10px] font-black uppercase tracking-[1em] mb-2">Historical</h3>
             <div className="text-3xl font-bold text-white tracking-tighter">Legacy Archive</div>
          </div>

          {data.achievements.map((item, i) => (
            <section key={i} className="story-section relative h-screen flex items-center justify-center overflow-hidden">
              <img src={item.image} alt={item.title} className="bg-image absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="content-box relative z-20 max-w-4xl px-8 text-center">
                <span className="text-white/40 font-mono text-xs mb-4 block tracking-widest uppercase">Index // 0{i + 1} // AD {item.year}</span>
                <h3 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">{item.title}</h3>
                <p className="text-zinc-200 text-lg md:text-2xl leading-relaxed font-medium bg-black/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
                  {item.description}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Projects Section */}
        <section className="relative py-40 bg-[#05001a] z-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-24 text-center">
              <h2 className="text-purple-500 text-[10px] font-black uppercase tracking-[1em] mb-4">Frontiers</h2>
              <div className="text-5xl md:text-8xl font-black text-white tracking-tighter italic">Active <span className="text-zinc-800">Spectrums</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {data.projects.map((project, i) => (
                <div key={i} className="group relative aspect-[4/5] rounded-[4rem] overflow-hidden glass-card border-white/5 p-16 flex flex-col justify-end transition-all duration-700 hover:scale-[1.02]">
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-1000 scale-100 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05001a] via-[#05001a]/40 to-transparent" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="h-px w-12 bg-purple-500" />
                      <span className="text-purple-400 font-bold uppercase tracking-[0.3em] text-[10px]">{project.year}</span>
                    </div>
                    <h4 className="text-5xl font-black text-white mb-6 tracking-tighter uppercase">{project.title}</h4>
                    <p className="text-zinc-400 text-xl leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-32 px-4 text-center border-t border-white/5 z-20 bg-black">
          <div className="max-w-xl mx-auto">
            <p className="text-zinc-700 text-[10px] font-black tracking-[1em] uppercase mb-6">
              Continuing the Voyage
            </p>
            <p className="text-zinc-500 text-lg font-light italic">
              "The exploration of space will go ahead, whether we join in it or not, and it is one of the great adventures of all time."
            </p>
            <div className="mt-12 text-[10px] text-zinc-800 font-mono">
              SYSTEM STATUS: NOMINAL // DATA STREAM: ENCRYPTED
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
