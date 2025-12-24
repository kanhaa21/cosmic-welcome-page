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
        y: -10,
        filter: "blur(10px)",
        scale: 0.95,
        duration: 0.8,
        delay: 3,
        ease: "power3.in"
      })
      .set(textRef.current, { y: 10, scale: 1.05, filter: "blur(10px)" })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out"
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
