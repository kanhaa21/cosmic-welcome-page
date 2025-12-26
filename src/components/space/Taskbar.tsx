"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "./SmoothScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sections = [
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
  const router = useRouter();
  const { scroll: locoScroll } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [globalProgress, setGlobalProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isAgencyPage = pathname?.startsWith("/agencies/");

  useEffect(() => {
    if (pathname === "/solar-system") {
      setActiveSection("solar");
      return;
    }
    if (isAgencyPage) {
      setActiveSection("");
      return;
    }

    const ctx = gsap.context(() => {
      const scroller = document.querySelector(".smooth-scroll");
      if (!scroller) return;

      ScrollTrigger.create({
        trigger: scroller,
        scroller: scroller,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setGlobalProgress(self.progress);
        }
      });

      sections.forEach((section) => {
        const triggerElement = document.querySelector(`#${section.id}`);
        if (!triggerElement || !(triggerElement instanceof HTMLElement)) return;

        ScrollTrigger.create({
          trigger: triggerElement,
          scroller: scroller,
          start: "top 20%",
          end: "bottom 20%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(section.id);
          }
        });
      });
    });

    return () => ctx.revert();
  }, [locoScroll, pathname]);

  const handleScroll = (id: string) => {
    if (locoScroll) {
      const target = document.querySelector(`#${id}`);
      if (target) {
        locoScroll.scrollTo(target, {
          offset: 0,
          duration: 1.5,
          easing: [0.25, 0.00, 0.35, 1.00]
        });
      }
    }
  };

  const handleNavigation = (section: any) => {
    if (section.path) {
      if (pathname !== section.path) {
        router.push(section.path);
      }
      return;
    }
    
    if (pathname !== "/") {
      router.push(`/#${section.id}`);
      return;
    }
    
    handleScroll(section.id);
  };

  return (
    <motion.nav
      layout
      initial={{ y: -50, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full border border-white/5 bg-[#030014]/60 backdrop-blur-3xl flex items-center shadow-[0_30px_60px_-12px_rgba(0,0,0,0.9)] hover:border-white/10 px-6 py-2.5 min-w-max group overflow-hidden"
      transition={{
        layout: { 
          duration: isHovered ? 0.6 : 1.2,
          ease: [0.16, 1, 0.3, 1] 
        },
        y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
    >
      <div className="flex items-center gap-6 relative">
        <motion.button
          layout="position"
          onClick={() => {
            if (pathname !== "/") router.push("/");
            else handleScroll("hero");
          }}
          className="text-[12px] font-bold uppercase tracking-[0.6em] transition-all relative whitespace-nowrap bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] font-[family-name:var(--font-syncopate)] shrink-0 z-10"
        >
          NEXUS
        </motion.button>

        <AnimatePresence mode="popLayout">
          {isHovered && (
            <motion.div
              key="expanded-nav"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)", x: -10 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                filter: "blur(10px)", 
                x: -10,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex items-center gap-6"
            >
              <div className="w-px h-4 bg-white/10 shrink-0" />
              
              <div className="flex items-center gap-2">
                {sections.map((section) => (
                  <motion.button
                    layout="position"
                    key={section.id}
                    onClick={() => handleNavigation(section)}
                    className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-all relative px-3 py-1.5 rounded-full whitespace-nowrap ${
                      activeSection === section.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                    } ${
                      section.id === "solar" 
                        ? "bg-purple-500/10 border border-purple-500/20 text-purple-300" 
                        : ""
                    }`}
                  >
                    <span className="relative z-10">{section.name}</span>
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 border border-white/10 bg-white/[0.03] rounded-full -z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

                <div className="flex items-center gap-6 pl-6 border-l border-white/10">
                  {agencies.map((agency) => (
                    <motion.div layout="position" key={agency.name}>
                      <Link
                        href={agency.path}
                        className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em] hover:text-purple-400 transition-all whitespace-nowrap"
                      >
                        {agency.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
              </motion.div>

          )}
        </AnimatePresence>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        style={{ width: "100%", scaleX: globalProgress, originX: 0.5, opacity: 0.5 }}
      />
      
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.nav>
  );
}
