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
      const tl = gsap.timeline({
        repeat: -1,
        onRepeat: () => {
          setIndex((prev) => (prev + 1) % phrases.length);
        }
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 2.5,
        ease: "power2.in"
      })
      .set(textRef.current, { y: 20 })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
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
