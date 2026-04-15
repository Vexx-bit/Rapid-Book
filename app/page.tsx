import { prisma } from "@/lib/prisma"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { Navbar } from "@/components/layout/Navbar"
import { Calendar, Clock, ShieldCheck, Sparkles } from "lucide-react"

export default async function Home() {
  const services = await prisma.service.findMany()

  return (
    <div className="min-h-screen bg-[#030711] text-slate-50 selection:bg-primary/30 selection:text-primary-foreground">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        {/* Dynamic Hero Section */}
        <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-slate-300 text-sm font-medium backdrop-blur-md animate-fade-in shadow-2xl">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Modern Scheduling Engineering</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  Automated
                </span>
                <br />
                <span className="text-primary italic font-serif">Logistics</span>
              </h1>
              
              <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Experience high-performance booking. Engineered for speed, efficiency, and zero friction.
              </p>

              {/* USP Row */}
              <div className="grid grid-cols-3 gap-8 pt-8 max-w-2xl mx-auto border-t border-white/5">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Real-time</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Smart-Detect</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Interface */}
        <section className="pb-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="relative group">
                {/* Decorative glow behind the wizard */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-black/40 backdrop-blur-xl p-8">
                  <BookingWizard services={services} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer Mini */}
      <footer className="py-12 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; 2026 Rapid-Book Engineering. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
