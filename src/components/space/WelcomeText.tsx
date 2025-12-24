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
    <div className="h-16 md:h-24 flex items-center justify-center overflow-hidden">
      <h1
        ref={textRef}
        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter"
      >
        {phrases[index]}
      </h1>
    </div>
  );
}
