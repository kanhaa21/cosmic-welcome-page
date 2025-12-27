export interface TimelineItem {
  year: string;
  event: string;
  detail: string;
}

export interface Facility {
  name: string;
  location: string;
  role: string;
  established?: string;
  area?: string;
}

export interface Vehicle {
  name: string;
  type: string;
  status: string;
  payload: string;
  firstFlight?: string;
  height?: string;
  diameter?: string;
  stages?: string;
  cost?: string;
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

export interface LeadershipMember {
  name: string;
  role: string;
  since?: string;
}

export interface InternationalPartner {
  name: string;
  type: string;
}

export interface SpacecraftStats {
  totalLaunches: string;
  successfulLaunches: string;
  failures: string;
  successRate: string;
}

export interface BudgetBreakdown {
  category: string;
  percentage: string;
  amount?: string;
}

export interface NotableMission {
  name: string;
  type: string;
  launchDate: string;
  status: string;
  description: string;
  keyFindings?: string[];
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
  
  // New extensive fields
  foundingHistory: string;
  organizationalStructure: string;
  leadershipTeam: LeadershipMember[];
  internationalPartners: InternationalPartner[];
  spacecraftStats: SpacecraftStats;
  budgetBreakdown: BudgetBreakdown[];
  notableMissions: NotableMission[];
  humanSpaceflight: string;
  roboticExploration: string;
  earthObservation: string;
  technologyDevelopment: string;
  headquarters: {
    address: string;
    coordinates: string;
    established: string;
  };
  keyFacts: { label: string; value: string }[];
  programAreas: { name: string; description: string }[];
  awards: string[];
  controversies?: string[];
  website: string;
  socialMedia: { platform: string; handle: string }[];
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
    description: "The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civil space program, aeronautics research, and space research. NASA was established in 1958, succeeding the National Advisory Committee for Aeronautics (NACA). The new agency was to have a distinctly civilian orientation, encouraging peaceful applications in space science.",
    technicalOverview: "NASA operates a vast network of research centers and launch facilities. Its technical expertise spans deep space communication (DSN), reusable launch systems, advanced robotics, life support systems, and cutting-edge aeronautics research. The agency manages over 20 major programs and missions simultaneously.",
    accentColor: "#3b82f6",
    theme: "nebula-blue",
    website: "https://www.nasa.gov",
    
    foundingHistory: "NASA was created in response to the Soviet Union's October 4, 1957 launch of Sputnik 1, the world's first artificial satellite. The Space Race between the United States and Soviet Union drove the creation of a civilian space agency. President Dwight D. Eisenhower signed the National Aeronautics and Space Act on July 29, 1958, establishing NASA. The agency absorbed the 46-year-old National Advisory Committee for Aeronautics (NACA), including its 8,000 employees, annual budget of $100 million, three major research laboratories—Langley Aeronautical Laboratory, Ames Aeronautical Laboratory, and Lewis Flight Propulsion Laboratory—and two smaller test facilities.",
    
    organizationalStructure: "NASA is organized into four main mission directorates: Science Mission Directorate (SMD), which conducts scientific exploration; Exploration Systems Development Mission Directorate (ESDMD), which develops human exploration systems; Space Operations Mission Directorate (SOMD), which manages spaceflight operations; and Aeronautics Research Mission Directorate (ARMD), which advances aeronautics research. The agency operates 10 field centers across the United States, each with specific areas of expertise.",
    
    humanSpaceflight: "NASA has been the leader in human spaceflight since the Mercury program (1958-1963). The Apollo program achieved its goal of landing humans on the Moon six times between 1969 and 1972. The Space Shuttle program (1981-2011) conducted 135 missions. Currently, NASA partners with commercial providers like SpaceX and Boeing for ISS crew transportation and is developing the Artemis program to return humans to the Moon.",
    
    roboticExploration: "NASA's robotic exploration includes Mars rovers (Spirit, Opportunity, Curiosity, Perseverance), the Voyager probes now in interstellar space, the New Horizons mission to Pluto, and numerous orbital missions. The agency operates the Jet Propulsion Laboratory (JPL) as its primary center for robotic exploration. Current active Mars missions include Perseverance rover, Ingenuity helicopter, and several orbiters.",
    
    earthObservation: "NASA operates the largest fleet of Earth-observing satellites, providing critical data on climate change, weather patterns, and environmental monitoring. Key missions include Landsat (since 1972), Terra, Aqua, and the upcoming NISAR satellite. The Earth Science Division manages over 20 active Earth-observing missions.",
    
    technologyDevelopment: "NASA's Space Technology Mission Directorate develops transformational technologies for future missions. This includes advanced propulsion systems (nuclear thermal, ion engines), in-space manufacturing, life support systems, and next-generation materials. The agency has spun off over 2,000 technologies to the private sector.",
    
    headquarters: {
      address: "300 E Street SW, Washington, DC 20546, United States",
      coordinates: "38.8830° N, 77.0163° W",
      established: "1958"
    },
    
    leadershipTeam: [
      { name: "Bill Nelson", role: "Administrator", since: "2021" },
      { name: "Pamela Melroy", role: "Deputy Administrator", since: "2021" },
      { name: "James Free", role: "Associate Administrator", since: "2023" },
      { name: "Janet Petro", role: "Kennedy Space Center Director", since: "2021" },
      { name: "Vanessa Wyche", role: "Johnson Space Center Director", since: "2021" }
    ],
    
    internationalPartners: [
      { name: "ESA", type: "Major Partner - ISS, JWST, Artemis" },
      { name: "JAXA", type: "Major Partner - ISS, Artemis" },
      { name: "CSA", type: "Major Partner - ISS, Canadarm, Artemis" },
      { name: "Roscosmos", type: "ISS Partner" },
      { name: "ISRO", type: "Earth Science, NISAR" },
      { name: "ASI (Italy)", type: "ISS, Various missions" },
      { name: "DLR (Germany)", type: "Various missions" }
    ],
    
    spacecraftStats: {
      totalLaunches: "1,500+",
      successfulLaunches: "1,450+",
      failures: "~50",
      successRate: "96.7%"
    },
    
    budgetBreakdown: [
      { category: "Science", percentage: "30%", amount: "$7.8B" },
      { category: "Exploration", percentage: "26%", amount: "$6.7B" },
      { category: "Space Operations", percentage: "16%", amount: "$4.2B" },
      { category: "Space Technology", percentage: "5%", amount: "$1.4B" },
      { category: "Aeronautics", percentage: "3%", amount: "$0.9B" },
      { category: "Safety & Construction", percentage: "12%", amount: "$3.1B" },
      { category: "STEM & Education", percentage: "5%", amount: "$1.3B" },
      { category: "Inspector General", percentage: "0.2%", amount: "$48M" }
    ],
    
    notableMissions: [
      { name: "Apollo 11", type: "Human Spaceflight", launchDate: "July 16, 1969", status: "Completed", description: "First crewed mission to land humans on the Moon. Neil Armstrong and Buzz Aldrin walked on the lunar surface while Michael Collins orbited above.", keyFindings: ["First Moon landing", "Collected 21.5 kg of lunar samples", "Proved lunar surface safe for EVA"] },
      { name: "Voyager 1", type: "Interplanetary Probe", launchDate: "September 5, 1977", status: "Active", description: "The farthest human-made object from Earth, now in interstellar space at 24+ billion km from the Sun.", keyFindings: ["First spacecraft to enter interstellar space", "Detailed imagery of Jupiter and Saturn", "Discovered volcanic activity on Io"] },
      { name: "Hubble Space Telescope", type: "Space Observatory", launchDate: "April 24, 1990", status: "Active", description: "One of the most productive scientific instruments ever built, Hubble has made over 1.5 million observations.", keyFindings: ["Determined age of universe (~13.8 billion years)", "Discovered dark energy acceleration", "Imaged over 100 billion galaxies"] },
      { name: "Mars Perseverance", type: "Mars Rover", launchDate: "July 30, 2020", status: "Active", description: "The most advanced rover ever sent to Mars, searching for signs of ancient microbial life and collecting samples for future return.", keyFindings: ["Confirmed Jezero Crater was ancient lake bed", "Produced oxygen from CO2 (MOXIE)", "Collected 23+ sample tubes"] },
      { name: "James Webb Space Telescope", type: "Space Observatory", launchDate: "December 25, 2021", status: "Active", description: "The largest and most powerful space telescope ever launched, observing the universe in infrared wavelengths.", keyFindings: ["Deepest infrared image of universe", "Detected water in exoplanet atmospheres", "Observing first galaxies after Big Bang"] }
    ],
    
    keyFacts: [
      { label: "Type", value: "Independent Federal Agency" },
      { label: "Jurisdiction", value: "United States Government" },
      { label: "Annual Budget", value: "$25.4 Billion (FY2024)" },
      { label: "Employees", value: "18,000+ civil servants" },
      { label: "Contractors", value: "300,000+ support workforce" },
      { label: "Field Centers", value: "10 major facilities" },
      { label: "Active Missions", value: "80+ ongoing" },
      { label: "Astronauts Selected", value: "360+ since 1959" },
      { label: "Patents Held", value: "6,300+" },
      { label: "Spinoff Technologies", value: "2,000+" },
      { label: "ISS Partners", value: "5 space agencies" },
      { label: "Moon Landings", value: "6 crewed (Apollo)" },
      { label: "Mars Rovers", value: "5 successfully landed" },
      { label: "Deep Space Network", value: "3 complexes worldwide" }
    ],
    
