import { prisma } from "@/lib/prisma"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { Navbar } from "@/components/layout/Navbar"
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  ArrowRight,
  TrendingUp,
  Workflow
} from "lucide-react"

export default async function Home() {
  const services = await prisma.service.findMany()

  return (
    <div className="min-h-screen bg-[#030711] text-slate-50 selection:bg-primary/30 selection:text-primary-foreground">
      {/* Immersive Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[140px] opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.04]"></div>
        
        {/* Animated Particles/Blobs */}
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-primary rounded-full blur-[2px] animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full blur-[2px] animate-bounce duration-[3000ms]"></div>
      </div>

      <Navbar />
      
      <main className="relative z-10">
        {/* Futuristic Hero Section */}
        <section className="pt-28 pb-20 lg:pt-40 lg:pb-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10 text-slate-300 text-sm font-medium backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.15)] transform hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">
                  Enterprise-Grade Logistics v2.0
                </span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.9] lg:px-4">
                <span className="bg-gradient-to-b from-white via-white/80 to-white/40 bg-clip-text text-transparent">
                  Precision
                </span>
                <br />
                <span className="relative inline-block mt-4">
                  <span className="text-primary italic font-serif">Booking</span>
                  <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-primary/30 blur-sm rounded-full"></div>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                Automated scheduling and unified invoicing. <br className="hidden md:block" />
                Eliminate friction, accelerate service, and scale your operations.
              </p>

              {/* Action Preview */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-10">
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl glass-light border border-white/5 shadow-xl">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium text-slate-300">Instant Activation</span>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl glass-light border border-white/5 shadow-xl">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-slate-300">2.5x Efficiency Lift</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Decorative Icon */}
          <div className="absolute top-1/2 left-10 hidden xl:block animate-bounce duration-[4000ms] opacity-20">
             <Calendar className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute bottom-1/4 right-10 hidden xl:block animate-pulse duration-[3000ms] opacity-20">
             <Workflow className="w-20 h-20 text-purple-500" />
          </div>
        </section>

        {/* The Booking Engine Interface */}
        <section id="book" className="pb-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto relative">
              {/* Complex Glow Underlay */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-500/30 to-blue-600/30 rounded-[40px] blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative glass-dark rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                
                <div className="p-1 md:p-4 lg:p-8">
                   <div className="mb-10 text-center">
                      <h3 className="text-2xl font-semibold text-white">Start Your Journey</h3>
                      <p className="text-slate-500 text-sm mt-1">Select a configuration below to proceed</p>
                   </div>
                   <BookingWizard services={services} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="py-24 bg-white/[0.02] border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-white">Smart Detection</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Advanced conflict detection algorithms ensure zero double-bookings across your entire team.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                   <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Rapid Invoicing</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Automatic PDF generation and billing integrated directly into the scheduling workflow.
                </p>
              </div>
              <div className="space-y-4 group">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Secured Access</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enterprise-grade data encryption and role-based access control for your high-value assets.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Modern Call to Action */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full transform translate-y-1/2 scale-150"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
             <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Scale?</h2>
             <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
               Join hundreds of service-based businesses optimizing their operations with Rapid-Book.
             </p>
             <button className="px-12 py-5 rounded-2xl bg-white text-black font-bold text-lg hover:bg-slate-200 transition-all flex items-center gap-2 mx-auto">
                Get Started Now <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
               <h3 className="text-2xl font-bold text-white mb-6 tracking-tighter">RAPID<span className="text-primary italic">BOOK</span></h3>
               <p className="text-slate-500 max-w-xs leading-relaxed">
                 The enterprise logistics engine for the modern service economy. A product of Rapid-Tech Solutions.
               </p>
            </div>
            <div>
               <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">Platform</h4>
               <ul className="space-y-3 text-sm text-slate-500">
                  <li className="hover:text-primary transition-colors cursor-pointer">Services</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Booking</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Invoicing</li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-semibold mb-6 uppercase text-xs tracking-widest">Support</h4>
               <ul className="space-y-3 text-sm text-slate-500">
                  <li className="hover:text-primary transition-colors cursor-pointer">Documentation</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Security</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
               </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center text-xs text-slate-600 uppercase tracking-widest font-medium">
            &copy; 2026 Rapid-Book // Built by Rapid-Tech Solutions Engineering
          </div>
        </div>
      </footer>
    </div>
  )
}
