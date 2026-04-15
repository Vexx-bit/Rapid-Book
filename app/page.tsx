import { prisma } from "@/lib/prisma"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { Navbar } from "@/components/layout/Navbar"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  const services = await prisma.service.findMany()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] selection:bg-white selection:text-black font-sans">
      {/* Absolute Minimalist Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,#1A1A1A_1px,transparent_0)] bg-[size:40px_40px] opacity-[0.2]"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        {/* Pure Typography Hero */}
        <section className="pt-32 pb-24 lg:pt-56 lg:pb-40">
          <div className="container mx-auto px-8 md:px-12">
            <div className="max-w-screen-xl">
              <div className="flex flex-col gap-16 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-12 max-w-4xl">
                  <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter leading-[0.8] text-white">
                    MOTION.<br />
                    ORDER.<br />
                    FLIGHT.
                  </h1>
                </div>

                <div className="max-w-md pb-6 border-l border-[#222222] pl-10">
                  <p className="text-xl text-[#888888] leading-relaxed font-light">
                    An architectural protocol for global service logistics. 
                    Engineered for precision, speed, and absolute clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimalist Narrative Segment */}
        <section className="border-y border-[#111111] py-32">
           <div className="container mx-auto px-8 md:px-12">
              <div className="grid md:grid-cols-3 gap-24">
                 {[
                   { title: "Foundational", desc: "Built on a conflict-free state machine for zero-friction scheduling." },
                   { title: "Automated", desc: "Autonomous ledger generation and distribution for rapid settlement." },
                   { title: "Universal", desc: "A singular interface for complex service coordination and logistics." },
                 ].map((feat) => (
                   <div key={feat.title} className="space-y-6 group cursor-default">
                      <h3 className="text-2xl font-medium text-white">{feat.title}</h3>
                      <p className="text-lg text-[#555555] leading-relaxed font-light">{feat.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* The Action Floor */}
        <section id="book" className="py-40 relative">
          <div className="container mx-auto px-8 md:px-12">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-32">
                   <div className="lg:w-1/3">
                      <div className="sticky top-40 space-y-8">
                        <h2 className="text-5xl font-bold tracking-tighter text-white uppercase">Initialize<br />Protocol</h2>
                        <p className="text-[#666666] text-xl font-light leading-relaxed">
                          Select a node service to begin the coordination sequence. 
                        </p>
                        <div className="pt-12 flex flex-col gap-6">
                           <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-[#333333] uppercase">
                             <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                             Operational Status: Primed
                           </div>
                           <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-[#333333] uppercase">
                             <div className="h-[1px] w-12 bg-[#222222]"></div>
                             Latency: Optimal
                           </div>
                        </div>
                      </div>
                   </div>
                   
                   <div className="lg:w-2/3">
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-0 md:p-16 shadow-[0_0_150px_rgba(0,0,0,1)]">
                        <BookingWizard services={services} />
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </section>

        {/* High-Impact Closing */}
        <section className="py-64 bg-white text-black text-center">
          <div className="container mx-auto px-8 md:px-12">
             <div className="space-y-12">
                <h2 className="text-[10rem] md:text-[20rem] font-black tracking-tighter leading-none select-none">
                  RAPID.
                </h2>
                <div className="flex justify-center">
                   <button className="flex items-center gap-6 text-3xl font-bold tracking-tighter hover:gap-12 transition-all duration-700 uppercase">
                      Execute <ArrowRight className="w-12 h-12 stroke-[1.5px]" />
                   </button>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-32 border-t border-[#111111] text-[#222222]">
        <div className="container mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-24">
            <div className="space-y-6">
               <h3 className="text-2xl font-bold text-white tracking-widest uppercase">RapidBook</h3>
               <p className="text-lg text-[#444444] max-w-xs leading-relaxed font-light">
                 High-performance logistics.<br />
                 Universal Service Protocol.
               </p>
            </div>
            <div className="flex gap-32">
               <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white">Registry</h4>
                  <ul className="text-sm space-y-3 font-medium">
                     <li className="hover:text-white cursor-pointer transition-colors">Nodes</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Flow</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Ledger</li>
                  </ul>
               </div>
               <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white">Protocol</h4>
                  <ul className="text-sm space-y-3 font-medium">
                     <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                     <li className="hover:text-white cursor-pointer transition-colors">API</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Audit</li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="mt-40 pt-10 border-t border-[#111111] flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-[#333333]">
             <span>Rapid-Tech Solutions &copy; 2026</span>
             <span>Universal Distribution Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
