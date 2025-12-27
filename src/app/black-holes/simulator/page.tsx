"use client";

import { CustomCursor } from "@/components/space/CustomCursor";
import { Taskbar } from "@/components/space/Taskbar";
import { BlackHoleSimulator } from "@/components/space/BlackHoleSimulator";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlackHoleSimulatorPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <CustomCursor />
      <Taskbar />
      
      <main className="pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#8b5cf6]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-400">Advanced Simulation</span>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 font-[family-name:var(--font-orbitron)]">
                BLACK HOLE <span className="text-zinc-800">SIMULATOR</span>
              </h1>
              <p className="text-zinc-500 text-lg font-light leading-relaxed">
                Interact with a high-fidelity 3D model of a supermassive black hole. 
                Adjust mass and accretion parameters to observe relativistic effects and gravitational pull.
              </p>
            </div>
            <Link 
              href="/black-holes"
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Back to Intel
            </Link>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/20 backdrop-blur-3xl relative">
            <BlackHoleSimulator />
            
            {/* Legend Overlay */}
            <div className="absolute bottom-8 left-8 z-30 flex gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Event Horizon</span>
                <div className="w-12 h-1 bg-black border border-white/20" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">Accretion Disk</span>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 via-orange-500 to-red-500" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section with technical details */}
      <section className="bg-zinc-900/30 border-t border-white/5 py-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Physics Engine</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Our simulator uses a particle-based approach to visualize the accretion disk. 
              Each particle's orbit is calculated based on its distance from the singularity, 
              simulating the differential rotation of gas and dust as it spirals toward the event horizon.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">Visual Rendering</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We employ additive blending and emissive materials to represent the high-energy 
              radiation emitted by the accretion disk. The central singularity is rendered as 
              a perfect sphere of absolute darkness, surrounded by a subtle quantum glow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
