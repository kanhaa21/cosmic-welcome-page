"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const phrases = [
  "Explore the Infinite",
  "Discover New Horizons",
  "Journey Through Stars",
  "Witness Cosmic Beauty",
  "Unravel Cosmic Mysteries"
];

export function WelcomeText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [index, setIndex] = useState(0);

    useEffect(() => {
      const ctx = gsap.context(() => {
        if (!textRef.current) return;
        
        const tl = gsap.timeline({
          repeat: -1,
        });
    
        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          filter: "blur(20px)",
          scale: 0.9,
          duration: 1.2,
          delay: 3,
          ease: "expo.inOut"
        })
        .call(() => {
          setIndex((prev) => (prev + 1) % phrases.length);
        })
        .set(textRef.current, { y: 20, scale: 1.1, filter: "blur(20px)" })
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out"
        });
      });
    
      return () => ctx.revert();
    }, []);

  return (
    <div className="h-12 md:h-20 flex items-center justify-center overflow-hidden">
      <h1
        ref={textRef}
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter font-[family-name:var(--font-orbitron)] uppercase"
      >
        {phrases[index]}
      </h1>
    </div>
  );
}
