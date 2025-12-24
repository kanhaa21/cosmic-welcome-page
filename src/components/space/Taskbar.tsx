"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = [
  { name: "Nexus", id: "nexus" },
  { name: "Home", id: "hero" },
  { name: "Earth", id: "earth" },
  { name: "Story", id: "story" },
  { name: "Explore", id: "explore" },
  { name: "Solar", id: "solar", path: "/solar-system" },
];

const agencies = [
  { name: "NASA", path: "/agencies/nasa" },
  { name: "ISRO", path: "/agencies/isro" },
  { name: "ESA", path: "/agencies/esa" },
  { name: "SpaceX", path: "/agencies/spacex" }
];

export function Taskbar() {
  const pathname = usePathname();
  const { scroll } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [sectionProgress, setSectionProgress] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);

  const isAgencyPage = pathname?.startsWith("/agencies/");
  const currentAgencyId = isAgencyPage ? pathname.split("/").pop() : null;

      const [isHovered, setIsHovered] = useState(false);
      const navTransition = { 
        duration: isHovered ? 0.3 : 0.8, 
        ease: [0.16, 1, 0.3, 1]
      };

      useEffect(() => {

    if (pathname === "/solar-system") {
      setActiveSection("solar");
      return;
    }
    if (pathname !== "/") return;

    const ctx = gsap.context(() => {
      const scroller = document.querySelector(".smooth-scroll");
      if (!scroller) return;

      // Global scroll progress tracking
      ScrollTrigger.create({
        trigger: scroller,
        scroller: scroller,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setGlobalProgress(self.progress);
        }
      });

      // Section specific tracking
      sections.forEach((section) => {
        if (section.id === "nexus") return;
        
        const triggerElement = document.querySelector(`#${section.id}`);
        if (!triggerElement || !(triggerElement instanceof HTMLElement)) return;

        ScrollTrigger.create({
          trigger: triggerElement,
          scroller: scroller,
          start: "top 20%",
          end: "bottom 20%",
          onUpdate: (self) => {
            if (self.isActive) {
              setActiveSection(section.id);
              setSectionProgress(self.progress);
            }
          },
          onToggle: (self) => {
            if (self.isActive) setActiveSection(section.id);
          }
        });
      });

      // Hero specific top-of-page logic
      const heroElement = document.querySelector("#hero");
      if (heroElement instanceof HTMLElement) {
        ScrollTrigger.create({
          trigger: heroElement,
          scroller: scroller,
          start: "top top",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection("hero");
          }
        });
      }
    });

    return () => ctx.revert();
  }, [scroll, pathname]);

  const handleScroll = (id: string) => {
    if (scroll) {
      const target = document.querySelector(`#${id}`);
      if (target) {
        scroll.scrollTo(target, {
          offset: 0,
          duration: 1.5,
          easing: [0.25, 0.00, 0.35, 1.00]
        });
      }
    }
  };

  if (isAgencyPage) {
    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-full border border-white/5 bg-[#030014]/60 backdrop-blur-2xl flex items-center gap-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] hover:border-white/10 group"
      >
        <Link 
          href="/" 
          className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.2em] hover:text-white transition-all"
        >
          Home
        </Link>
        <div className="h-4 w-px bg-white/10" />
        <div className="flex items-center gap-8">
          {agencies.filter(a => a.path !== pathname).map((agency) => (
            <Link
              key={agency.name}
              href={agency.path}
              className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.3em] hover:text-blue-400 transition-all relative group whitespace-nowrap"
            >
              {agency.name}
            </Link>
          ))}
        </div>
      </motion.nav>
    );
  }

    return (
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-full border border-white/5 bg-[#030014]/60 backdrop-blur-2xl flex items-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] transition-all hover:border-white/10 w-auto justify-center overflow-hidden group`}
      >
        {/* Global Scroll Track (Background) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 z-0" />
        
        {/* Global Scroll Progress Bar (Main) */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-10"
          style={{ width: "100%", scaleX: globalProgress, originX: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
  
        {/* Navigation Content */}
        <div className={`flex items-center relative z-[2] transition-all duration-700 ${isHovered ? 'gap-6 md:gap-10' : 'gap-0'}`}>
          {/* Always Visible Nexus Branding */}
          <button
            onClick={() => {
              if (pathname !== "/") window.location.href = "/";
              else handleScroll("hero");
            }}
            className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.5em] transition-all relative px-4 py-1.5 rounded-full whitespace-nowrap bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] font-[family-name:var(--font-syncopate)] hover:scale-110 active:scale-95 duration-300"
          >
            NEXUS
          </button>

          {/* Collapsible Sections */}
          {sections.filter(s => s.name !== "Nexus").map((section) => (
            <motion.div
              key={section.id}
              initial={false}
              animate={{
                width: isHovered ? "auto" : 0,
                opacity: isHovered ? 1 : 0,
                pointerEvents: isHovered ? "auto" : "none",
                marginRight: isHovered ? "1.5rem" : 0
              }}
              transition={navTransition}
              className="overflow-hidden flex items-center"
            >
              <motion.button
                whileHover={section.id === "solar" ? { 
                  scale: 1.15, 
                } : { scale: 1.05 }}
                onClick={() => {
                  if (section.path && pathname !== section.path) {
                    window.location.href = section.path;
                    return;
                  }
                  if (pathname !== "/" && !section.path) {
                    window.location.href = `/#${section.id}`;
                    return;
                  }
                  handleScroll(section.id);
                }}
                className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative px-3 py-1.5 rounded-full whitespace-nowrap ${
                  activeSection === section.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                } ${
                  section.id === "solar" 
                    ? "bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/40 px-4" 
                    : ""
                }`}
              >
                <span className="relative z-10">{section.name}</span>

                {section.id === "solar" && (
                  <>
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-purple-500/20 blur-md -z-10"
                      animate={{ 
                        opacity: [0.2, 0.5, 0.2],
                        scale: [0.9, 1.1, 0.9]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <div className="absolute -top-1 -right-1">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)]" />
                    </div>
                  </>
                )}

                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-scroll-segment"
                    className="absolute -bottom-[12px] md:-bottom-[16px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-white to-purple-500 origin-left shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    style={{ scaleX: sectionProgress }}
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        {/* Agency Links (Desktop) */}
        <motion.div 
          animate={{ 
            width: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
            marginLeft: isHovered ? "2rem" : 0
          }}
          transition={navTransition}
          className="hidden lg:flex items-center gap-8 overflow-hidden border-l border-white/10 pl-8"
        >
          {agencies.map((agency) => (
            <Link
              key={agency.name}
              href={agency.path}
              className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.3em] hover:text-purple-400 transition-all relative group whitespace-nowrap"
            >
              {agency.name}
            </Link>
          ))}
        </motion.div>
      </motion.nav>
    );
}