    programAreas: [
      { name: "Artemis Program", description: "NASA's program to return humans to the Moon by 2026, establishing sustainable lunar exploration and preparing for Mars." },
      { name: "Commercial Crew", description: "Partnership with SpaceX and Boeing to transport astronauts to the ISS, ending reliance on Russian Soyuz." },
      { name: "Mars Exploration", description: "Ongoing robotic exploration including Perseverance rover, Ingenuity helicopter, and future Mars Sample Return." },
      { name: "Earth Science", description: "Fleet of satellites monitoring climate, weather, and environmental changes on our planet." },
      { name: "Astrophysics", description: "Space telescopes including JWST, Hubble, and Chandra studying the cosmos from origin to evolution." },
      { name: "Heliophysics", description: "Parker Solar Probe, IMAP, and other missions studying the Sun and its influence on space weather." },
      { name: "Planetary Defense", description: "DART mission successfully deflected an asteroid; NEOWISE and future NEO Surveyor track potential threats." },
      { name: "Aeronautics Research", description: "X-59 quiet supersonic aircraft, sustainable aviation fuels, and advanced air mobility research." }
    ],
    
    awards: [
      "Presidential Medal of Freedom (Multiple astronauts)",
      "Collier Trophy (Multiple times)",
      "National Medal of Technology and Innovation",
      "Emmy Awards for broadcasts",
      "Webby Awards for digital engagement"
    ],
    
    socialMedia: [
      { platform: "Twitter/X", handle: "@NASA" },
      { platform: "Instagram", handle: "@nasa" },
      { platform: "YouTube", handle: "NASA" },
      { platform: "Facebook", handle: "NASA" }
    ],
    
    metrics: [
      { label: "Active Missions", value: "80+", trend: "up" },
      { label: "Moon Samples", value: "382 kg" },
      { label: "Mars Rovers", value: "5" },
      { label: "Patents", value: "6,300+" },
      { label: "ISS Days", value: "8,900+" },
      { label: "Astronauts", value: "360+" },
      { label: "Budget FY24", value: "$25.4B" },
      { label: "Employees", value: "18,000+" },
      { label: "Field Centers", value: "10" },
      { label: "Success Rate", value: "96.7%" }
    ],
    
    facilities: [
      { name: "Kennedy Space Center", location: "Florida", role: "Primary Launch Site", established: "1962", area: "144,000 acres" },
      { name: "Jet Propulsion Laboratory", location: "Pasadena, California", role: "Robotic Exploration & Deep Space Network", established: "1936 (NASA 1958)", area: "177 acres" },
      { name: "Johnson Space Center", location: "Houston, Texas", role: "Human Spaceflight & Mission Control", established: "1961", area: "1,620 acres" },
      { name: "Goddard Space Flight Center", location: "Greenbelt, Maryland", role: "Earth Science & Astrophysics", established: "1959", area: "1,270 acres" },
      { name: "Marshall Space Flight Center", location: "Huntsville, Alabama", role: "Propulsion & SLS Development", established: "1960", area: "1,800 acres" },
      { name: "Ames Research Center", location: "Mountain View, California", role: "Aeronautics & Information Technology", established: "1939", area: "430 acres" },
      { name: "Langley Research Center", location: "Hampton, Virginia", role: "Aeronautics & Atmospheric Science", established: "1917", area: "764 acres" },
      { name: "Glenn Research Center", location: "Cleveland, Ohio", role: "Propulsion & Power Systems", established: "1941", area: "350 acres" },
      { name: "Stennis Space Center", location: "Mississippi", role: "Rocket Engine Testing", established: "1961", area: "13,800 acres" },
      { name: "Armstrong Flight Research Center", location: "Edwards, California", role: "Flight Research & Testing", established: "1946", area: "Located on Edwards AFB" }
    ],
    
    vehicles: [
      { name: "Space Launch System (SLS)", type: "Super Heavy-lift Launch Vehicle", status: "Active", payload: "95-130 tonnes to LEO", firstFlight: "November 16, 2022", height: "98-111 m", diameter: "8.4 m core", stages: "2", cost: "$2.2B per launch" },
      { name: "Orion", type: "Crew Capsule", status: "Active", payload: "4-6 crew to lunar orbit", firstFlight: "December 5, 2014 (EFT-1)", height: "3.3 m", diameter: "5.0 m", stages: "N/A", cost: "Part of SLS mission" },
      { name: "James Webb Space Telescope", type: "Space Observatory", status: "Operational", payload: "N/A", firstFlight: "December 25, 2021", height: "20.2 m sunshield", diameter: "6.5 m primary mirror", stages: "N/A", cost: "$10 Billion" },
      { name: "Perseverance Rover", type: "Mars Rover", status: "Operational", payload: "N/A", firstFlight: "July 30, 2020", height: "2.2 m", diameter: "2.7 m wide", stages: "N/A", cost: "$2.7 Billion mission" }
    ],
    
    timeline: [
      { year: "1958", event: "NASA Established", detail: "Signed into law by President Eisenhower on July 29, absorbing NACA and beginning operations on October 1." },
      { year: "1961", event: "First American in Space", detail: "Alan Shepard becomes first American in space aboard Freedom 7, a 15-minute suborbital flight." },
      { year: "1962", event: "Kennedy's Moon Speech", detail: "President Kennedy commits the nation to landing on the Moon before the decade's end at Rice University." },
      { year: "1969", event: "Apollo 11 Moon Landing", detail: "Neil Armstrong and Buzz Aldrin become first humans to walk on the Moon on July 20." },
      { year: "1972", event: "Apollo 17 Final Moon Mission", detail: "Last crewed lunar mission; Eugene Cernan becomes last person to walk on the Moon (as of 2024)." },
      { year: "1981", event: "Space Shuttle Era Begins", detail: "STS-1 Columbia launches April 12, beginning 30 years of Space Shuttle operations." },
      { year: "1990", event: "Hubble Deployment", detail: "Space Shuttle Discovery deploys Hubble Space Telescope, revolutionizing astronomy after mirror fix." },
      { year: "1998", event: "ISS Construction Begins", detail: "First module Zarya launched, beginning construction of the International Space Station." },
      { year: "2004", event: "Mars Rovers Land", detail: "Spirit and Opportunity rovers land on Mars, far exceeding planned 90-day missions." },
      { year: "2011", event: "Space Shuttle Retires", detail: "STS-135 Atlantis completes final Space Shuttle mission after 135 flights." },
      { year: "2012", event: "Curiosity Lands on Mars", detail: "Most advanced rover lands using revolutionary sky crane system." },
      { year: "2020", event: "Commercial Crew Begins", detail: "SpaceX Demo-2 returns human launches to US soil; Perseverance launches to Mars." },
      { year: "2021", event: "JWST Launches", detail: "James Webb Space Telescope launches on Christmas Day, beginning new era of astronomy." },
      { year: "2022", event: "Artemis I Success", detail: "First flight of SLS/Orion successfully orbits the Moon, paving way for crewed missions." },
      { year: "2024", event: "Europa Clipper Launches", detail: "Mission to study Jupiter's moon Europa for potential habitability launches in October." }
    ],
    
    activeMissions: [
      "Artemis Program (Lunar Exploration)",
      "Mars Perseverance Rover & Ingenuity",
      "James Webb Space Telescope",
      "Hubble Space Telescope",
      "Parker Solar Probe",
      "International Space Station",
      "Europa Clipper (In Transit)",
      "Voyager 1 & 2 (Interstellar)",
      "New Horizons (Kuiper Belt)",
      "OSIRIS-APEX (Apophis)",
      "Lucy (Jupiter Trojans)",
      "Juno (Jupiter Orbit)",
      "Mars Odyssey",
      "Mars Reconnaissance Orbiter",
      "MAVEN (Mars Atmosphere)"
    ],
    
    capabilities: [
      "Deep Space Network (DSN) Communication",
      "Human Life Support Systems",
      "Planetary Entry, Descent & Landing",
      "Nuclear Power Systems (RTGs)",
      "Space Telescope Operations",
      "Sample Return Missions",
      "Aeronautics Research",
      "Earth Climate Monitoring",
      "Rocket Propulsion Development",
      "Astronaut Training"
    ],
    
    projects: [
      { name: "Artemis", year: "2017-Present", description: "NASA's program to land the first woman and person of color on the Moon, establish sustainable presence, and prepare for Mars.", status: "Active" },
      { name: "Mars 2020", year: "2020-Present", description: "Perseverance rover and Ingenuity helicopter searching for ancient life and caching samples for future return.", status: "Active" },
      { name: "Europa Clipper", year: "2024-Present", description: "Mission to conduct detailed reconnaissance of Jupiter's moon Europa and investigate its potential habitability.", status: "Active" },
      { name: "Roman Space Telescope", year: "2027 Launch", description: "Next great observatory with 100x Hubble's field of view, studying dark energy and exoplanets.", status: "Planned" },
      { name: "Dragonfly", year: "2028 Launch", description: "Rotorcraft lander to explore Saturn's moon Titan, searching for prebiotic chemistry.", status: "Planned" }
    ],
    
