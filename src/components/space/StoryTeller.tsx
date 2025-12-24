"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const milestones = [
  {
    year: "1957",
    title: "Sputnik 1",
    agency: "Soviet Union",
    description: "The dawn of the space age. The first artificial satellite to orbit Earth, changing history forever.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    color: "from-zinc-500/20"
  },
  {
    year: "1961",
    title: "Vostok 1",
    agency: "Soviet Union",
    description: "Yuri Gagarin becomes the first human to journey into outer space, orbiting the Earth once.",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-500/20"
  },
  {
    year: "1969",
    title: "Apollo 11",
    agency: "NASA",
    description: "One small step for man, one giant leap for mankind. Humans walk on the lunar surface for the first time.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-600/20"
  },
  {
    year: "1977",
    title: "Voyager 1",
    agency: "NASA",
    description: "The farthest human-made object. A message in a bottle cast into the cosmic ocean, carrying the Golden Record.",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=1200",
    color: "from-purple-500/20"
  },
  {
    year: "1990",
    title: "Hubble Telescope",
    agency: "NASA / ESA",
    description: "Our eye on the universe. Capturing the birth of stars and the collision of galaxies billions of light-years away.",
    image: "https://images.unsplash.com/photo-1446776879694-90d17c71283d?auto=format&fit=crop&q=80&w=1200",
    color: "from-emerald-500/20"
  },
  {
    year: "1998",
    title: "The ISS",
    agency: "International",
    description: "A symbol of global unity. The largest modular space station in low Earth orbit, permanently inhabited since 2000.",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-400/20"
  },
  {
    year: "2012",
    title: "Curiosity Rover",
    agency: "NASA",
    description: "A nuclear-powered chemist on wheels. Searching for signs of past life and habitability in the Martian dust.",
    image: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e?auto=format&fit=crop&q=80&w=1200",
    color: "from-orange-600/20"
  },
  {
    year: "2015",
    title: "Falcon 9 Landing",
    agency: "SpaceX",
    description: "The era of reusability begins. SpaceX successfully lands an orbital-class rocket back on Earth.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=1200",
    color: "from-zinc-700/20"
  },
  {
    year: "2021",
    title: "James Webb",
    agency: "NASA / ESA / CSA",
    description: "The most powerful space telescope ever built, peering through cosmic dust to see the first stars in existence.",
    image: "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&q=80&w=1200",
    color: "from-amber-600/20"
  },
  {
    year: "2023",
    title: "Chandrayaan-3",
    agency: "ISRO",
    description: "India becomes the first nation to land near the lunar south pole, proving the power of scientific resourcefulness.",
    image: "https://images.unsplash.com/photo-1444703686981-a3abb997b724?auto=format&fit=crop&q=80&w=1200",
    color: "from-orange-500/20"
  }
];

export function StoryTeller() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % milestones.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-8 bg-black">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center">
        <h2 className="text-purple-500 text-[10px] font-black uppercase tracking-[1em] mb-1">Cosmic Milestones</h2>
        <div className="text-xl md:text-3xl font-black text-white tracking-tighter">Traversing <span className="text-zinc-700">Space-Time</span></div>
      </div>

      <div className="relative w-full max-w-4xl px-4 h-[450px] md:h-[350px] flex items-center justify-center">
        <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, filter: "blur(10px)", scale: 0.98 }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, x: -50, filter: "blur(10px)", scale: 0.98 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden glass-card border-white/5 bg-gradient-to-br ${milestones[index].color} to-transparent group`}
            >
            <div className="absolute inset-0">
              <img 
                src={milestones[index].image} 
                alt={milestones[index].title}
                className="w-full h-full object-cover opacity-30 transition-transform duration-[6000ms] ease-linear scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            </div>
            
            <div className="relative h-full flex flex-col justify-center px-6 md:px-16 max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-purple-500 font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[8px] md:text-[10px] mb-2 md:mb-4"
              >
                {milestones[index].year} — {milestones[index].agency}
              </motion.span>
              
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-6xl font-black text-white mb-2 md:mb-4 tracking-tighter"
              >
                {milestones[index].title}
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-zinc-300 text-sm md:text-xl leading-relaxed font-light italic max-w-lg"
              >
                "{milestones[index].description}"
              </motion.p>
              
              <div className="mt-6 md:mt-8 flex items-center gap-4">
                <div className="flex gap-1 md:gap-1.5 flex-wrap">
                  {milestones.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-4 md:w-8 bg-purple-500' : 'w-1 md:w-2 bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Background numeral */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 text-[8rem] md:text-[15rem] font-black text-white/[0.02] select-none pointer-events-none">
              {index + 1}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 left-0 w-full h-0.5 bg-white/5">
        <motion.div
          key={index}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-purple-500/30"
        />
      </div>
    </section>
  );
}
