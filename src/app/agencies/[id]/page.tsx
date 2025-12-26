"use client";

import { use, useEffect, useRef, useState } from "react";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const GSAPStars = dynamic(() => import("@/components/space/GSAPStars").then(mod => mod.GSAPStars), { ssr: false });

interface TimelineItem {
  year: string;
  event: string;
  detail: string;
}

interface Facility {
  name: string;
  location: string;
  role: string;
}

interface Vehicle {
  name: string;
  type: string;
  status: string;
  payload: string;
}

interface Project {
  name: string;
  year: string;
  description: string;
  status: "Completed" | "Active" | "Planned";
}

interface FuturePlan {
  title: string;
  timeframe: string;
  description: string;
}

interface AgencyData {
  name: string;
  fullname: string;
  founded: string;
  hq: string;
  leadership: string;
  budget: string;
  workforce: string;
  description: string;
  motto: string;
  technicalOverview: string;
  facilities: Facility[];
  vehicles: Vehicle[];
  timeline: TimelineItem[];
  activeMissions: string[];
  capabilities: string[];
  projects: Project[];
  achievements: string[];
  futurePlans: FuturePlan[];
}

const agencyData: Record<string, AgencyData> = {
  nasa: {
    name: "NASA",
    fullname: "National Aeronautics and Space Administration",
    founded: "July 29, 1958",
    hq: "Washington, D.C., U.S.",
    leadership: "Bill Nelson (Administrator)",
    budget: "$25.4 Billion (FY2024)",
    workforce: "18,000+ Civil Servants",
    motto: "For the Benefit of All",
    description: "NASA is an independent agency of the U.S. federal government responsible for the civil space program, aeronautics research, and space research.",
    technicalOverview: "NASA operates a vast network of research centers and launch facilities. Its technical expertise spans deep space communication (DSN), reusable launch systems, and advanced robotics.",
    facilities: [
      { name: "Kennedy Space Center", location: "Florida", role: "Primary Launch Site" },
      { name: "Jet Propulsion Laboratory", location: "California", role: "Robotic Exploration" },
      { name: "Johnson Space Center", location: "Texas", role: "Human Spaceflight & Mission Control" },
      { name: "Goddard Space Flight Center", location: "Maryland", role: "Communications & Science" }
    ],
    vehicles: [
      { name: "Space Launch System (SLS)", type: "Super Heavy-lift", status: "Active", payload: "95t to LEO" },
      { name: "Orion", type: "Crew Capsule", status: "Active", payload: "4-6 Crew" },
      { name: "James Webb Space Telescope", type: "Space Observatory", status: "Operational", payload: "N/A" }
    ],
    timeline: [
      { year: "1958", event: "Establishment", detail: "NASA founded in response to Sputnik launch." },
      { year: "1969", event: "Apollo 11", detail: "First successful human moon landing." },
      { year: "1981", event: "Space Shuttle", detail: "Launch of STS-1, first orbital flight of the Shuttle." },
      { year: "1990", event: "Hubble Launch", detail: "Deployment of the first major optical space telescope." },
      { year: "2022", event: "Artemis I", detail: "First flight of SLS/Orion in lunar orbit mission." }
    ],
    activeMissions: [
      "Artemis Program (Lunar)",
      "Mars Perseverance Rover",
      "Parker Solar Probe",
      "International Space Station Ops",
      "Europa Clipper (In transit)"
    ],
    capabilities: [
      "Deep Space Communication",
      "Human Life Support Systems",
      "Planetary Entry & Descent",
      "Aeronautical Research",
      "Earth Science Monitoring"
    ],
    projects: [
      { name: "Artemis", year: "2022-Present", description: "Returning humans to the Moon, including the first woman and person of color.", status: "Active" },
      { name: "Mars 2020", year: "2020-Present", description: "Perseverance rover searching for signs of ancient life on Mars.", status: "Active" },
      { name: "Voyager 1 & 2", year: "1977-Present", description: "The farthest man-made objects, exploring interstellar space.", status: "Active" }
    ],
    achievements: [
      "First humans on the Moon (Apollo 11)",
      "First reusable orbital spacecraft (Space Shuttle)",
      "Discovery of water ice on Mars",
      "Launch of the most powerful telescope (JWST)",
      "First powered flight on another planet (Ingenuity)"
    ],
    futurePlans: [
      { title: "Artemis III", timeframe: "2026", description: "First crewed lunar landing of the 21st century." },
      { title: "Mars Sample Return", timeframe: "2030s", description: "Collaborative mission to bring Martian soil back to Earth." },
      { title: "Gateway Station", timeframe: "2028", description: "Construction of the first space station in lunar orbit." }
    ]
  },
  isro: {
    name: "ISRO",
    fullname: "Indian Space Research Organisation",
    founded: "August 15, 1969",
    hq: "Bengaluru, India",
    leadership: "S. Somanath (Chairman)",
    budget: "₹13,000 Crore (approx $1.6B)",
    workforce: "17,000+ Employees",
    motto: "Space technology in the service of humankind",
    description: "ISRO is the national space agency of India. It has developed cost-effective technologies for space exploration and satellite launch.",
    technicalOverview: "ISRO is a world leader in cost-efficient launch systems and remote sensing. It maintains one of the largest fleets of communication and earth observation satellites.",
    facilities: [
      { name: "Satish Dhawan Space Centre", location: "Sriharikota", role: "Primary Launch Port" },
      { name: "U R Rao Satellite Centre", location: "Bengaluru", role: "Satellite Design & Dev" },
      { name: "Vikram Sarabhai Space Centre", location: "Thiruvananthapuram", role: "Rocket & Launch Vehicle Dev" }
    ],
    vehicles: [
      { name: "LVM3", type: "Heavy-lift", status: "Active", payload: "10t to LEO" },
      { name: "PSLV", type: "Medium-lift", status: "Active", payload: "3.8t to LEO" },
      { name: "SSLV", type: "Small-lift", status: "Active", payload: "500kg to LEO" }
    ],
    timeline: [
      { year: "1969", event: "Formation", detail: "Founded by Dr. Vikram Sarabhai." },
      { year: "1975", event: "Aryabhata", detail: "India's first satellite launched via USSR." },
      { year: "2008", event: "Chandrayaan-1", detail: "India's first lunar probe discovers water on Moon." },
      { year: "2014", event: "Mars Orbiter Mission", detail: "First nation to reach Mars on first attempt." },
      { year: "2023", event: "Chandrayaan-3", detail: "First soft landing near Moon's South Pole." }
    ],
    activeMissions: [
      "Aditya-L1 (Solar Observation)",
      "Gaganyaan (Uncrewed testing)",
      "RISAT Series",
      "GSAT Communication fleet",
      "EOS (Earth Observation)"
    ],
    capabilities: [
      "Cryogenic Engine Tech",
      "Remote Sensing",
      "Interplanetary Navigation",
      "Indigenous Navigation (NavIC)"
    ],
    projects: [
      { name: "Gaganyaan", year: "2024-Present", description: "India's first human spaceflight program to send crew to LEO.", status: "Active" },
      { name: "Chandrayaan-3", year: "2023", description: "Successful soft landing on the lunar south pole.", status: "Completed" },
      { name: "MOM (Mangalyaan)", year: "2013-2022", description: "Mars Orbiter Mission, India's first interplanetary mission.", status: "Completed" }
    ],
    achievements: [
      "First to reach Mars on maiden attempt",
      "First soft landing on the Lunar South Pole",
      "World record for launching 104 satellites in one go",
      "Development of cost-effective Cryogenic engines",
      "One of the largest Earth observation satellite constellations"
    ],
    futurePlans: [
      { title: "Bharatiya Antariksha Station", timeframe: "2035", description: "Establishment of an indigenous space station." },
      { title: "Shukrayaan-1", timeframe: "2028", description: "Orbiter mission to explore the atmosphere of Venus." },
      { title: "Lunar Polar Exploration", timeframe: "2026-28", description: "Joint mission with JAXA for lunar surface analysis." }
    ]
  },
  esa: {
    name: "ESA",
    fullname: "European Space Agency",
    founded: "May 30, 1975",
    hq: "Paris, France",
    leadership: "Josef Aschbacher (Director General)",
    budget: "€7.8 Billion (2024)",
    workforce: "2,200+ (Direct), 10,000+ (Contracted)",
    motto: "Exploration and Discovery",
    description: "An intergovernmental organization of 22 member states dedicated to the exploration of space.",
    technicalOverview: "ESA coordinates the financial and intellectual resources of its members to undertake programs far beyond the scope of any single European country.",
    facilities: [
      { name: "Guiana Space Centre", location: "Kourou, French Guiana", role: "Main Launch Site" },
      { name: "ESTEC", location: "Noordwijk, Netherlands", role: "Technical Heart" },
      { name: "ESOC", location: "Darmstadt, Germany", role: "Operations Control" }
    ],
    vehicles: [
      { name: "Ariane 6", type: "Heavy-lift", status: "Active/Testing", payload: "21.6t to LEO" },
      { name: "Vega-C", type: "Small-lift", status: "Active", payload: "2.3t to LEO" }
    ],
    timeline: [
      { year: "1975", event: "ESA Convention", detail: "Merging ELDO and ESRO to form ESA." },
      { year: "2004", event: "Rosetta Launch", detail: "Mission to orbit and land on Comet 67P." },
      { year: "2016", event: "Galileo Ops", detail: "European GNSS becomes operational." },
      { year: "2023", event: "JUICE Launch", detail: "Mission to explore Jupiter's icy moons." }
    ],
    activeMissions: [
      "Galileo Constellation",
      "Copernicus Program",
      "ExoMars TGO",
      "BepiColombo (Mercury)",
      "Solar Orbiter"
    ],
    capabilities: [
      "International Cooperation",
      "Advanced Robotics",
      "Global Navigation Systems",
      "Earth Environment Monitoring"
    ],
    projects: [
      { name: "JUICE", year: "2023-Present", description: "Jupiter Icy Moons Explorer mission to search for life.", status: "Active" },
      { name: "Rosetta", year: "2004-2016", description: "Historic mission to orbit and land on a comet.", status: "Completed" },
      { name: "Copernicus", year: "2014-Present", description: "World's most advanced Earth monitoring system.", status: "Active" }
    ],
    achievements: [
      "First landing on a comet (Philae/Rosetta)",
      "Development of the Galileo satellite navigation system",
      "Leader in Earth observation data (Copernicus)",
      "Pioneer in international space collaboration",
      "Successful launch of James Webb (Ariane 5)"
    ],
    futurePlans: [
      { title: "ExoMars Rover", timeframe: "2028", description: "Search for life beneath the Martian surface." },
      { title: "LISA", timeframe: "2030s", description: "First space-based gravitational wave observatory." },
      { title: "HERA", timeframe: "2024", description: "Planetary defense mission to study asteroid deflection." }
    ]
  },
  spacex: {
    name: "SpaceX",
    fullname: "Space Exploration Technologies Corp.",
    founded: "March 14, 2002",
    hq: "Hawthorne, California, U.S.",
    leadership: "Elon Musk (CEO & CTO)",
    budget: "Private (~$180B Valuation)",
    workforce: "13,000+ Employees",
    motto: "Making Humanity Multiplanetary",
    description: "SpaceX is an American aerospace manufacturer and space transport services company.",
    technicalOverview: "SpaceX pioneered the use of vertical landing and reuse of orbital-class rocket boosters, dramatically reducing the cost of access to space.",
    facilities: [
      { name: "Starbase", location: "Boca Chica, Texas", role: "Starship Dev & Launch" },
      { name: "LC-39A (KSC)", location: "Florida", role: "Crew & Heavy Launch" },
      { name: "SLC-40", location: "Florida", role: "Falcon 9 Operations" },
      { name: "McGregor", location: "Texas", role: "Rocket Testing" }
    ],
    vehicles: [
      { name: "Falcon 9", type: "Medium-lift / Reusable", status: "Active", payload: "22.8t to LEO" },
      { name: "Falcon Heavy", type: "Heavy-lift / Reusable", status: "Active", payload: "63.8t to LEO" },
      { name: "Starship", type: "Super Heavy-lift / Fully Reusable", status: "Development/Flight Testing", payload: "100t-150t to LEO" },
      { name: "Dragon 2", type: "Crew/Cargo Capsule", status: "Active", payload: "7 Crew" }
    ],
    timeline: [
      { year: "2008", event: "Falcon 1 Orbit", detail: "First private liquid-fuel rocket to reach orbit." },
      { year: "2012", event: "Dragon ISS Dock", detail: "First private craft to dock with the ISS." },
      { year: "2015", event: "First Landing", detail: "First vertical landing of an orbital booster." },
      { year: "2020", event: "Demo-2", detail: "First crewed flight from US soil since 2011." },
      { year: "2024", event: "Starship Flight 3/4", detail: "Major milestones in ship recovery and orbit." }
    ],
    activeMissions: [
      "Starlink Constellation Deployment",
      "ISS Commercial Resupply (CRS)",
      "Commercial Crew Program",
      "Transporter Rideshare Missions",
      "Starship Development"
    ],
    capabilities: [
      "Rapid Rocket Reusability",
      "Low Earth Orbit Internet",
      "Heavy Lift Capability",
      "Private Astronautics",
      "In-orbit Propellant Transfer (Planned)"
    ],
    projects: [
      { name: "Starship", year: "2019-Present", description: "Fully reusable transport system designed for Moon and Mars.", status: "Active" },
      { name: "Starlink", year: "2019-Present", description: "Global satellite internet constellation.", status: "Active" },
      { name: "Crew Dragon", year: "2020-Present", description: "Regular human transport to the International Space Station.", status: "Active" }
    ],
    achievements: [
      "First private company to send humans to orbit",
      "First reuse of an orbital-class rocket booster",
      "Most frequent orbital launch cadence in history",
      "Largest satellite constellation in orbit (Starlink)",
      "First successful recovery of a super-heavy booster (IFT-5)"
    ],
    futurePlans: [
      { title: "Mars Colony", timeframe: "2029-2040", description: "Sending the first uncrewed and crewed Starships to Mars." },
      { title: "HLS (Artemis)", timeframe: "2026", description: "Providing the Human Landing System for NASA's Artemis III." },
      { title: "Global Starship Travel", timeframe: "2030s", description: "Point-to-point Earth transport in under 1 hour." }
    ]
  }
};

