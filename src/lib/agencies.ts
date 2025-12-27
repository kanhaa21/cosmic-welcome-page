export interface TimelineItem {
  year: string;
  event: string;
  detail: string;
}

export interface Facility {
  name: string;
  location: string;
  role: string;
}

export interface Vehicle {
  name: string;
  type: string;
  status: string;
  payload: string;
}

export interface Project {
  name: string;
  year: string;
  description: string;
  status: "Completed" | "Active" | "Planned";
}

export interface FuturePlan {
  title: string;
  timeframe: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "stable";
}

export interface AgencyData {
  id: string;
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
  metrics: Metric[];
  accentColor: string;
  theme: "nebula-purple" | "nebula-blue" | "nebula-emerald" | "nebula-orange";
}

export const agencyData: Record<string, AgencyData> = {
  nasa: {
    id: "nasa",
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
    accentColor: "#3b82f6",
    theme: "nebula-blue",
    metrics: [
      { label: "Active Missions", value: "80+", trend: "up" },
      { label: "Total Moon Rocks", value: "382 kg" },
      { label: "Mars Rovers", value: "5", trend: "stable" },
      { label: "Patents Generated", value: "6,000+" },
      { label: "ISS Occupation", value: "24 Years" }
    ],
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
    id: "isro",
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
    accentColor: "#f59e0b",
    theme: "nebula-orange",
    metrics: [
      { label: "Satellites Launched", value: "430+", trend: "up" },
      { label: "Foreign Satellites", value: "350+" },
      { label: "PSLV Success Rate", value: "95%", trend: "up" },
      { label: "Mars Mission Cost", value: "$74 Million" },
      { label: "Moon Landing", value: "South Pole 1st" }
    ],
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
    id: "esa",
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
    accentColor: "#10b981",
    theme: "nebula-emerald",
    metrics: [
      { label: "Member States", value: "22", trend: "stable" },
      { label: "Galileo Satellites", value: "28", trend: "up" },
      { label: "Copernicus Data", value: "250 TB/day" },
      { label: "Deep Space Stations", value: "3" },
      { label: "Astronaut Corps", value: "17" }
    ],
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
    id: "spacex",
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
    accentColor: "#a855f7",
    theme: "nebula-purple",
    metrics: [
      { label: "Total Launches", value: "385+", trend: "up" },
      { label: "Total Landings", value: "330+", trend: "up" },
      { label: "Starlink Users", value: "3.0M+", trend: "up" },
      { label: "Starship Thrust", value: "7,590 tf" },
      { label: "Flight Cadence", value: "3 Days" }
    ],
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
