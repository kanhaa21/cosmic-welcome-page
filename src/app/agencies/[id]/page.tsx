"use client";

import { use } from "react";
import { Taskbar } from "@/components/space/Taskbar";
import { CustomCursor } from "@/components/space/CustomCursor";
import { agencyData } from "@/lib/agencies";
import Link from "next/link";

export default function AgencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = agencyData[id as keyof typeof agencyData] || agencyData.nasa;

  return (
    <div className="bg-[#0a0a0f] text-zinc-300 min-h-screen">
      <CustomCursor />
      <Taskbar />
      
      <div className="max-w-[1400px] mx-auto px-4 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="text-[10px] text-zinc-500 mb-4 font-mono">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/agencies" className="hover:text-white">Agencies</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-400">{data.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{data.fullname}</h1>
        <p className="text-zinc-500 text-xs mb-6 italic">{data.motto}</p>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            
            {/* Lead Paragraph */}
            <section className="text-[13px] leading-relaxed text-zinc-300">
              <p className="mb-3">
                <strong className="text-white">{data.fullname}</strong> ({data.name}) is {data.description}
              </p>
              <p className="text-zinc-400">
                {data.technicalOverview}
              </p>
            </section>

            {/* Table of Contents */}
            <nav className="bg-zinc-900/50 border border-zinc-800 p-4 rounded text-[11px]">
              <h3 className="text-white font-semibold mb-2 text-xs">Contents</h3>
              <ol className="list-decimal list-inside space-y-1 text-zinc-400 columns-2">
                <li><a href="#history" className="hover:text-white">History</a></li>
                <li><a href="#organization" className="hover:text-white">Organization</a></li>
                <li><a href="#leadership" className="hover:text-white">Leadership</a></li>
                <li><a href="#budget" className="hover:text-white">Budget</a></li>
                <li><a href="#facilities" className="hover:text-white">Facilities</a></li>
                <li><a href="#launch-vehicles" className="hover:text-white">Launch Vehicles</a></li>
                <li><a href="#programs" className="hover:text-white">Programs</a></li>
                <li><a href="#notable-missions" className="hover:text-white">Notable Missions</a></li>
                <li><a href="#human-spaceflight" className="hover:text-white">Human Spaceflight</a></li>
                <li><a href="#robotic-exploration" className="hover:text-white">Robotic Exploration</a></li>
                <li><a href="#earth-observation" className="hover:text-white">Earth Observation</a></li>
                <li><a href="#partnerships" className="hover:text-white">International Partners</a></li>
                <li><a href="#achievements" className="hover:text-white">Achievements</a></li>
                <li><a href="#timeline" className="hover:text-white">Timeline</a></li>
                <li><a href="#future" className="hover:text-white">Future Plans</a></li>
                <li><a href="#active-missions" className="hover:text-white">Active Missions</a></li>
              </ol>
            </nav>

            {/* History */}
            <section id="history" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">History</h2>
              <p className="text-[12px] leading-relaxed text-zinc-400">{data.foundingHistory}</p>
            </section>

            {/* Organization */}
            <section id="organization" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Organizational Structure</h2>
              <p className="text-[12px] leading-relaxed text-zinc-400">{data.organizationalStructure}</p>
            </section>

            {/* Leadership */}
            <section id="leadership" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Leadership</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/70">
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Name</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Position</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Since</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.leadershipTeam.map((leader, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30">
                        <td className="p-2 border border-zinc-800 text-zinc-400">{leader.name}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-400">{leader.role}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-500">{leader.since || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Budget */}
            <section id="budget" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Budget & Funding</h2>
              <p className="text-[12px] text-zinc-400 mb-3">Annual budget: <span className="text-white font-medium">{data.budget}</span></p>
              <h3 className="text-sm font-semibold text-zinc-300 mb-2">Budget Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/70">
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Category</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Percentage</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.budgetBreakdown.map((item, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30">
                        <td className="p-2 border border-zinc-800 text-zinc-400">{item.category}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-400">{item.percentage}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-500">{item.amount || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Facilities */}
            <section id="facilities" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Facilities & Centers</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/70">
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Facility</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Location</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Role</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Est.</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Area</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.facilities.map((f, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30">
                        <td className="p-2 border border-zinc-800 text-zinc-300 font-medium">{f.name}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-400">{f.location}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-400">{f.role}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-500">{f.established || "—"}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-500">{f.area || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Launch Vehicles */}
            <section id="launch-vehicles" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Launch Vehicles & Spacecraft</h2>
              <div className="space-y-4">
                {data.vehicles.map((v, i) => (
                  <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-3 rounded">
                    <h3 className="text-sm font-bold text-white mb-2">{v.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                      <div><span className="text-zinc-500">Type:</span> <span className="text-zinc-300">{v.type}</span></div>
                      <div><span className="text-zinc-500">Status:</span> <span className={v.status.includes("Active") || v.status.includes("Operational") ? "text-green-400" : "text-orange-400"}>{v.status}</span></div>
                      <div><span className="text-zinc-500">Payload:</span> <span className="text-zinc-300">{v.payload}</span></div>
                      <div><span className="text-zinc-500">First Flight:</span> <span className="text-zinc-300">{v.firstFlight || "—"}</span></div>
                      <div><span className="text-zinc-500">Height:</span> <span className="text-zinc-300">{v.height || "—"}</span></div>
                      <div><span className="text-zinc-500">Diameter:</span> <span className="text-zinc-300">{v.diameter || "—"}</span></div>
                      <div><span className="text-zinc-500">Stages:</span> <span className="text-zinc-300">{v.stages || "—"}</span></div>
                      <div><span className="text-zinc-500">Cost:</span> <span className="text-zinc-300">{v.cost || "—"}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Programs */}
            <section id="programs" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Major Programs</h2>
              <div className="space-y-3">
                {data.programAreas.map((prog, i) => (
                  <div key={i} className="text-[12px]">
                    <h3 className="text-zinc-200 font-semibold">{prog.name}</h3>
                    <p className="text-zinc-500">{prog.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Notable Missions */}
            <section id="notable-missions" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Notable Missions</h2>
              <div className="space-y-4">
                {data.notableMissions.map((m, i) => (
                  <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-3 rounded">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white">{m.name}</h3>
                      <span className="text-[9px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded">{m.type}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded ${m.status === "Active" ? "bg-green-900/50 text-green-400" : m.status === "Completed" ? "bg-blue-900/50 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}>{m.status}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mb-2">Launch: {m.launchDate}</p>
                    <p className="text-[11px] text-zinc-400 mb-2">{m.description}</p>
                    {m.keyFindings && m.keyFindings.length > 0 && (
                      <div>
                        <span className="text-[10px] text-zinc-500 font-semibold">Key Findings:</span>
                        <ul className="list-disc list-inside text-[10px] text-zinc-500 mt-1">
                          {m.keyFindings.map((f, j) => <li key={j}>{f}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Human Spaceflight */}
            <section id="human-spaceflight" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Human Spaceflight</h2>
              <p className="text-[12px] leading-relaxed text-zinc-400">{data.humanSpaceflight}</p>
            </section>

            {/* Robotic Exploration */}
            <section id="robotic-exploration" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Robotic Exploration</h2>
              <p className="text-[12px] leading-relaxed text-zinc-400">{data.roboticExploration}</p>
            </section>

            {/* Earth Observation */}
            <section id="earth-observation" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Earth Observation</h2>
              <p className="text-[12px] leading-relaxed text-zinc-400">{data.earthObservation}</p>
            </section>

            {/* Technology */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Technology Development</h2>
              <p className="text-[12px] leading-relaxed text-zinc-400">{data.technologyDevelopment}</p>
            </section>

            {/* International Partners */}
            <section id="partnerships" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">International Partnerships</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/70">
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Partner</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Collaboration Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.internationalPartners.map((p, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30">
                        <td className="p-2 border border-zinc-800 text-zinc-300 font-medium">{p.name}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-400">{p.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Key Achievements</h2>
              <ul className="list-disc list-inside text-[12px] text-zinc-400 space-y-1">
                {data.achievements.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </section>

            {/* Timeline */}
            <section id="timeline" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Historical Timeline</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-zinc-900/70">
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold w-20">Year</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold w-32">Event</th>
                      <th className="text-left p-2 border border-zinc-800 text-zinc-300 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.timeline.map((t, i) => (
                      <tr key={i} className="hover:bg-zinc-900/30">
                        <td className="p-2 border border-zinc-800 font-mono font-bold" style={{ color: data.accentColor }}>{t.year}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-300 font-medium">{t.event}</td>
                        <td className="p-2 border border-zinc-800 text-zinc-500">{t.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Future Plans */}
            <section id="future" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Future Plans & Missions</h2>
              <div className="space-y-3">
                {data.futurePlans.map((plan, i) => (
                  <div key={i} className="bg-zinc-900/30 border border-zinc-800 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{plan.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded font-mono" style={{ backgroundColor: `${data.accentColor}20`, color: data.accentColor }}>{plan.timeframe}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{plan.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Missions */}
            <section id="active-missions" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Current Active Missions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {data.activeMissions.map((m, i) => (
                  <div key={i} className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    {m}
                  </div>
                ))}
              </div>
            </section>

            {/* Capabilities */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Core Capabilities</h2>
              <ul className="grid grid-cols-2 gap-1 text-[11px] text-zinc-400">
                {data.capabilities.map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-zinc-600">•</span> {c}
                  </li>
                ))}
              </ul>
            </section>

            {/* Awards */}
            {data.awards && data.awards.length > 0 && (
              <section className="scroll-mt-24">
                <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Awards & Recognition</h2>
                <ul className="list-disc list-inside text-[11px] text-zinc-400 space-y-0.5">
                  {data.awards.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </section>
            )}

            {/* Controversies */}
            {data.controversies && data.controversies.length > 0 && (
              <section className="scroll-mt-24">
                <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">Challenges & Controversies</h2>
                <ul className="list-disc list-inside text-[11px] text-zinc-400 space-y-0.5">
                  {data.controversies.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </section>
            )}

            {/* References / External Links */}
            <section className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-1 mb-3">External Links</h2>
              <ul className="text-[11px] space-y-1">
                <li>
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    Official Website: {data.website}
                  </a>
                </li>
                {data.socialMedia.map((s, i) => (
                  <li key={i} className="text-zinc-400">
                    {s.platform}: <span className="text-zinc-300">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* Sidebar Infobox */}
          <aside className="lg:w-[320px] flex-shrink-0">
            <div className="sticky top-24 bg-zinc-900/70 border border-zinc-800 rounded overflow-hidden">
              {/* Header */}
              <div className="p-3 text-center border-b border-zinc-800" style={{ backgroundColor: `${data.accentColor}15` }}>
                <h2 className="text-lg font-bold text-white">{data.name}</h2>
                <p className="text-[10px] text-zinc-400">{data.fullname}</p>
              </div>

              {/* Key Facts Table */}
              <div className="text-[10px]">
                <div className="grid grid-cols-[100px_1fr] border-b border-zinc-800">
                  <div className="p-2 bg-zinc-900/50 text-zinc-500 font-medium border-r border-zinc-800">Founded</div>
                  <div className="p-2 text-zinc-300">{data.founded}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-zinc-800">
                  <div className="p-2 bg-zinc-900/50 text-zinc-500 font-medium border-r border-zinc-800">Headquarters</div>
                  <div className="p-2 text-zinc-300">{data.hq}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-zinc-800">
                  <div className="p-2 bg-zinc-900/50 text-zinc-500 font-medium border-r border-zinc-800">Administrator</div>
                  <div className="p-2 text-zinc-300">{data.leadership}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-zinc-800">
                  <div className="p-2 bg-zinc-900/50 text-zinc-500 font-medium border-r border-zinc-800">Budget</div>
                  <div className="p-2 text-zinc-300">{data.budget}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-zinc-800">
                  <div className="p-2 bg-zinc-900/50 text-zinc-500 font-medium border-r border-zinc-800">Workforce</div>
                  <div className="p-2 text-zinc-300">{data.workforce}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] border-b border-zinc-800">
                  <div className="p-2 bg-zinc-900/50 text-zinc-500 font-medium border-r border-zinc-800">Website</div>
                  <div className="p-2 text-blue-400 truncate">
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {data.website.replace("https://", "")}
                    </a>
                  </div>
                </div>
              </div>

              {/* HQ Details */}
              <div className="p-3 border-b border-zinc-800">
                <h4 className="text-[10px] text-zinc-500 font-semibold mb-1.5 uppercase tracking-wider">Headquarters</h4>
                <p className="text-[10px] text-zinc-400 leading-relaxed">{data.headquarters.address}</p>
                <p className="text-[9px] text-zinc-600 mt-1 font-mono">{data.headquarters.coordinates}</p>
              </div>

              {/* Stats */}
              <div className="p-3 border-b border-zinc-800">
                <h4 className="text-[10px] text-zinc-500 font-semibold mb-2 uppercase tracking-wider">Launch Statistics</h4>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Total Launches</span>
                    <span className="text-zinc-300">{data.spacecraftStats.totalLaunches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Successful</span>
                    <span className="text-green-400">{data.spacecraftStats.successfulLaunches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Failures</span>
                    <span className="text-red-400">{data.spacecraftStats.failures}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Success Rate</span>
                    <span className="text-white font-medium">{data.spacecraftStats.successRate}</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="p-3 border-b border-zinc-800">
                <h4 className="text-[10px] text-zinc-500 font-semibold mb-2 uppercase tracking-wider">Key Facts</h4>
                <div className="space-y-1 text-[10px]">
                  {data.keyFacts.slice(0, 10).map((fact, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-zinc-500">{fact.label}</span>
                      <span className="text-zinc-300">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="p-3">
                <h4 className="text-[10px] text-zinc-500 font-semibold mb-2 uppercase tracking-wider">At a Glance</h4>
                <div className="grid grid-cols-2 gap-2">
                  {data.metrics.slice(0, 6).map((m, i) => (
                    <div key={i} className="bg-zinc-800/50 p-2 rounded text-center">
                      <div className="text-sm font-bold" style={{ color: data.accentColor }}>{m.value}</div>
                      <div className="text-[8px] text-zinc-500 uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-zinc-800 text-[10px] text-zinc-600">
          <p>Data compiled from official sources. Last updated: 2024.</p>
          <p className="mt-1">Categories: Space agencies • {data.hq.split(",").pop()?.trim()} • Aerospace • Space exploration</p>
        </footer>
      </div>
    </div>
  );
}
