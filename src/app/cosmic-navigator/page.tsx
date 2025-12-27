"use client";

import { CustomCursor } from "@/components/space/CustomCursor";
import { Taskbar } from "@/components/space/Taskbar";
import { CosmicNavigator } from "@/components/space/CosmicNavigator";
import { motion } from "framer-motion";

export default function CosmicNavigatorPage() {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <CustomCursor />
      <Taskbar />
      
      <main className="h-screen w-full relative">
        <CosmicNavigator />
        
        {/* Navigation Info Overlay */}
        <div className="absolute top-32 right-12 z-30 text-right max-w-md pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-black/20 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
              <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-3">Navigator Intel</h3>
              <p className="text-zinc-500 text-xs leading-relaxed italic">
                "The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff."
              </p>
              <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-purple-400 font-bold">
                <span>— CARL SAGAN</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-end gap-4">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Quantum Engine</span>
                <div className="w-12 h-px bg-zinc-800" />
                <span className="text-[10px] text-white font-mono">ACTIVE</span>
              </div>
              <div className="flex items-center justify-end gap-4">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Relativistic Drift</span>
                <div className="w-12 h-px bg-zinc-800" />
                <span className="text-[10px] text-white font-mono">0.0004c</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* HUD Elements */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Corner HUDs */}
          <div className="absolute top-24 left-0 w-full px-12 flex justify-between">
            <div className="h-16 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
            <div className="h-16 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
          </div>
          <div className="absolute bottom-32 left-0 w-full px-12 flex justify-between">
            <div className="h-16 w-px bg-gradient-to-t from-purple-500/50 to-transparent" />
            <div className="h-16 w-px bg-gradient-to-t from-purple-500/50 to-transparent" />
          </div>
        </div>
      </main>
    </div>
  );
}