export default function AgencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = agencyData[id as keyof typeof agencyData] || agencyData.nasa;

  return (
    <div className="bg-[#020205] text-zinc-300 font-sans selection:bg-blue-500/30 min-h-screen">
      <CustomCursor />
      <Taskbar />
      <MilkyWay />

      {/* Sidebar Navigation - Fixed - Outside SmoothScroll to maintain position */}
      <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50 text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600">
         <a href="#overview" className="hover:text-white transition-colors flex items-center gap-4 group">
           <span className="w-4 h-px bg-zinc-800 group-hover:w-8 group-hover:bg-blue-500 transition-all" /> 01 Overview
         </a>
         <a href="#capabilities" className="hover:text-white transition-colors flex items-center gap-4 group">
           <span className="w-4 h-px bg-zinc-800 group-hover:w-8 group-hover:bg-blue-500 transition-all" /> 02 Arsenal
         </a>
         <a href="#projects" className="hover:text-white transition-colors flex items-center gap-4 group">
           <span className="w-4 h-px bg-zinc-800 group-hover:w-8 group-hover:bg-blue-500 transition-all" /> 03 Projects
         </a>
         <a href="#achievements" className="hover:text-white transition-colors flex items-center gap-4 group">
           <span className="w-4 h-px bg-zinc-800 group-hover:w-8 group-hover:bg-blue-500 transition-all" /> 04 Record
         </a>
         <a href="#roadmap" className="hover:text-white transition-colors flex items-center gap-4 group">
           <span className="w-4 h-px bg-zinc-800 group-hover:w-8 group-hover:bg-blue-500 transition-all" /> 05 Horizon
         </a>
         <a href="#infrastructure" className="hover:text-white transition-colors flex items-center gap-4 group">
           <span className="w-4 h-px bg-zinc-800 group-hover:w-8 group-hover:bg-blue-500 transition-all" /> 06 Network
         </a>
      </div>

      <SmoothScroll key={id}>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
          
          {/* Header Section - High Impact Dossier Style */}
          <header id="overview" className="relative mb-32">
            <div className="absolute -left-20 top-0 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none font-[family-name:var(--font-syncopate)]">
              {data.name}
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-blue-500 font-mono text-xs tracking-[0.4em] mb-8"
              >
                <span className="w-12 h-px bg-blue-500/50" />
                SECURE DATA DOSSIER // {id.toUpperCase()}
              </motion.div>
              
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                <div className="max-w-3xl">
                  <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 uppercase leading-none font-[family-name:var(--font-syncopate)]">
                    {data.name}
                  </h1>
                  <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-8">{data.fullname}</p>
                  <p className="text-2xl text-zinc-300 font-light leading-relaxed italic border-l-2 border-blue-500/30 pl-8">
                    "{data.motto}"
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                      <span className="block text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">Established</span>
                      <span className="text-white font-mono text-lg">{data.founded.split(',')[1] || data.founded}</span>
                   </div>
                   <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-sm">
                      <span className="block text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">Budget</span>
                      <span className="text-white font-mono text-lg">{data.budget.split('(')[0]}</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                 <div className="lg:col-span-8">
                    <h3 className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.3em] mb-6">Mission Briefing</h3>
                    <p className="text-xl text-zinc-400 leading-relaxed font-light">
                      {data.description}
                    </p>
                 </div>
                 <div className="lg:col-span-4 space-y-8">
                    <div>
                       <span className="block text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">Command</span>
                       <span className="text-white text-sm font-medium">{data.leadership}</span>
                    </div>
                    <div>
                       <span className="block text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">Headquarters</span>
                       <span className="text-white text-sm font-medium">{data.hq}</span>
                    </div>
                    <div>
                       <span className="block text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">Personnel</span>
                       <span className="text-white text-sm font-medium">{data.workforce}</span>
                    </div>
                 </div>
              </div>
            </div>
          </header>

          {/* Technical Arsenal - Bento Grid */}
          <section id="capabilities" className="mb-40">
             <div className="flex items-center gap-6 mb-16">
               <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Technical Arsenal</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Capabilities Card */}
                <div className="lg:col-span-1 p-8 rounded-3xl bg-blue-600/5 border border-blue-500/20 flex flex-col justify-between">
                   <div>
                      <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-4 block">Core Competencies</span>
                      <ul className="space-y-4">
                        {data.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-center gap-4 text-zinc-300 group cursor-default">
                             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
                             <span className="text-sm font-medium">{cap}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                   <div className="mt-12 pt-8 border-t border-blue-500/10">
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {data.technicalOverview}
                      </p>
                   </div>
                </div>

                {/* Vehicles Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                   {data.vehicles.map((v, i) => (
                     <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex justify-between items-start mb-6">
                           <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{v.name}</h4>
                           <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${v.status.includes('Active') || v.status.includes('Operational') ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                              {v.status}
                           </span>
                        </div>
                        <div className="space-y-4">
                           <div>
                              <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-1">Classification</span>
                              <span className="text-sm text-zinc-300">{v.type}</span>
                           </div>
                           <div>
                              <span className="block text-[9px] text-zinc-600 uppercase font-black tracking-widest mb-1">Payload Capacity</span>
                              <span className="text-sm font-mono text-zinc-400">{v.payload}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Strategic Projects Gallery */}
          <section id="projects" className="mb-40">
             <div className="flex items-center gap-6 mb-16">
               <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Strategic Projects</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.projects.map((p, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all p-1">
                     <div className="p-8 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                           <span className="text-blue-500 font-mono text-xs">{p.year}</span>
                           <span className={`w-2 h-2 rounded-full ${p.status === 'Active' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-600'}`} />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-4">{p.name}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-1">{p.description}</p>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase font-black tracking-widest">
                           <span>Status: {p.status}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Record of Achievements */}
          <section id="achievements" className="mb-40">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-4">
                   <h2 className="text-white text-3xl font-black uppercase tracking-tighter mb-8 leading-tight">
                     Historical <br /> Record & <br /> <span className="text-blue-500">Milestones</span>
                   </h2>
                   <p className="text-zinc-500 text-sm leading-relaxed">
                     A comprehensive log of breakthrough operations and foundational successes that have shaped modern space exploration.
                   </p>
                </div>
                
                <div className="lg:col-span-8">
                   <div className="grid grid-cols-1 gap-4">
                      {data.achievements.map((a, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-blue-500/30 transition-all">
                           <span className="text-blue-500 font-mono text-lg font-black opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                           <p className="text-zinc-300 font-medium group-hover:text-white transition-colors">{a}</p>
                        </div>
                      ))}
                   </div>
                   
                   {/* Timeline sub-section */}
                   <div className="mt-20 space-y-12 border-l border-zinc-800 pl-10 ml-4">
                      {data.timeline.map((t, i) => (
                        <div key={i} className="relative">
                           <div className="absolute -left-[45px] top-1 w-2 h-2 rounded-full bg-blue-500" />
                           <span className="text-blue-500 font-mono text-sm font-black mb-2 block">{t.year}</span>
                           <h4 className="text-white font-bold mb-3">{t.event}</h4>
                           <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">{t.detail}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Future Horizon - Roadmap */}
          <section id="roadmap" className="mb-40 py-24 px-8 md:px-16 rounded-[3rem] bg-gradient-to-br from-blue-600/10 via-transparent to-transparent border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
             
             <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                   <div>
                      <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-4 block">The Future Record</span>
                      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">Strategic Horizon</h2>
                   </div>
                   <p className="max-w-md text-zinc-500 text-sm italic">
                     "Charting the course for the next generation of interplanetary existence."
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   {data.futurePlans.map((plan, i) => (
                     <div key={i} className="relative">
                        <div className="text-zinc-800 text-6xl font-black absolute -top-8 -left-4 select-none pointer-events-none opacity-50">0{i+1}</div>
                        <div className="relative pt-4">
                           <span className="text-blue-500 font-mono text-xs font-bold mb-4 block">TARGET: {plan.timeframe}</span>
                           <h4 className="text-2xl font-bold text-white mb-4">{plan.title}</h4>
                           <p className="text-zinc-400 text-sm leading-relaxed">{plan.description}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </section>

          {/* Operational Infrastructure */}
          <section id="infrastructure" className="mb-40">
             <div className="flex items-center gap-6 mb-16">
               <h2 className="text-white text-3xl font-black uppercase tracking-tighter">Global Infrastructure</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.facilities.map((f, i) => (
                  <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-blue-500/20 transition-all group">
                     <div className="mb-8">
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-black uppercase tracking-widest">{f.role}</span>
                     </div>
                     <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{f.name}</h4>
                     <p className="text-zinc-500 text-xs font-mono">{f.location.toUpperCase()}</p>
                  </div>
                ))}
             </div>
             
             {/* Active Operations Sub-card */}
             <div className="mt-12 p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row gap-12">
                   <div className="lg:w-1/3">
                      <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-3">
                         <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         Active Operations
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed">
                         Live telemetry feeds from active mission clusters. Data refreshed every orbital cycle.
                      </p>
                   </div>
                   <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data.activeMissions.map((m, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 group cursor-default">
                           <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{m}</span>
                           <span className="text-[9px] font-mono text-zinc-600">NOMINAL</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Footer Metadata */}
          <footer className="pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-zinc-600 font-mono tracking-[0.4em] uppercase" data-scroll-section>
             <div>Source: Official {data.name} Communications Archive</div>
             <div className="flex gap-8">
                <span>Last Refreshed: {new Date().toLocaleDateString()}</span>
                <span>System Status: Online</span>
             </div>
          </footer>

        </div>
      </SmoothScroll>
    </div>
  );
}
