"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const storyChapters = [
  {
    agency: "NASA",
    title: "The Pioneer",
    achievement: "Artemis & Moon Missions",
    description: "From the historic Apollo steps to the ambitious Artemis program, NASA continues to push the boundaries of human presence in the solar system, returning to the Moon and beyond.",
    year: "1958 - Present",
    color: "from-blue-600/20",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000"
  },
  {
    agency: "ISRO",
    title: "The Rising Force",
    achievement: "Chandrayaan-3",
    description: "ISRO proved that precision and resourcefulness can touch the stars. With the successful landing at the lunar south pole, India joined an elite group of spacefaring nations.",
    year: "1969 - Present",
    color: "from-orange-600/20",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1000"
  },
  {
    agency: "SpaceX",
    title: "The Disruptor",
    achievement: "Starship Era",
    description: "Revolutionizing space travel with reusability, SpaceX is building the fleet that will one day make humanity multi-planetary. The path to Mars is being paved with fire and steel.",
    year: "2002 - Present",
    color: "from-zinc-600/20",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1000"
  },
  {
    agency: "ESA",
    title: "The Collaborator",
    achievement: "James Webb Support",
    description: "European excellence in science and technology. By powering the greatest eyes we've ever put in space, ESA helps us look back in time to the very first light of the universe.",
    year: "1975 - Present",
    color: "from-emerald-600/20",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1000"
  }
];

export function StoryTeller() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chapters = gsap.utils.toArray(".story-chapter");
    
    gsap.to(chapters, {
      xPercent: -100 * (chapters.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (chapters.length - 1),
        end: () => "+=" + containerRef.current?.offsetWidth,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-black py-20">
      <div className="absolute top-20 left-20 z-20">
        <h2 className="text-zinc-500 text-xs font-black uppercase tracking-[0.8em] mb-4">Chronicles of Progress</h2>
        <div className="text-4xl font-bold text-white tracking-tighter">Cosmic <span className="text-zinc-700">Milestones</span></div>
      </div>

      <div className="flex w-[400%] h-[80vh] items-center">
        {storyChapters.map((chapter, i) => (
          <div key={chapter.agency} className="story-chapter w-screen h-full flex items-center justify-center px-20">
            <div className={`relative w-full max-w-6xl aspect-[21/9] rounded-[3rem] overflow-hidden glass-card border-white/5 bg-gradient-to-br ${chapter.color} to-transparent group`}>
              <div className="absolute inset-0">
                <img 
                  src={chapter.image} 
                  alt={chapter.title}
                  className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              </div>
              
              <div className="relative h-full flex flex-col justify-center px-20 max-w-2xl">
                <span className="text-purple-500 font-bold tracking-[0.3em] uppercase text-xs mb-4">{chapter.agency} — {chapter.year}</span>
                <h3 className="text-6xl font-black text-white mb-2 tracking-tighter">{chapter.title}</h3>
                <h4 className="text-2xl font-bold text-zinc-400 mb-8 tracking-tight">{chapter.achievement}</h4>
                <p className="text-zinc-300 text-xl leading-relaxed font-light italic">
                  "{chapter.description}"
                </p>
                
                <div className="mt-12 flex items-center gap-6">
                  <div className="w-12 h-px bg-white/20" />
                  <span className="text-[10px] text-zinc-500 uppercase tracking-[0.5em] font-bold">Chapter 0{i+1}</span>
                </div>
              </div>

              {/* Decorative side element */}
              <div className="absolute top-0 right-0 h-full w-1/3 flex items-center justify-center pointer-events-none">
                <div className="text-[20rem] font-black text-white/[0.02] rotate-90 select-none">
                  0{i+1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicator for the horizontal section */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-40 h-[2px] bg-white/5 relative">
          <motion.div 
            className="absolute h-full bg-purple-500"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </div>
        <span className="text-[8px] text-zinc-600 uppercase tracking-[1em] font-bold">Slide to Traverse Time</span>
      </div>
    </section>
  );
}
