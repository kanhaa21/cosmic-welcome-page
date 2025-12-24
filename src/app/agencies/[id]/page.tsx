"use client";

import { MilkyWay } from "@/components/space/MilkyWay";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { motion } from "framer-motion";

interface AgencyData {
  name: string;
  description: string;
  achievements: string[];
  upcoming: string[];
  color: string;
}

const agencyData: Record<string, AgencyData> = {
  nasa: {
    name: "NASA",
    description: "National Aeronautics and Space Administration (USA)",
    achievements: [
      "Apollo 11 Moon Landing (1969)",
      "Voyager 1 & 2 Grand Tour",
      "James Webb Space Telescope Launch",
      "Mars Rover Missions (Curiosity, Perseverance)"
    ],
    upcoming: [
      "Artemis Program (Return to Moon)",
      "Mars Sample Return Mission",
      "Europa Clipper Exploration"
    ],
    color: "from-blue-600 to-red-600"
  },
  isro: {
    name: "ISRO",
    description: "Indian Space Research Organisation",
    achievements: [
      "Mars Orbiter Mission (Mangalyaan)",
      "Chandrayaan-3 Moon South Pole Landing",
      "104 Satellites in a single launch",
      "ASLV & PSLV rocket success"
    ],
    upcoming: [
      "Gaganyaan (Manned Mission)",
      "Aditya-L1 (Solar Mission)",
      "Shukrayaan-1 (Venus Mission)"
    ],
    color: "from-orange-500 to-blue-500"
  },
  esa: {
    name: "ESA",
    description: "European Space Agency",
    achievements: [
      "Rosetta Comet Landing",
      "Gaia Milky Way Mapping",
      "Ariane Rocket Series",
      "Planck Cosmic Background Study"
    ],
    upcoming: [
      "JUICE (Jupiter Icy Moons Explorer)",
      "Euclid Dark Matter Mission",
      "ExoMars Rover"
    ],
    color: "from-blue-700 to-zinc-500"
  },
  spacex: {
    name: "SpaceX",
    description: "Space Exploration Technologies Corp.",
    achievements: [
      "First Reusable Orbital Rocket (Falcon 9)",
      "Crew Dragon Commercial Missions",
      "Starlink Global Connectivity",
      "Falcon Heavy Triple Landing"
    ],
    upcoming: [
      "Starship Orbital Test Flight",
      "Mars Colonization Fleet",
      "Lunar Starship for Artemis"
    ],
    color: "from-zinc-700 to-white"
  }
};

export default function AgencyPage({ params }: { params: { id: string } }) {
  const data = agencyData[params.id as keyof typeof agencyData];

  if (!data) return <div className="text-white p-20">Agency not found.</div>;

  return (
    <SmoothScroll>
      <div className="relative min-h-screen">
        <MilkyWay />
        <Taskbar />
        
        <main className="relative z-10 pt-40 pb-20 px-4 md:px-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h1 className={`text-6xl md:text-8xl font-black bg-gradient-to-r ${data.color} bg-clip-text text-transparent mb-4`}>
                {data.name}
              </h1>
              <p className="text-2xl text-zinc-400 font-medium">{data.description}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.section
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-purple-500" />
                  Key Achievements
                </h2>
                <ul className="space-y-6">
                  {data.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-purple-500 mt-1">✦</span>
                      <p className="text-zinc-300 text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-blue-500" />
                  Upcoming Projects
                </h2>
                <ul className="space-y-6">
                  {data.upcoming.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-blue-500 mt-1">☄</span>
                      <p className="text-zinc-300 text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
