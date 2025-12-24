"use client";

import { MilkyWay } from "@/components/space/MilkyWay";
import { WelcomeText } from "@/components/space/WelcomeText";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen selection:bg-purple-500/30">
        <Taskbar />
        <MilkyWay />
        
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center z-10"
          >
            <div className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <WelcomeText />
            </div>
            <p className="mt-6 text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              Venture into the cosmic abyss where galaxies dance and stars tell stories of eternity. 
              The universe is not just above us, it is within us.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-zinc-500 text-sm uppercase tracking-[0.2em]">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
          </motion.div>
        </section>

        {/* Content Sections */}
        <section className="relative py-32 px-4 md:px-20 z-10 bg-gradient-to-b from-transparent via-black/80 to-black">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                The Milky Way <br />
                <span className="text-zinc-500">Our Celestial Home</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Our galaxy is a vast spiral city of stars, spanning over 100,000 light-years. 
                It contains at least 100 billion planets and an equal number of stars, 
                all orbiting a supermassive black hole at its core.
              </p>
              <div className="h-px w-20 bg-purple-500" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">13.8B</div>
                <div className="text-zinc-500 uppercase tracking-widest text-sm">Years Since the Big Bang</div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[80px]" />
            </motion.div>
          </div>
        </section>

        <section className="relative py-32 px-4 md:px-20 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-12"
            >
              Infinite Wonders Await
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { title: "Nebulae", desc: "Celestial nurseries where new stars are born from dust and gas." },
                { title: "Black Holes", desc: "Regions of spacetime where gravity is so strong nothing escapes." },
                { title: "Exoplanets", desc: "Distant worlds orbiting other stars, some potentially habitable." }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <footer className="relative py-20 px-4 text-center border-t border-white/5 z-10">
          <p className="text-zinc-600 text-sm tracking-widest uppercase">
            Designed for those who look up
          </p>
        </footer>
      </div>
    </SmoothScroll>
  );
}
