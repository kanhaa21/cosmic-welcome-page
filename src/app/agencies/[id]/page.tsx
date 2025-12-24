"use client";

import { use, useEffect, useRef, useState } from "react";
import { MilkyWay } from "@/components/space/MilkyWay";
import { Taskbar } from "@/components/space/Taskbar";
import { SmoothScroll } from "@/components/space/SmoothScroll";
import { CustomCursor } from "@/components/space/CustomCursor";
import { motion } from "framer-motion";

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
    ]
  }
};

export default function AgencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = agencyData[id as keyof typeof agencyData] || agencyData.nasa;

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#020205] text-zinc-300 font-sans selection:bg-blue-500/30">
        <CustomCursor />
        <Taskbar />
        <MilkyWay />

        {/* Sidebar Navigation - Fixed */}
        <div className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50 text-[10px] uppercase tracking-widest font-bold text-zinc-600">
           <a href="#overview" className="hover:text-white transition-colors">01 Overview</a>
           <a href="#technical" className="hover:text-white transition-colors">02 Technical</a>
           <a href="#facilities" className="hover:text-white transition-colors">03 Facilities</a>
           <a href="#timeline" className="hover:text-white transition-colors">04 Timeline</a>
           <a href="#active" className="hover:text-white transition-colors">05 Active</a>
        </div>

        <main className="max-w-7xl mx-auto px-6 pt-32 pb-40 relative z-10">
          
          {/* Header Section - Informative & Clean */}
          <header className="border-b border-zinc-800 pb-12 mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 text-blue-500 font-mono text-xs tracking-tighter mb-4"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  AGENCY DATA DOSSIER // {id.toUpperCase()}
                </motion.div>
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-2 uppercase">{data.name}</h1>
                <p className="text-zinc-500 font-mono text-sm tracking-tight">{data.fullname}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                 <div className="bg-zinc-900/50 border border-zinc-800 px-6 py-3 rounded-lg">
                    <span className="block text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Founded</span>
                    <span className="text-white font-mono">{data.founded}</span>
                 </div>
                 <div className="bg-zinc-900/50 border border-zinc-800 px-6 py-3 rounded-lg">
                    <span className="block text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">HQ</span>
                    <span className="text-white font-mono">{data.hq}</span>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm leading-relaxed">
               <div className="col-span-2">
                 <h2 id="overview" className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em] mb-4">Executive Summary</h2>
                 <p className="text-xl text-zinc-200 font-light italic leading-relaxed mb-6">"{data.motto}"</p>
                 <p className="max-w-2xl">{data.description}</p>
               </div>
               <div className="space-y-4">
                 <div>
                    <span className="block text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Leadership</span>
                    <span className="text-white">{data.leadership}</span>
                 </div>
                 <div>
                    <span className="block text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Current Budget</span>
                    <span className="text-white">{data.budget}</span>
                 </div>
                 <div>
                    <span className="block text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">Workforce</span>
                    <span className="text-white">{data.workforce}</span>
                 </div>
               </div>
            </div>
          </header>

          {/* Technical Section */}
          <section id="technical" className="mb-32">
             <h2 className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em] mb-12 flex items-center gap-4">
               <span className="w-8 h-px bg-zinc-800" /> Technical Capabilities & Arsenal
             </h2>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                   <p className="text-zinc-400 leading-relaxed mb-8">{data.technicalOverview}</p>
                   <ul className="space-y-3">
                      {data.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                           <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full" /> {cap}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="lg:col-span-8 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm">
                   <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-zinc-900/50 text-zinc-500 font-mono">
                         <tr>
                            <th className="p-4 font-normal">Vehicle / System</th>
                            <th className="p-4 font-normal">Classification</th>
                            <th className="p-4 font-normal">Status</th>
                            <th className="p-4 font-normal">Capability</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800">
                         {data.vehicles.map((v, i) => (
                           <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                              <td className="p-4 text-white font-bold">{v.name}</td>
                              <td className="p-4 text-zinc-500">{v.type}</td>
                              <td className="p-4">
                                 <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${v.status.includes('Active') ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                   {v.status}
                                 </span>
                              </td>
                              <td className="p-4 font-mono text-zinc-400">{v.payload}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </section>

          {/* Facilities Section */}
          <section id="facilities" className="mb-32">
             <h2 className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em] mb-12 flex items-center gap-4">
               <span className="w-8 h-px bg-zinc-800" /> Operational Infrastructure
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.facilities.map((f, i) => (
                  <div key={i} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 transition-colors">
                     <span className="block text-[9px] text-zinc-600 uppercase font-bold tracking-widest mb-3">{f.role}</span>
                     <h4 className="text-white font-bold mb-1">{f.name}</h4>
                     <p className="text-zinc-500 text-xs">{f.location}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Dual Column: Timeline & Active Missions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             
             {/* Timeline */}
             <section id="timeline">
                <h2 className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em] mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-zinc-800" /> Historical Milestones
                </h2>
                <div className="space-y-8 border-l border-zinc-800 pl-8 ml-2">
                   {data.timeline.map((t, i) => (
                     <div key={i} className="relative">
                        <div className="absolute -left-[37px] top-1 w-2.5 h-2.5 rounded-full bg-zinc-800 border-2 border-zinc-950" />
                        <span className="text-blue-500 font-mono text-xs font-bold mb-1 block">{t.year}</span>
                        <h4 className="text-white font-bold mb-2">{t.event}</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">{t.detail}</p>
                     </div>
                   ))}
                </div>
             </section>

             {/* Active Missions */}
             <section id="active">
                <h2 className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em] mb-12 flex items-center gap-4">
                  <span className="w-8 h-px bg-zinc-800" /> Active Operations
                </h2>
                <div className="bg-zinc-900/20 rounded-2xl border border-zinc-800 p-8">
                   <ul className="divide-y divide-zinc-800">
                      {data.activeMissions.map((m, i) => (
                        <li key={i} className="py-5 flex items-center justify-between group cursor-default">
                           <span className="text-zinc-300 group-hover:text-white transition-colors">{m}</span>
                           <span className="text-[10px] font-mono text-zinc-600 group-hover:text-blue-500 transition-colors">STATUS: NOMINAL</span>
                        </li>
                      ))}
                   </ul>
                   <div className="mt-8 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
                      <p className="text-[10px] text-blue-400 font-mono uppercase tracking-tight">
                        Note: Live telemetry data streams are available for selected missions via the deep space network portal.
                      </p>
                   </div>
                </div>
             </section>

          </div>

          {/* Footer Metadata */}
          <footer className="mt-40 pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
             <div>Source: Official {data.name} Communications Archive</div>
             <div className="flex gap-8">
                <span>Last Refreshed: {new Date().toLocaleDateString()}</span>
                <span>System Status: Online</span>
             </div>
          </footer>

        </main>
      </div>
    </SmoothScroll>
  );
}
