"use client";

import dynamic from "next/dynamic";
import { useStarContext } from "@/context/StarContext";

const GSAPStars = dynamic(() => import("./GSAPStars").then(mod => mod.GSAPStars), { ssr: false });

export function StarBackground() {
  const { speed } = useStarContext();

  return (
    <>
      <div className="fixed inset-0 z-[-3] bg-black pointer-events-none" />
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,1)_0%,rgba(0,0,0,0.4)_40%,transparent_100%)] pointer-events-none" />
      <div className="fixed inset-0 z-[-1] bg-gradient-to-b from-black/60 via-black/20 to-[#030014] pointer-events-none opacity-90" />
      <GSAPStars speed={speed} count={2000} />
    </>
  );
}
