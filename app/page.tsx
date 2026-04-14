import { prisma } from "@/lib/prisma"
import { BookingWizard } from "@/components/booking/BookingWizard"
import { Navbar } from "@/components/layout/Navbar"

export default async function Home() {
  const services = await prisma.service.findMany()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        <div className="container mx-auto py-16 px-4 relative">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available Now
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                Book Your Appointment
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Select a service and time that works for you. Simple, fast, and hassle-free booking experience.
            </p>
          </div>
          
          <BookingWizard services={services} />
        </div>
      </div>
    </div>
  )
}