    achievements: [
      "First humans on the Moon (Apollo 11, 1969)",
      "First American in space (Alan Shepard, 1961)",
      "First reusable orbital spacecraft (Space Shuttle)",
      "Most powerful space telescope (JWST)",
      "First powered flight on Mars (Ingenuity)",
      "Longest operating Mars rover (Opportunity - 15 years)",
      "First spacecraft to interstellar space (Voyager 1)",
      "First asteroid sample return (OSIRIS-REx)",
      "First asteroid deflection (DART)",
      "Continuous human presence in space (ISS since 2000)"
    ],
    
    futurePlans: [
      { title: "Artemis II", timeframe: "September 2025", description: "First crewed Artemis mission, sending four astronauts around the Moon on a 10-day mission." },
      { title: "Artemis III", timeframe: "2026", description: "First crewed lunar landing since Apollo 17, using SpaceX Starship HLS to reach the surface." },
      { title: "Mars Sample Return", timeframe: "2030s", description: "Joint NASA-ESA mission to retrieve Perseverance's cached samples and return them to Earth." },
      { title: "Gateway Station", timeframe: "2025-2028", description: "Lunar orbiting space station to support sustainable Artemis missions and deep space science." },
      { title: "Human Mars Mission", timeframe: "Late 2030s-2040s", description: "NASA's ultimate goal of sending astronauts to Mars, leveraging Artemis Moon experience." }
    ],
    
    controversies: [
      "Space Shuttle Challenger disaster (1986) - O-ring failure",
      "Space Shuttle Columbia disaster (2003) - foam strike damage",
      "SLS cost overruns and schedule delays",
      "James Webb Space Telescope budget growth ($1B to $10B)",
      "Constellation program cancellation (2010)"
    ]
  },
  
