import { prisma } from "@/lib/prisma"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { Navbar } from "@/components/layout/Navbar"
import { ArrowRight, Minus } from "lucide-react"

export default async function Home() {
  const services = await prisma.service.findMany()

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] selection:bg-white selection:text-black">
      {/* Absolute Minimalist Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,#1A1A1A_1px,transparent_0)] bg-[size:40px_40px] opacity-[0.2]"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        {/* Precise Typography Hero */}
        <section className="pt-32 pb-24 lg:pt-48 lg:pb-40">
          <div className="container mx-auto px-8 md:px-12">
            <div className="max-w-screen-xl">
              <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-8 max-w-3xl">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase text-[#666666]">
                    <Minus className="w-8 h-[2px] bg-[#333333]" />
                    <span>Deployment Readiness 2026</span>
                  </div>
                  
                  <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter leading-[0.85]">
                    Simple.<br />
                    Precise.<br />
                    Rapid.
                  </h1>
                </div>

                <div className="max-w-md pb-4 border-l border-[#222222] pl-8">
                  <p className="text-xl text-[#888888] leading-relaxed font-light">
                    An enterprise scheduling protocol for the modern service economy. 
                    Engineered to eliminate friction and automate logistics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Minimalist Grid - Feature Set */}
        <section className="border-y border-[#111111] py-20">
           <div className="container mx-auto px-8 md:px-12">
              <div className="grid md:grid-cols-4 gap-12">
                 {[
                   { label: "01", title: "Smart-Detect", desc: "Conflict-free state machine." },
                   { label: "02", title: "Auto-Bill", desc: "Automated ledger generation." },
                   { label: "03", title: "Encrypted", desc: "End-to-end data security." },
                   { label: "04", title: "Real-time", desc: "Instant node-sync protocols." },
                 ].map((feat) => (
                   <div key={feat.label} className="space-y-4 group cursor-default">
                      <span className="text-[10px] font-bold text-[#333333] tracking-widest group-hover:text-white transition-colors">
                        / {feat.label}
                      </span>
                      <h3 className="text-lg font-medium text-white">{feat.title}</h3>
                      <p className="text-sm text-[#555555] leading-snug">{feat.desc}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* The Action Floor */}
        <section id="book" className="py-32 relative group">
          <div className="container mx-auto px-8 md:px-12">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                   <div className="lg:w-1/3">
                      <div className="sticky top-32 space-y-6">
                        <h2 className="text-4xl font-bold tracking-tight">Booking<br />Protocol</h2>
                        <p className="text-[#666666] leading-relaxed">
                          Initialize the booking sequence by selecting your required node service from the registry.
                        </p>
                        <div className="pt-8 flex flex-col gap-4">
                           <div className="flex items-center gap-2 text-xs font-medium text-[#444444]">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                             System Operational
                           </div>
                           <div className="flex items-center gap-2 text-xs font-medium text-[#444444]">
                             <span className="w-2 h-2 rounded-full bg-[#222222]"></span>
                             Latency: 14ms
                           </div>
                        </div>
                      </div>
                   </div>
                   
                   <div className="lg:w-2/3">
                      <div className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-none p-1 md:p-10 shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <BookingWizard services={services} />
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </section>

        {/* Closing Phase */}
        <section className="py-48 bg-white text-black">
          <div className="container mx-auto px-8 md:px-12 overflow-hidden">
             <div className="flex flex-col md:flex-row justify-between items-center gap-12 group">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700">
                  READY TO SCALE.
                </h2>
                <button className="flex items-center gap-4 text-xl font-bold group-hover:translate-x-4 transition-transform duration-500">
                   Initialize <ArrowRight className="w-8 h-8" />
                </button>
             </div>
          </div>
        </section>
      </main>

      <footer className="py-24 border-t border-[#111111] text-[#333333]">
        <div className="container mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-white tracking-widest">RAPID<span className="font-light">BOOK</span></h3>
               <p className="text-sm max-w-xs leading-relaxed">
                 High-performance logistics. <br />
                 Managed by Rapid-Tech Solutions.
               </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Registry</h4>
                  <ul className="text-xs space-y-2">
                     <li className="hover:text-white cursor-pointer transition-colors">Nodes</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Schedules</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Ledger</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">System</h4>
                  <ul className="text-xs space-y-2">
                     <li className="hover:text-white cursor-pointer transition-colors">Status</li>
                     <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                     <li className="hover:text-white cursor-pointer transition-colors">API</li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-[#111111] flex justify-between items-center text-[10px] font-medium uppercase tracking-[0.2em]">
             <span>&copy; 2026 Prototype-01</span>
             <span>Universal Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
