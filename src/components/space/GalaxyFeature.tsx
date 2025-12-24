"use client";

import { motion } from "framer-motion";

export const GalaxyFeature = () => {
  return (
    <section className="relative py-32 px-4 md:px-20 z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="reveal-text">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-purple-500/50" />
            <span className="text-purple-400 font-bold uppercase tracking-[0.3em] text-[10px]">Cosmic Origins</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            THE MILKY WAY <br />
            <span className="text-zinc-700">OUR RADIANT CRADLE</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-xl font-light">
            Our galaxy is a vast spiral city of stars, spanning over 100,000 light-years. 
            It contains at least 100 billion planets and an equal number of stars, 
            all orbiting a supermassive black hole at its core.
          </p>
          <div className="flex items-center gap-8">
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
              Explore Core
            </button>
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-900 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                </div>
              ))}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-zinc-800 text-[10px] text-zinc-400 font-bold">
                +12k
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
          data-scroll
          data-scroll-speed="1"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
          <div className="relative glass-card aspect-square md:aspect-video rounded-[2.5rem] flex items-center justify-center overflow-hidden border border-white/5">
            <div className="text-center p-12">
              <div className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter opacity-10 absolute inset-0 flex items-center justify-center select-none">
                SPACE
              </div>
              <div className="relative">
                <div className="text-7xl md:text-8xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">13.8B</div>
                <div className="text-purple-500/80 uppercase tracking-[0.4em] text-[10px] font-black">Years Since Inception</div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[120px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