  isro: {
    id: "isro",
    name: "ISRO",
    fullname: "Indian Space Research Organisation",
    founded: "August 15, 1969",
    hq: "Bengaluru, India",
    leadership: "S. Somanath (Chairman)",
    budget: "₹13,042 Crore (~$1.6B FY2024)",
    workforce: "17,000+ Employees",
    motto: "Space technology in the service of humankind",
    description: "The Indian Space Research Organisation is the national space agency of India, headquartered in Bengaluru. It operates under the Department of Space (DOS), which is directly overseen by the Prime Minister. ISRO is one of six government space agencies in the world that possesses full launch capabilities, can deploy cryogenic engines, launch extra-terrestrial missions, and operate large fleets of artificial satellites.",
    technicalOverview: "ISRO is globally recognized for cost-effective space missions and indigenous technology development. It maintains India's communication, navigation, and Earth observation satellite fleets. Key achievements include developing cryogenic engines domestically after technology denial and executing interplanetary missions at a fraction of other agencies' costs.",
    accentColor: "#f59e0b",
    theme: "nebula-orange",
    website: "https://www.isro.gov.in",
    
    foundingHistory: "India's space program began in 1962 when the Indian National Committee for Space Research (INCOSPAR) was established by Dr. Vikram Sarabhai, the father of Indian space program. INCOSPAR was succeeded by ISRO on August 15, 1969. The first rocket launch occurred from Thumba Equatorial Rocket Launching Station (TERLS) in 1963. Dr. Sarabhai's vision focused on using space technology for national development rather than prestige projects. The program began modestly—early rockets were transported on bicycles and assembled in a church.",
    
    organizationalStructure: "ISRO functions under the Department of Space (DOS), reporting directly to the Prime Minister's Office. The agency is organized into major centers: Vikram Sarabhai Space Centre (VSSC) for launch vehicles, U R Rao Satellite Centre (URSC) for satellites, Satish Dhawan Space Centre (SDSC) for launches, ISRO Propulsion Complex (IPRC), and Space Applications Centre (SAC). IN-SPACe regulates private participation, while NSIL handles commercial launches.",
    
    humanSpaceflight: "India's human spaceflight program, Gaganyaan, aims to send three astronauts to low Earth orbit by 2025-2026. Four IAF pilots were selected and trained at Gagarin Cosmonaut Training Center in Russia. The program includes the development of a crew module, service module, and crew escape system. Uncrewed test flights (G1, G2) are scheduled before the crewed mission. India will become the fourth nation to independently launch humans into space.",
    
    roboticExploration: "ISRO's robotic exploration includes the Chandrayaan lunar program and Mars Orbiter Mission (MOM/Mangalyaan). Chandrayaan-1 (2008) discovered water molecules on the Moon. Chandrayaan-2 (2019) successfully deployed an orbiter despite lander failure. Chandrayaan-3 (2023) achieved the first soft landing near the lunar south pole. MOM (2014) made India the first nation to reach Mars orbit on its first attempt and the first Asian nation to do so.",
    
    earthObservation: "ISRO operates one of the world's largest constellations of Earth observation satellites. The Indian Remote Sensing (IRS) program began in 1988. Current systems include RESOURCESAT, CARTOSAT, OCEANSAT, and RISAT (radar imaging). These satellites support agriculture, disaster management, urban planning, and defense. The Bhuvan geoportal provides free access to satellite imagery.",
    
    technologyDevelopment: "ISRO has achieved technological self-reliance in critical areas including cryogenic propulsion (CE-20 engine), semi-cryogenic engines (under development), and reusable launch vehicle technology (RLV-TD demonstrated). The agency developed its own navigation system (NavIC/IRNSS) and has conducted successful orbital docking demonstration (SpaDeX planned). Future technology goals include green propulsion and human-rated systems.",
    
    headquarters: {
      address: "ISRO Headquarters, Antariksh Bhavan, New BEL Road, Bengaluru 560094, Karnataka, India",
      coordinates: "13.0380° N, 77.5675° E",
      established: "1969"
    },
    
    leadershipTeam: [
      { name: "S. Somanath", role: "Chairman, ISRO & Secretary, DOS", since: "2022" },
      { name: "M. Sankaran", role: "Director, U R Rao Satellite Centre", since: "2021" },
      { name: "V. Narayanan", role: "Director, Liquid Propulsion Systems Centre", since: "2018" },
      { name: "A. Rajarajan", role: "Director, Satish Dhawan Space Centre", since: "2022" },
      { name: "Unnikrishnan Nair", role: "Director, Vikram Sarabhai Space Centre", since: "2021" }
    ],
    
    internationalPartners: [
      { name: "NASA", type: "NISAR Mission, Artemis Accords" },
      { name: "JAXA", type: "LUPEX Lunar Mission" },
      { name: "CNES (France)", type: "Joint satellite missions" },
      { name: "Roscosmos", type: "Gaganyaan astronaut training" },
      { name: "ESA", type: "Deep space network support" },
      { name: "DLR (Germany)", type: "Scientific cooperation" }
    ],
    
    spacecraftStats: {
      totalLaunches: "92 (as of 2024)",
      successfulLaunches: "85",
      failures: "7",
      successRate: "92.4%"
    },
    
    budgetBreakdown: [
      { category: "Space Technology", percentage: "35%", amount: "₹4,565 Cr" },
      { category: "Space Applications", percentage: "25%", amount: "₹3,260 Cr" },
      { category: "Space Sciences", percentage: "10%", amount: "₹1,304 Cr" },
      { category: "INSAT Programme", percentage: "15%", amount: "₹1,956 Cr" },
      { category: "Direction & Administration", percentage: "5%", amount: "₹652 Cr" },
      { category: "Gaganyaan", percentage: "10%", amount: "₹1,305 Cr" }
    ],
    
    notableMissions: [
      { name: "Chandrayaan-3", type: "Lunar Lander/Rover", launchDate: "July 14, 2023", status: "Completed", description: "India became the first nation to soft-land near the lunar south pole and fourth nation to soft-land on the Moon.", keyFindings: ["Confirmed presence of sulfur at south pole", "Temperature variations on lunar surface", "Seismic activity detected", "Lunar soil composition analysis"] },
      { name: "Mars Orbiter Mission", type: "Mars Orbiter", launchDate: "November 5, 2013", status: "Completed (2022)", description: "Made India first nation to reach Mars on maiden attempt. Mission cost only $74 million—less than the movie 'Gravity'.", keyFindings: ["Studied Martian atmosphere", "Imaged entire disc of Mars", "Measured solar radiation", "Operated for 8 years vs 6-month design life"] },
      { name: "Chandrayaan-1", type: "Lunar Orbiter/Impactor", launchDate: "October 22, 2008", status: "Completed", description: "India's first lunar mission that discovered water molecules on the Moon's surface.", keyFindings: ["Discovered water/hydroxyl on Moon", "Created high-resolution lunar map", "Moon Impact Probe planted Indian flag"] },
      { name: "Aditya-L1", type: "Solar Observatory", launchDate: "September 2, 2023", status: "Active", description: "India's first solar observatory, positioned at Lagrange Point L1 for continuous Sun observation.", keyFindings: ["Solar wind measurements", "Coronal mass ejection studies", "Real-time space weather data"] },
      { name: "PSLV-C37", type: "Launch Mission", launchDate: "February 15, 2017", status: "Completed", description: "Set world record by launching 104 satellites in a single mission.", keyFindings: ["104 satellites from 7 countries", "88 from Planet Labs", "Demonstrated PSLV versatility"] }
    ],
    
    keyFacts: [
      { label: "Type", value: "Government Space Agency" },
      { label: "Country", value: "India" },
      { label: "Annual Budget", value: "₹13,042 Crore (~$1.6B)" },
      { label: "Employees", value: "17,000+" },
      { label: "Launch Vehicles", value: "PSLV, GSLV, LVM3, SSLV" },
      { label: "Satellites Launched", value: "430+" },
      { label: "Foreign Satellites", value: "350+ (36 countries)" },
      { label: "Operational Satellites", value: "50+" },
      { label: "Moon Missions", value: "3 (Chandrayaan 1, 2, 3)" },
      { label: "Mars Missions", value: "1 (MOM)" },
      { label: "Sun Missions", value: "1 (Aditya-L1)" },
      { label: "Success Rate (PSLV)", value: "95%+ (57 consecutive)" },
      { label: "NavIC Coverage", value: "Indian subcontinent + 1500km" },
      { label: "Commercial Arm", value: "NSIL, IN-SPACe" }
    ],
    
    programAreas: [
      { name: "Gaganyaan", description: "India's first human spaceflight program, aiming to demonstrate indigenous capability to send crew to LEO and return safely." },
      { name: "Chandrayaan", description: "Lunar exploration program that achieved historic south pole landing with Chandrayaan-3 in 2023." },
      { name: "Aditya", description: "Solar observation program with Aditya-L1 stationed at Sun-Earth L1 point for continuous monitoring." },
      { name: "NavIC/IRNSS", description: "Indigenous regional navigation satellite system providing positioning over India and surrounding region." },
      { name: "GSAT/INSAT", description: "Communication satellite fleet serving broadcasting, telecom, and emergency communication needs." },
      { name: "Earth Observation", description: "Remote sensing satellites for agriculture, disaster management, cartography, and resource management." },
      { name: "Launch Services", description: "Commercial launch services through NSIL, launched satellites for 36 countries." },
      { name: "Space Science", description: "XPoSat (X-ray polarimetry), AstroSat (multi-wavelength astronomy), and future missions." }
    ],
    
    awards: [
      "Indira Gandhi Prize for Peace, Disarmament and Development (2014)",
      "Space Pioneer Award - National Space Society (2015)",
      "ASIFoundation Team Award (2024) - Chandrayaan-3",
      "Leif Erikson Lunar Prize (2024) - Chandrayaan-3"
    ],
    
    socialMedia: [
      { platform: "Twitter/X", handle: "@isaboratory" },
      { platform: "YouTube", handle: "ISRO Official" },
      { platform: "Facebook", handle: "ISRO" }
    ],
    
    metrics: [
      { label: "Satellites Launched", value: "430+", trend: "up" },
      { label: "Foreign Satellites", value: "350+" },
      { label: "PSLV Success", value: "57 straight", trend: "up" },
      { label: "MOM Cost", value: "$74M" },
      { label: "Moon Landing", value: "South Pole 1st" },
      { label: "Countries Served", value: "36" },
      { label: "Budget", value: "₹13,042 Cr" },
      { label: "Employees", value: "17,000+" },
      { label: "Success Rate", value: "92.4%" },
      { label: "Active Satellites", value: "50+" }
    ],
    
    facilities: [
      { name: "Satish Dhawan Space Centre", location: "Sriharikota, Andhra Pradesh", role: "Primary Spaceport", established: "1971", area: "145 sq km" },
      { name: "Vikram Sarabhai Space Centre", location: "Thiruvananthapuram, Kerala", role: "Launch Vehicle Design & Development", established: "1962", area: "2,000+ acres" },
      { name: "U R Rao Satellite Centre", location: "Bengaluru, Karnataka", role: "Satellite Design, Development & Testing", established: "1972", area: "Large campus" },
      { name: "Liquid Propulsion Systems Centre", location: "Valiamala, Kerala & Bengaluru", role: "Liquid & Cryogenic Propulsion", established: "1985", area: "Multiple sites" },
      { name: "ISRO Propulsion Complex", location: "Mahendragiri, Tamil Nadu", role: "Engine Testing & Assembly", established: "1996", area: "4,500 acres" },
      { name: "Space Applications Centre", location: "Ahmedabad, Gujarat", role: "Payloads & Applications", established: "1972", area: "Large campus" },
      { name: "National Remote Sensing Centre", location: "Hyderabad, Telangana", role: "Remote Sensing Data & Services", established: "1974", area: "Moderate" },
      { name: "ISRO Telemetry, Tracking & Command Network", location: "Bengaluru (HQ)", role: "Mission Operations & Tracking", established: "1984", area: "Multiple stations" }
    ],
    
    vehicles: [
      { name: "LVM3 (GSLV Mk III)", type: "Heavy-lift Launch Vehicle", status: "Active", payload: "10t to LEO, 4t to GTO", firstFlight: "December 18, 2014", height: "43.5 m", diameter: "4 m core", stages: "3 (S200+L110+C25)", cost: "~$50M per launch" },
      { name: "PSLV", type: "Medium-lift Launch Vehicle", status: "Active", payload: "3.8t to LEO, 1.75t to SSO", firstFlight: "September 20, 1993", height: "44 m", diameter: "2.8 m", stages: "4", cost: "~$15-20M per launch" },
      { name: "GSLV Mk II", type: "Medium-lift Launch Vehicle", status: "Active", payload: "5t to LEO, 2.5t to GTO", firstFlight: "April 18, 2001", height: "49.1 m", diameter: "2.8 m", stages: "3", cost: "~$40M per launch" },
      { name: "SSLV", type: "Small Satellite Launch Vehicle", status: "Active", payload: "500 kg to LEO", firstFlight: "August 7, 2022", height: "34 m", diameter: "2 m", stages: "3 + velocity trimming module", cost: "~$5M per launch" }
    ],
    
    timeline: [
      { year: "1962", event: "INCOSPAR Formed", detail: "Indian National Committee for Space Research established under Dr. Vikram Sarabhai." },
      { year: "1963", event: "First Rocket Launch", detail: "Nike-Apache sounding rocket launched from Thumba, Kerala—India's first rocket launch." },
      { year: "1969", event: "ISRO Established", detail: "Indian Space Research Organisation formally created on August 15, Independence Day." },
      { year: "1975", event: "Aryabhata", detail: "India's first satellite launched by Soviet Union, marking India's entry into space age." },
      { year: "1980", event: "SLV-3 Success", detail: "India's first indigenous satellite launch vehicle successfully deploys Rohini satellite." },
      { year: "1984", event: "First Indian in Space", detail: "Rakesh Sharma becomes first Indian in space aboard Soviet Soyuz T-11." },
      { year: "1993", event: "PSLV First Flight", detail: "Polar Satellite Launch Vehicle's first developmental flight (unsuccessful)." },
      { year: "2008", event: "Chandrayaan-1", detail: "India's first lunar mission discovers water on Moon, Moon Impact Probe lands." },
      { year: "2014", event: "Mars Orbiter Mission", detail: "India becomes first nation to reach Mars orbit on maiden attempt." },
      { year: "2017", event: "104 Satellites Record", detail: "PSLV-C37 sets world record launching 104 satellites in single mission." },
      { year: "2019", event: "Chandrayaan-2", detail: "Successful orbiter deployment; Vikram lander lost contact during descent." },
      { year: "2023", event: "Chandrayaan-3 Success", detail: "First nation to soft-land near lunar south pole; Pragyan rover explores surface." },
      { year: "2023", event: "Aditya-L1 Launch", detail: "India's first solar observatory mission launched to Sun-Earth L1 point." },
      { year: "2024", event: "PSLV-C58/XPoSat", detail: "X-ray Polarimeter Satellite launched for stellar X-ray source studies." }
    ],
    
    activeMissions: [
      "Aditya-L1 (Solar Observatory at L1)",
      "Chandrayaan-3 Propulsion Module (Lunar orbit)",
      "AstroSat (Multi-wavelength Astronomy)",
      "XPoSat (X-ray Polarimetry)",
      "RISAT Series (Radar Imaging)",
      "INSAT/GSAT Fleet (Communication)",
      "IRNSS/NavIC Constellation",
      "Oceansat-3 (Ocean/Atmospheric)",
      "RESOURCESAT (Earth Resources)",
      "Cartosat Series (High-resolution Imaging)"
    ],
    
    capabilities: [
      "Indigenous Cryogenic Engine Technology",
      "Cost-Effective Space Missions",
      "Remote Sensing & Earth Observation",
      "Interplanetary Navigation",
      "Regional Navigation System (NavIC)",
      "Multi-orbit Launch Capability",
      "Lunar Surface Operations",
      "Commercial Launch Services",
      "Satellite Communication Systems",
      "Human Spaceflight (Developing)"
    ],
    
    projects: [
      { name: "Gaganyaan", year: "2018-Present", description: "India's first human spaceflight mission to send three astronauts to LEO for 3-7 days.", status: "Active" },
      { name: "Chandrayaan-4", year: "2027-28", description: "Lunar sample return mission to collect and return Moon rocks to Earth.", status: "Planned" },
      { name: "Shukrayaan-1", year: "2028", description: "Venus orbiter mission to study atmosphere, geology, and surface of Venus.", status: "Planned" },
      { name: "LUPEX", year: "2026-28", description: "Joint ISRO-JAXA mission for lunar polar exploration with rover.", status: "Active" },
      { name: "NISAR", year: "2025", description: "Joint NASA-ISRO SAR satellite for Earth observation and hazard monitoring.", status: "Active" }
    ],
    
    achievements: [
      "First nation to reach Mars on maiden attempt (MOM, 2014)",
      "First soft landing on lunar south pole (Chandrayaan-3, 2023)",
      "World record: 104 satellites in single launch (PSLV-C37, 2017)",
      "Indigenous cryogenic engine development (CE-7.5, CE-20)",
      "Lowest cost Mars mission in history ($74 million)",
      "Independent regional navigation system (NavIC)",
      "Moon water discovery contribution (Chandrayaan-1)",
      "Reusable launch vehicle technology demonstration",
      "Over 350 foreign satellites launched commercially",
      "95%+ success rate for PSLV (57 consecutive successes)"
    ],
    
    futurePlans: [
      { title: "Gaganyaan (Crewed)", timeframe: "2025-26", description: "India's first crewed spaceflight, sending 3 astronauts to LEO for up to 7 days." },
      { title: "Bharatiya Antariksha Station", timeframe: "2035", description: "Indigenous space station with 20-tonne initial configuration for sustained human presence." },
      { title: "Shukrayaan-1", timeframe: "2028", description: "Venus orbiter to study atmosphere, surface, and interaction with solar radiation." },
      { title: "Chandrayaan-4", timeframe: "2027-28", description: "Lunar sample return mission to bring back Moon soil for detailed analysis." },
      { title: "Mangalyaan-2", timeframe: "2026-28", description: "Follow-up Mars mission with orbiter and potential lander/rover combination." }
    ],
    
    controversies: [
      "Chandrayaan-2 Vikram lander failure investigation",
      "GSLV early failures with cryogenic stage",
      "Technology denial regime after 1990s sanctions"
    ]
  },
  
