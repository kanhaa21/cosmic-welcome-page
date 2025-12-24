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
  spacex: {
    name: "SpaceX",
    tagline: "Making humanity multi-planetary.",
    description: "Revolutionizing space transportation through reusable rocketry and visionary engineering.",
    color: "from-zinc-600",
    accent: "#52525b",
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
    sections.forEach((section: any) => {
      gsap.fromTo(section.querySelector(".content-box"),
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
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
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
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
            <h1 className={`text-8xl md:text-[12rem] font-black bg-gradient-to-b ${data.color} to-white bg-clip-text text-transparent leading-none tracking-tighter mb-8`}>
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
        <section className="relative py-40 px-4 md:px-20 z-20 bg-black/50 backdrop-blur-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">The Mission</h2>
            <p className="text-zinc-400 text-xl md:text-3xl leading-relaxed font-light">
              {data.description} Our journey through space is a testament to the indomitable human spirit and our innate curiosity to explore the unknown.
            </p>
          </div>
        </section>

        {/* Achievements Storyteller */}
        <div className="relative z-10">
          <div className="sticky top-20 left-20 z-30 pointer-events-none">
             <h3 className="text-purple-500 text-xs font-black uppercase tracking-[1em] mb-2">Historical</h3>
             <div className="text-3xl font-bold text-white">Legacy</div>
          </div>

          {data.achievements.map((item, i) => (
            <section key={i} className="story-section relative h-screen flex items-center justify-center overflow-hidden">
              <img src={item.image} alt={item.title} className="bg-image absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="content-box relative z-20 max-w-4xl px-8 text-center">
                <span className="text-white/60 font-mono text-sm mb-4 block">Milestone 0{i + 1} // {item.year}</span>
                <h3 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">{item.title}</h3>
                <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-medium bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5">
                  {item.description}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Projects Section */}
        <section className="relative py-40 bg-[#05001a] z-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-24 text-center">
              <h2 className="text-purple-500 text-xs font-black uppercase tracking-[1em] mb-4">The Future</h2>
              <div className="text-5xl md:text-7xl font-black text-white tracking-tighter">Current <span className="text-zinc-800">&</span> Upcoming</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {data.projects.map((project, i) => (
                <div key={i} className="group relative aspect-square rounded-[3rem] overflow-hidden glass-card border-white/5 p-12 flex flex-col justify-end">
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05001a] to-transparent" />
                  
                  <div className="relative z-10">
                    <span className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4 block">{project.year}</span>
                    <h4 className="text-4xl font-black text-white mb-6 tracking-tight">{project.title}</h4>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-24 px-4 text-center border-t border-white/5 z-20">
          <p className="text-zinc-600 text-xs font-black tracking-[0.8em] uppercase mb-4">
            Continuing the Voyage
          </p>
          <p className="text-zinc-500 text-sm italic">
            "To infinity and beyond."
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
