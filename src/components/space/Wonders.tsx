"use client";

export const Wonders = () => {
  const wonders = [
    { 
      title: "Nebulae", 
      desc: "Celestial nurseries where new stars are born from dust and gas, creating stunning tapestries of cosmic color.",
      icon: "✧",
      accent: "from-purple-500/20 to-transparent"
    },
    { 
      title: "Black Holes", 
      desc: "Regions of spacetime where gravity is so strong that nothing, not even light, can escape their grasp.",
      icon: "⦿",
      accent: "from-blue-500/20 to-transparent"
    },
    { 
      title: "Exoplanets", 
      desc: "Distant worlds orbiting other stars, some potentially habitable, waiting to be discovered by our curiosity.",
      icon: "🪐",
      accent: "from-emerald-500/20 to-transparent"
    }
  ];

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-20 z-10" data-scroll-section>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20 reveal-text">
          <span className="text-purple-500 font-black uppercase tracking-[0.6em] text-[10px] mb-4">
            Phenomena
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-none">
            INFINITE <span className="text-zinc-800">WONDERS</span>
          </h2>
          <div className="w-12 h-[1px] bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {wonders.map((item, i) => (
            <div
              key={item.title}
              className="group relative p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] glass-card border-white/5 transition-all duration-700 hover:bg-white/[0.04] reveal-text overflow-hidden"
              data-scroll
              data-scroll-speed={i * 0.1 + 0.2}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-8 opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed font-light group-hover:text-zinc-300 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
