"use client";

import dynamic from "next/dynamic";
import { useStarContext } from "@/context/StarContext";

const GSAPStars = dynamic(() => import("./GSAPStars").then(mod => mod.GSAPStars), { ssr: false });

export function StarBackground() {
  const { speed } = useStarContext();

    return (
      <>
        <div className="fixed inset-0 z-[-3] bg-black pointer-events-none" />
        
        {/* Deep space nebula glows */}
        <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900/5 blur-[100px] rounded-full" />
        </div>

          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,1)_0%,rgba(0,0,0,0.5)_30%,rgba(0,0,0,0)_70%)] pointer-events-none" />
          <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black/60 via-transparent to-[#030014] pointer-events-none opacity-90" />

          <GSAPStars speed={speed} count={450} />
      </>
    );
}