  esa: {
    id: "esa",
    name: "ESA",
    fullname: "European Space Agency",
    founded: "May 30, 1975",
    hq: "Paris, France",
    leadership: "Josef Aschbacher (Director General)",
    budget: "€7.79 Billion (2024)",
    workforce: "2,547 Direct + 4,000+ Contractors",
    motto: "Space for Europe",
    description: "The European Space Agency is an intergovernmental organization of 22 member states dedicated to the exploration of space. Headquartered in Paris, ESA coordinates the financial and intellectual resources of its members to undertake programs and activities far beyond the scope of any single European country. ESA's space flight program includes human spaceflight through partnership with the ISS, unmanned exploration missions, Earth observation satellites, telecommunications, and navigation systems.",
    technicalOverview: "ESA manages Europe's space infrastructure including the Galileo navigation system, Copernicus Earth observation program, Ariane and Vega launch vehicles, and numerous scientific missions. The agency operates through mandatory and optional programs, allowing members to participate based on interest and financial capacity. ESA's Guiana Space Centre provides equatorial launch access.",
    accentColor: "#10b981",
    theme: "nebula-emerald",
    website: "https://www.esa.int",
    
    foundingHistory: "ESA was formed from the merger of two earlier organizations: ELDO (European Launcher Development Organisation) and ESRO (European Space Research Organisation). The ESA Convention was signed in 1975 and entered into force in 1980. The merger combined launch vehicle capabilities with scientific research, creating a comprehensive space agency. France has been the largest contributor, hosting the headquarters in Paris and providing the launch site in French Guiana.",
    
    organizationalStructure: "ESA operates through a Council of member state representatives, chaired by a Director General. The agency has multiple directorates: Earth Observation, Human and Robotic Exploration, Space Transportation, Telecommunications, Navigation, Space Safety, and Operations. Major establishments include ESTEC (technology), ESOC (operations), ESRIN (Earth observation), ESAC (astronomy), and EAC (astronaut training).",
    
    humanSpaceflight: "ESA's human spaceflight activities are conducted through the International Space Station partnership. European astronauts train at EAC in Cologne and fly to the ISS on partner vehicles (currently SpaceX Crew Dragon). ESA contributed the Columbus laboratory module and the ATV cargo vehicles to ISS. ESA is a major partner in NASA's Artemis program, providing the European Service Module for Orion and contributing to Gateway.",
    
    roboticExploration: "ESA has achieved significant milestones in robotic exploration including the first comet landing (Rosetta/Philae), Mars exploration (Mars Express, ExoMars TGO), Venus (Venus Express), and Jupiter system (JUICE). The agency leads the ExoMars program with Russia (now restructured) and is developing the Mars Sample Return Earth Return Orbiter. Huygens probe achieved the first landing in the outer solar system (Titan).",
    
    earthObservation: "ESA's Copernicus program (with EU) is the world's largest Earth observation system, providing free and open environmental data. Sentinel satellites monitor land, ocean, atmosphere, and climate. The Living Planet program includes scientific missions like GOCE, CryoSat, and BIOMASS. ESA's Earth observation fleet generates 250 TB of data daily.",
    
    technologyDevelopment: "ESA develops cutting-edge space technologies through dedicated programs. Current priorities include in-orbit servicing (ClearSpace-1 debris removal), quantum communications, electric propulsion, reusable launch vehicles (Themis demonstrator), and lunar surface systems. The agency has strong expertise in telecommunications payloads, scientific instruments, and space-based navigation.",
    
    headquarters: {
      address: "8-10 rue Mario Nikis, 75015 Paris, France",
      coordinates: "48.8461° N, 2.3013° E",
      established: "1975"
    },
    
    leadershipTeam: [
      { name: "Josef Aschbacher", role: "Director General", since: "2021" },
      { name: "Simonetta Cheli", role: "Director, Earth Observation Programmes", since: "2022" },
      { name: "David Parker", role: "Director, Human and Robotic Exploration", since: "2016" },
      { name: "Toni Tolker-Nielsen", role: "Director, Space Transportation", since: "2023" },
      { name: "Rolf Densing", role: "Director, Operations", since: "2014" }
    ],
    
    internationalPartners: [
      { name: "NASA", type: "ISS, JWST, Artemis, Mars Sample Return" },
      { name: "JAXA", type: "ISS, BepiColombo, various missions" },
      { name: "CSA", type: "ISS, Artemis" },
      { name: "Roscosmos", type: "ISS, ExoMars (restructured)" },
      { name: "ISRO", type: "Scientific cooperation" },
      { name: "European Union", type: "Galileo, Copernicus programs" }
    ],
    
    spacecraftStats: {
      totalLaunches: "300+ (Ariane family)",
      successfulLaunches: "280+",
      failures: "~20",
      successRate: "95%+ (Ariane 5)"
    },
    
    budgetBreakdown: [
      { category: "Earth Observation", percentage: "20%", amount: "€1.56B" },
      { category: "Navigation (Galileo)", percentage: "15%", amount: "€1.17B" },
      { category: "Space Transportation", percentage: "18%", amount: "€1.40B" },
      { category: "Human & Robotic Exploration", percentage: "17%", amount: "€1.32B" },
      { category: "Telecommunications", percentage: "8%", amount: "€0.62B" },
      { category: "Science", percentage: "12%", amount: "€0.93B" },
      { category: "Space Safety", percentage: "3%", amount: "€0.23B" },
      { category: "Other/Operations", percentage: "7%", amount: "€0.55B" }
    ],
    
    notableMissions: [
      { name: "Rosetta/Philae", type: "Comet Orbiter/Lander", launchDate: "March 2, 2004", status: "Completed (2016)", description: "First mission to orbit a comet (67P/Churyumov-Gerasimenko) and land on its surface. Philae achieved first soft landing on a comet.", keyFindings: ["Comet water different from Earth's oceans", "Discovered organic molecules", "First ever comet landing", "Accompanied comet through perihelion"] },
      { name: "JUICE", type: "Jupiter System Explorer", launchDate: "April 14, 2023", status: "In Transit", description: "Jupiter Icy Moons Explorer will study Ganymede, Europa, and Callisto for potential habitability.", keyFindings: ["En route to Jupiter (arrival 2031)", "Will orbit Ganymede—first orbiter of another planet's moon", "Searching for subsurface oceans"] },
      { name: "Gaia", type: "Space Observatory", launchDate: "December 19, 2013", status: "Active", description: "Creating most precise 3D map of the Milky Way, measuring positions and motions of 1.8 billion stars.", keyFindings: ["Most detailed star map ever created", "Precise positions of 1.8 billion stars", "Discovered 500,000+ new asteroids", "Revolutionary stellar archaeology data"] },
      { name: "James Webb (Ariane 5)", type: "Launch Service", launchDate: "December 25, 2021", status: "Completed", description: "ESA's Ariane 5 launched JWST with such precision that it doubled the telescope's operational lifetime.", keyFindings: ["Perfect trajectory injection", "Minimal fuel used for correction", "Extended JWST lifetime to 20+ years"] },
      { name: "Huygens", type: "Titan Lander", launchDate: "October 15, 1997", status: "Completed (2005)", description: "First landing in the outer solar system. Descended through Titan's atmosphere and landed on surface.", keyFindings: ["First images from Titan's surface", "Methane rain and rivers discovered", "Complex atmospheric chemistry", "Surface like wet sand/clay"] }
    ],
    
    keyFacts: [
      { label: "Type", value: "Intergovernmental Organization" },
      { label: "Member States", value: "22 full + 3 associate" },
      { label: "Annual Budget", value: "€7.79 Billion (2024)" },
      { label: "Direct Employees", value: "2,547" },
      { label: "Industry Workforce", value: "40,000+ Europeans" },
      { label: "Launch Site", value: "Guiana Space Centre, Kourou" },
      { label: "Largest Contributor", value: "France (26%)" },
      { label: "Astronaut Corps", value: "17 active + reserve" },
      { label: "Active Satellites", value: "30+ ESA missions" },
      { label: "Galileo Constellation", value: "28 satellites" },
      { label: "Copernicus Sentinels", value: "12+ operational" },
      { label: "ISS Contribution", value: "Columbus Lab, Service Modules" },
      { label: "Deep Space Stations", value: "3 (ESTRACK)" },
      { label: "Ariane 5 Launches", value: "117 total" }
    ],
    
    programAreas: [
      { name: "Galileo", description: "Europe's global satellite navigation system with 28 satellites providing positioning accuracy of 20-30 cm." },
      { name: "Copernicus", description: "EU/ESA Earth monitoring program with Sentinel satellites, generating 250 TB of data daily for climate and environment." },
      { name: "Artemis Partnership", description: "ESA provides European Service Modules for Orion, I-Hab and ESPRIT modules for Gateway, and lunar elements." },
      { name: "Science Programme", description: "Mandatory program funding cosmic vision missions like JUICE, LISA Pathfinder, and future gravitational wave detection." },
      { name: "Space Transportation", description: "Development and operation of Ariane and Vega launch vehicles; Ariane 6 now entering service." },
      { name: "Telecommunications", description: "Supporting European satellite communication industry with technology development and demonstrations." },
      { name: "Space Safety", description: "Space debris mitigation (ClearSpace-1), planetary defense (Hera), and space weather monitoring." },
      { name: "Exploration", description: "Moon and Mars exploration including ExoMars, Lunar Gateway, and future lunar surface missions." }
    ],
    
    awards: [
      "Prince of Asturias Award for Technical and Scientific Research (Rosetta, 2015)",
      "American Astronautical Society Space Flight Award",
      "International Astronautical Federation Awards (multiple)",
      "Europlanet Prize for Public Engagement"
    ],
    
    socialMedia: [
      { platform: "Twitter/X", handle: "@esa" },
      { platform: "Instagram", handle: "@europeanspaceagency" },
      { platform: "YouTube", handle: "European Space Agency, ESA" },
      { platform: "Facebook", handle: "European Space Agency - ESA" }
    ],
    
    metrics: [
      { label: "Member States", value: "22", trend: "stable" },
      { label: "Galileo Sats", value: "28", trend: "up" },
      { label: "Copernicus Data", value: "250 TB/day" },
      { label: "Deep Space Net", value: "3 sites" },
      { label: "Astronaut Corps", value: "17" },
      { label: "Budget 2024", value: "€7.79B" },
      { label: "Employees", value: "2,547" },
      { label: "Industry Jobs", value: "40,000+" },
      { label: "Ariane 5 Success", value: "98.3%" },
      { label: "Active Missions", value: "30+" }
    ],
    
    facilities: [
      { name: "Guiana Space Centre (CSG)", location: "Kourou, French Guiana", role: "European Spaceport - Launch Operations", established: "1968", area: "690 sq km" },
      { name: "ESTEC", location: "Noordwijk, Netherlands", role: "Technical Heart - Research & Testing", established: "1968", area: "Large campus" },
      { name: "ESOC", location: "Darmstadt, Germany", role: "Mission Control & Operations Centre", established: "1967", area: "Moderate campus" },
      { name: "ESRIN", location: "Frascati, Italy", role: "Earth Observation & Data Centre", established: "1966", area: "Moderate campus" },
      { name: "EAC", location: "Cologne, Germany", role: "European Astronaut Centre - Training", established: "1990", area: "At DLR site" },
      { name: "ESAC", location: "Madrid, Spain", role: "Astronomy & Planetary Science Centre", established: "1975", area: "Villafranca station" },
      { name: "ECSAT", location: "Harwell, UK", role: "Telecommunications & Climate", established: "2009", area: "Moderate" }
    ],
    
    vehicles: [
      { name: "Ariane 6", type: "Heavy-lift Launch Vehicle", status: "Active (inaugural 2024)", payload: "21.6t to LEO, 11.5t to GTO", firstFlight: "July 9, 2024", height: "56-62 m", diameter: "5.4 m core", stages: "2 + boosters", cost: "€115M (A64)" },
      { name: "Vega-C", type: "Small-lift Launch Vehicle", status: "Active", payload: "2.3t to polar orbit", firstFlight: "July 13, 2022", height: "35 m", diameter: "3.4 m", stages: "4", cost: "~€40M" },
      { name: "Ariane 5 (Retired)", type: "Heavy-lift Launch Vehicle", status: "Retired (2023)", payload: "21t to LEO, 10.9t to GTO", firstFlight: "June 4, 1996", height: "52 m", diameter: "5.4 m", stages: "2 + boosters", cost: "€150-180M" }
    ],
    
    timeline: [
      { year: "1964", event: "ESRO & ELDO Formed", detail: "European Space Research Organisation and European Launcher Development Organisation established." },
      { year: "1975", event: "ESA Founded", detail: "ESA Convention signed, merging ESRO and ELDO into unified European Space Agency." },
      { year: "1979", event: "Ariane 1 Launch", detail: "First Ariane rocket launches from Kourou, giving Europe independent access to space." },
      { year: "1986", event: "Giotto at Halley", detail: "First close-up images of a comet nucleus during Halley's Comet encounter." },
      { year: "1990", event: "Hubble Partnership", detail: "ESA contributes to Hubble Space Telescope launch, gaining observation time." },
      { year: "1997", event: "Cassini-Huygens", detail: "Huygens probe (ESA) launches with Cassini, eventually landing on Titan in 2005." },
      { year: "2003", event: "Mars Express", detail: "First European Mars orbiter arrives; Beagle 2 lander lost on surface." },
      { year: "2004", event: "Rosetta Launches", detail: "Begin 10-year journey to Comet 67P for historic orbiting and landing mission." },
      { year: "2014", event: "Rosetta at Comet", detail: "Rosetta arrives at 67P; Philae achieves first comet landing on November 12." },
      { year: "2016", event: "ExoMars TGO", detail: "Trace Gas Orbiter arrives at Mars; Schiaparelli lander crashes." },
      { year: "2016", event: "Galileo IOC", detail: "Galileo navigation system achieves Initial Operational Capability." },
      { year: "2021", event: "JWST Launch", detail: "Ariane 5 launches James Webb Space Telescope with exceptional precision." },
      { year: "2022", event: "Artemis I ESM", detail: "ESA's European Service Module powers Orion around the Moon." },
      { year: "2023", event: "JUICE Launch", detail: "Jupiter Icy Moons Explorer launches for 8-year journey to Jovian system." },
      { year: "2024", event: "Ariane 6 Debut", detail: "Next-generation Ariane 6 rocket successfully completes inaugural flight." }
    ],
    
    activeMissions: [
      "JUICE (Jupiter - in transit)",
      "Gaia (Milky Way mapping)",
      "BepiColombo (Mercury - in transit)",
      "Solar Orbiter (Sun observation)",
      "Mars Express (Mars orbit)",
      "ExoMars TGO (Mars orbit)",
      "Integral (Gamma-ray observatory)",
      "XMM-Newton (X-ray observatory)",
      "Cluster II (Magnetosphere)",
      "Copernicus Sentinels (Earth)",
      "Galileo Constellation (Navigation)",
      "Euclid (Dark universe mapping)",
      "ISS Columbus Module"
    ],
    
    capabilities: [
      "International Space Cooperation",
      "Independent Launch Access (Ariane, Vega)",
      "Global Navigation Systems (Galileo)",
      "Earth Observation Excellence",
      "Deep Space Communication (ESTRACK)",
      "Human Spaceflight Support",
      "Advanced Scientific Instruments",
      "Telecommunications Technology",
      "Planetary Lander Systems",
      "Comet/Asteroid Operations"
    ],
    
    projects: [
      { name: "JUICE", year: "2023-2035", description: "Jupiter Icy Moons Explorer studying Ganymede, Europa, and Callisto for habitability.", status: "Active" },
      { name: "ExoMars Rover", year: "2028", description: "Rosalind Franklin rover to search for life beneath Mars surface (mission restructured).", status: "Planned" },
      { name: "LISA", year: "2030s", description: "Laser Interferometer Space Antenna - first space-based gravitational wave observatory.", status: "Planned" },
      { name: "Hera", year: "2024-2026", description: "Planetary defense mission to study Dimorphos asteroid after NASA DART impact.", status: "Active" },
      { name: "Ariane 6", year: "2024-Present", description: "Next-generation European launcher replacing Ariane 5 for competitive access to space.", status: "Active" }
    ],
    
    achievements: [
      "First comet landing (Rosetta/Philae, 2014)",
      "First landing in outer solar system (Huygens on Titan, 2005)",
      "Most precise star map ever (Gaia - 1.8 billion stars)",
      "Independent global navigation (Galileo - 28 satellites)",
      "Largest Earth observation program (Copernicus)",
      "JWST launch with mission-extending precision",
      "First Mercury orbiter with JAXA (BepiColombo - arriving 2025)",
      "Columbus - Europe's permanent presence on ISS",
      "117 successful Ariane 5 launches (98.3% success)",
      "Pioneer in space debris removal (ClearSpace-1)"
    ],
    
    futurePlans: [
      { title: "ExoMars Rover", timeframe: "2028", description: "Rosalind Franklin rover to drill 2m into Mars, searching for biosignatures and past life." },
      { title: "LISA", timeframe: "2035", description: "Three spacecraft forming 2.5 million km triangle to detect gravitational waves from space." },
      { title: "Lunar Gateway", timeframe: "2025-2030", description: "ESA providing I-Hab and ESPRIT modules for NASA-led lunar orbital station." },
      { title: "Earth Return Orbiter", timeframe: "2030s", description: "ESA spacecraft to collect Mars samples from NASA's orbiter for return to Earth." },
      { title: "Comet Interceptor", timeframe: "2029", description: "First mission to visit a dynamically new comet or interstellar object." }
    ],
    
    controversies: [
      "ExoMars rover delays and Russia partnership issues",
      "Ariane 6 development delays and cost overruns",
      "Galileo initial deployment challenges",
      "Brexit impact on UK participation"
    ]
  },
  
  spacex: {
    id: "spacex",
    name: "SpaceX",
    fullname: "Space Exploration Technologies Corp.",
    founded: "March 14, 2002",
    hq: "Hawthorne, California, U.S.",
    leadership: "Elon Musk (CEO & CTO)",
    budget: "Private (Est. ~$180B Valuation, 2024)",
    workforce: "13,000+ Employees",
    motto: "Making Humanity Multiplanetary",
    description: "Space Exploration Technologies Corp. is an American aerospace manufacturer, space transportation company, and satellite communications provider. Founded by Elon Musk, SpaceX has revolutionized spaceflight through reusable rocket technology, dramatically reducing launch costs. The company operates the world's most active launch program, provides commercial crew transportation to the ISS, and is developing Starship for lunar and Mars missions.",
    technicalOverview: "SpaceX pioneered the vertical landing and reuse of orbital-class rocket boosters, a feat previously considered impossible by industry experts. The Falcon 9 has become the world's most reliable and frequently launched rocket. Starship, when complete, will be the largest and most powerful rocket ever built, designed for full reusability and capable of carrying 100+ tonnes to orbit.",
    accentColor: "#a855f7",
    theme: "nebula-purple",
    website: "https://www.spacex.com",
    
    foundingHistory: "Elon Musk founded SpaceX in June 2002 with the goal of reducing space transportation costs to enable Mars colonization. Frustrated with the high cost of existing launch providers, Musk invested $100 million of his PayPal fortune. The company's first three Falcon 1 launches failed (2006-2008), nearly bankrupting SpaceX. The fourth launch on September 28, 2008 succeeded, making Falcon 1 the first privately developed liquid-fueled rocket to reach orbit. NASA awarded a $1.6B Commercial Resupply Services contract shortly after, saving the company.",
    
    organizationalStructure: "SpaceX is a private company with Elon Musk as CEO, CTO, and chief designer. Gwynne Shotwell serves as President and COO, managing day-to-day operations and business relationships. The company is vertically integrated, manufacturing most components in-house including engines, avionics, and structures. Key divisions include Launch Services, Starlink, Human Spaceflight, Starship, and Dragon operations.",
    
    humanSpaceflight: "SpaceX became the first private company to send humans to orbit with Demo-2 (May 2020). Crew Dragon now provides regular crew transportation to the ISS under NASA's Commercial Crew Program. SpaceX has launched 13 crewed missions to ISS and 3 private missions (Inspiration4, Axiom missions). The company is developing Starship HLS for NASA's Artemis III lunar landing and has signed Yusaku Maezawa for the first civilian lunar flyby (dearMoon).",
    
    roboticExploration: "While primarily a launch provider, SpaceX's Dragon cargo spacecraft has supported ISS operations since 2012, conducting 30+ resupply missions. The company will launch NASA missions including Europa Clipper (launched October 2024) and various scientific payloads. SpaceX's ultimate goal is establishing autonomous cargo delivery to Mars using Starship.",
    
    earthObservation: "SpaceX operates Starlink, the world's largest satellite constellation with 6,000+ satellites providing global broadband internet. While primarily a communications system, Starlink has Earth observation implications through its network. The constellation covers all continents including Antarctica, serving 3+ million users across 75+ countries.",
    
    technologyDevelopment: "SpaceX continuously advances propulsion, materials, and manufacturing technologies. Key innovations include: Merlin engine (highest thrust-to-weight liquid engine), Raptor (first full-flow staged combustion methane engine in flight), autonomous drone ship landing, rapid rocket reuse, and 3D-printed engine components. Current development focuses on Starship full reusability and in-orbit propellant transfer.",
    
    headquarters: {
      address: "1 Rocket Road, Hawthorne, CA 90250, United States",
      coordinates: "33.9208° N, 118.3279° W",
      established: "2002"
    },
    
    leadershipTeam: [
      { name: "Elon Musk", role: "CEO, CTO, Chief Designer", since: "2002" },
      { name: "Gwynne Shotwell", role: "President & COO", since: "2008" },
      { name: "Mark Juncosa", role: "VP of Vehicle Engineering", since: "2018" },
      { name: "Bill Gerstenmaier", role: "VP of Build & Flight Reliability", since: "2020" },
      { name: "Kiko Dontchev", role: "VP of Launch", since: "2020" }
    ],
    
    internationalPartners: [
      { name: "NASA", type: "Commercial Crew, ISS Cargo, Artemis HLS, various launches" },
      { name: "US Space Force", type: "National Security Space Launch" },
      { name: "US DoD", type: "Military satellite launches" },
      { name: "ESA", type: "Euclid launch" },
      { name: "Commercial Customers", type: "100+ companies globally" }
    ],
    
    spacecraftStats: {
      totalLaunches: "400+ (Falcon family)",
      successfulLaunches: "395+",
      failures: "3 (Falcon 9: 2, Falcon 1: 3 early)",
      successRate: "99%+ (Falcon 9 since 2016)"
    },
    
    budgetBreakdown: [
      { category: "Starlink Operations", percentage: "40%" },
      { category: "Launch Services", percentage: "25%" },
      { category: "Starship Development", percentage: "20%" },
      { category: "Dragon Operations", percentage: "10%" },
      { category: "R&D / Other", percentage: "5%" }
    ],
    
    notableMissions: [
      { name: "Falcon 1 Flight 4", type: "Orbital Launch", launchDate: "September 28, 2008", status: "Completed", description: "First privately developed liquid-fueled rocket to reach orbit. Saved SpaceX from bankruptcy.", keyFindings: ["Proved private orbital spaceflight viable", "Merlin engine flight heritage", "Founded commercial space industry"] },
      { name: "Dragon C2+", type: "ISS Cargo", launchDate: "May 22, 2012", status: "Completed", description: "First commercial spacecraft to dock with ISS. Marked new era of commercial space.", keyFindings: ["First private ISS docking", "Proved Dragon cargo capability", "Established commercial resupply"] },
      { name: "Orbcomm OG2 M1", type: "Landing Demo", launchDate: "December 21, 2015", status: "Completed", description: "First successful orbital-class rocket booster landing at Landing Zone 1.", keyFindings: ["First orbital booster landing", "Proved reusability concept", "Revolutionary cost reduction path"] },
      { name: "Demo-2", type: "Crewed Spaceflight", launchDate: "May 30, 2020", status: "Completed", description: "First private crewed orbital mission. Doug Hurley and Bob Behnken to ISS.", keyFindings: ["First private company crewed orbital flight", "Returned US crewed launches after 9 years", "Crew Dragon certified"] },
      { name: "Starship IFT-5", type: "Test Flight", launchDate: "October 13, 2024", status: "Completed", description: "Fifth integrated flight test achieving first-ever catch of Super Heavy booster by tower arms.", keyFindings: ["First orbital booster tower catch", "Starship survived reentry", "Controlled ocean splashdown"] }
    ],
    
    keyFacts: [
      { label: "Type", value: "Private Aerospace Company" },
      { label: "Valuation", value: "~$180 Billion (2024)" },
      { label: "Employees", value: "13,000+" },
      { label: "Total Launches", value: "400+ (Falcon family)" },
      { label: "Total Landings", value: "360+" },
      { label: "Booster Reflights", value: "300+" },
      { label: "Max Reuses (Booster)", value: "23 flights" },
      { label: "Starlink Satellites", value: "6,000+ active" },
      { label: "Starlink Users", value: "3+ million" },
      { label: "Countries Served", value: "75+" },
      { label: "Crewed Missions", value: "16 (to ISS + private)" },
      { label: "ISS Cargo Missions", value: "30+" },
      { label: "Launch Cadence", value: "Every 2-3 days" },
      { label: "2024 Launches", value: "130+ planned" }
    ],
    
    programAreas: [
      { name: "Falcon 9", description: "World's most launched rocket, with 99%+ success rate since 2016. Reusable first stage has flown up to 23 times." },
      { name: "Falcon Heavy", description: "Most powerful operational rocket. Three Falcon 9 cores producing 5 million pounds of thrust." },
      { name: "Starship", description: "Fully reusable super-heavy launch system for Moon, Mars, and beyond. 150t to LEO capability." },
      { name: "Dragon", description: "Crew and cargo spacecraft for ISS missions. Only active US crewed spacecraft (with Boeing Starliner)." },
      { name: "Starlink", description: "Satellite internet constellation providing global broadband. 6,000+ satellites, 3M+ users." },
      { name: "Rideshare", description: "Affordable small satellite launches via Transporter missions. $5,500/kg to orbit." },
      { name: "Artemis HLS", description: "Human Landing System variant of Starship for NASA's lunar surface missions." },
      { name: "Point-to-Point", description: "Future Earth-to-Earth transport via Starship, any destination under 1 hour." }
    ],
    
    awards: [
      "NASA Commercial Crew Development awards",
      "Space Foundation Space Achievement Award",
      "FAA Commercial Space Transportation Award",
      "Aviation Week Laureate Awards (multiple)",
      "Robert J. Collier Trophy (2021)"
    ],
    
    socialMedia: [
      { platform: "Twitter/X", handle: "@SpaceX" },
      { platform: "Instagram", handle: "@spacex" },
      { platform: "YouTube", handle: "SpaceX" },
      { platform: "Flickr", handle: "SpaceX Photos" }
    ],
    
    metrics: [
      { label: "Total Launches", value: "400+", trend: "up" },
      { label: "Total Landings", value: "360+", trend: "up" },
      { label: "Starlink Sats", value: "6,000+", trend: "up" },
      { label: "Starlink Users", value: "3.0M+" },
      { label: "Starship Thrust", value: "7,590 tf" },
      { label: "Launch Cadence", value: "~3 days" },
      { label: "Max Reuse", value: "23 flights" },
      { label: "Employees", value: "13,000+" },
      { label: "F9 Success", value: "99%+" },
      { label: "Crewed Flights", value: "16" }
    ],
    
    facilities: [
      { name: "Starbase", location: "Boca Chica, Texas", role: "Starship Development & Launch", established: "2014", area: "~1,000 acres" },
      { name: "LC-39A", location: "Kennedy Space Center, Florida", role: "Crew & Heavy Launches", established: "2014 (leased)", area: "Historic Apollo/Shuttle pad" },
      { name: "SLC-40", location: "Cape Canaveral SFS, Florida", role: "Falcon 9 Primary Operations", established: "2010 (leased)", area: "USAF facility" },
      { name: "SLC-4E", location: "Vandenberg SFB, California", role: "Polar & SSO Launches", established: "2011 (leased)", area: "USSF facility" },
      { name: "Hawthorne HQ", location: "Hawthorne, California", role: "Headquarters, Manufacturing, Design", established: "2002", area: "Large factory complex" },
      { name: "McGregor", location: "McGregor, Texas", role: "Engine & Stage Testing", established: "2003", area: "Large test complex" },
      { name: "Redmond", location: "Redmond, Washington", role: "Starlink Satellite Development", established: "2015", area: "Satellite factory" }
    ],
    
    vehicles: [
      { name: "Falcon 9", type: "Medium-lift / Reusable", status: "Active", payload: "22.8t to LEO, 8.3t to GTO", firstFlight: "June 4, 2010", height: "70 m", diameter: "3.7 m", stages: "2", cost: "$67M (new), ~$30M (reused)" },
      { name: "Falcon Heavy", type: "Heavy-lift / Reusable", status: "Active", payload: "63.8t to LEO, 26.7t to GTO", firstFlight: "February 6, 2018", height: "70 m", diameter: "12.2 m (with boosters)", stages: "2 + 2 boosters", cost: "$150M (expendable), ~$97M (reused)" },
      { name: "Starship/Super Heavy", type: "Super Heavy-lift / Fully Reusable", status: "Flight Testing", payload: "100-150t to LEO (reusable)", firstFlight: "April 20, 2023 (IFT)", height: "121 m (stack)", diameter: "9 m", stages: "2 (both reusable)", cost: "Target: $10M per launch" },
      { name: "Crew Dragon", type: "Crew Capsule", status: "Active", payload: "4-7 crew to LEO", firstFlight: "March 2, 2019 (Demo-1)", height: "8.1 m with trunk", diameter: "4 m", stages: "N/A", cost: "~$55M per seat (NASA)" },
      { name: "Cargo Dragon 2", type: "Cargo Capsule", status: "Active", payload: "6,000 kg to ISS", firstFlight: "December 6, 2020", height: "8.1 m with trunk", diameter: "4 m", stages: "N/A", cost: "Part of CRS contract" }
    ],
    
    timeline: [
      { year: "2002", event: "SpaceX Founded", detail: "Elon Musk establishes Space Exploration Technologies Corp. with $100M investment." },
      { year: "2006", event: "Falcon 1 Flight 1", detail: "First Falcon 1 launch fails 25 seconds after liftoff due to fuel line leak." },
      { year: "2008", event: "Falcon 1 Reaches Orbit", detail: "Fourth attempt succeeds, making SpaceX first private company to orbit liquid-fueled rocket." },
      { year: "2010", event: "Falcon 9 Debut", detail: "First Falcon 9 launch succeeds, demonstrating scalable architecture." },
      { year: "2012", event: "Dragon ISS Docking", detail: "Dragon C2+ becomes first private spacecraft to dock with ISS." },
      { year: "2015", event: "First Booster Landing", detail: "Falcon 9 lands at LZ-1 after Orbcomm mission—first orbital booster recovery." },
      { year: "2016", event: "First Drone Ship Landing", detail: "First successful landing on autonomous drone ship 'Of Course I Still Love You'." },
      { year: "2017", event: "First Reflight", detail: "SES-10 mission becomes first to reuse orbital-class booster." },
      { year: "2018", event: "Falcon Heavy Debut", detail: "World's most powerful operational rocket launches with Starman Tesla Roadster." },
      { year: "2019", event: "Starlink Begins", detail: "First batch of 60 Starlink satellites launched, beginning global internet project." },
      { year: "2020", event: "Demo-2 Crew Flight", detail: "First private crewed orbital mission; returns US astronaut launches after 9 years." },
      { year: "2021", event: "Inspiration4", detail: "First all-civilian orbital mission; 3 days in Dragon at highest altitude since Hubble." },
      { year: "2023", event: "Starship First Flight", detail: "First integrated Starship/Super Heavy test flight (IFT-1); stage separation failed." },
      { year: "2024", event: "IFT-5 Booster Catch", detail: "Super Heavy booster caught by tower 'chopsticks' for first time; Starship survives reentry." },
      { year: "2024", event: "100th Landing", detail: "SpaceX achieves 360+ booster landings, with single booster flying 23 times." }
    ],
    
    activeMissions: [
      "Starlink Constellation Expansion",
      "ISS Commercial Resupply (CRS-2)",
      "Commercial Crew (Crew Dragon)",
      "Transporter Rideshare Program",
      "National Security Launches (NSSL)",
      "Commercial GEO/GTO Launches",
      "Starship Development Program",
      "NASA Artemis HLS Development",
      "Private Astronaut Missions (Axiom)",
      "Polaris Program (private EVA)"
    ],
    
    capabilities: [
      "Rapid Rocket Reusability",
      "Autonomous Precision Landing",
      "High Launch Cadence",
      "Heavy Lift to All Orbits",
      "Human Spaceflight Operations",
      "Global Satellite Internet",
      "Propellant Transfer (Developing)",
      "Full Stack Reuse (Developing)",
      "Orbital Refueling (Developing)",
      "Mars Transportation (Developing)"
    ],
    
    projects: [
      { name: "Starship", year: "2016-Present", description: "Fully reusable super-heavy launch system. 121m tall, 7,590 tonnes thrust. Designed for Moon, Mars, and point-to-point Earth travel.", status: "Active" },
      { name: "Starlink", year: "2019-Present", description: "Satellite internet megaconstellation with 6,000+ satellites serving 3M+ users in 75+ countries. Gen2 satellites launching.", status: "Active" },
      { name: "Artemis HLS", year: "2021-Present", description: "Starship variant for NASA Human Landing System. Will land first woman and person of color on Moon.", status: "Active" },
      { name: "Polaris Program", year: "2022-Present", description: "Private human spaceflight program with Jared Isaacman. Polaris Dawn completed first commercial EVA.", status: "Active" },
      { name: "Direct-to-Cell", year: "2024-Present", description: "Partnership with T-Mobile for direct satellite-to-phone connectivity via Starlink satellites.", status: "Active" }
    ],
    
    achievements: [
      "First private liquid-fueled rocket to orbit (Falcon 1, 2008)",
      "First private spacecraft to dock with ISS (Dragon, 2012)",
      "First vertical landing of orbital rocket booster (2015)",
      "First reflight of orbital-class booster (2017)",
      "First private crewed orbital spaceflight (Demo-2, 2020)",
      "Most launches in a year by any entity (96 in 2023)",
      "World's most launched rocket (Falcon 9)",
      "Largest satellite constellation (Starlink 6,000+)",
      "First catch of super-heavy booster (IFT-5, 2024)",
      "Most reused rocket booster (23 flights, B1062)"
    ],
    
    futurePlans: [
      { title: "Starship Operational", timeframe: "2025", description: "Regular Starship launches for Starlink deployment and commercial payloads." },
      { title: "Artemis III HLS", timeframe: "2026", description: "SpaceX Starship lands NASA astronauts on Moon for first time since Apollo." },
      { title: "Mars Cargo Mission", timeframe: "2026-2028", description: "First uncrewed Starship mission to Mars to test landing and systems." },
      { title: "Mars Crewed Mission", timeframe: "2029-2030s", description: "First human mission to Mars using Starship, establishing initial presence." },
      { title: "Point-to-Point Travel", timeframe: "2030s", description: "Starship enabling any-to-any destination on Earth in under one hour." }
    ],
    
    controversies: [
      "Environmental concerns at Starbase, Texas",
      "FAA launch license delays for Starship",
      "Starlink light pollution affecting astronomy",
      "Labor practices and workplace culture concerns"
    ]
  }
};
