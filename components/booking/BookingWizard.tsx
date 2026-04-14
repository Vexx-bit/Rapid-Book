'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Service } from '@prisma/client'
import { ServiceSelection } from './ServiceSelection'
import { DateTimeSelection } from './DateTimeSelection'
import { CustomerForm } from './CustomerForm'
import { toast } from 'sonner'
import { createBooking } from "@/actions/create-booking"
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BookingWizardProps {
  services: Service[]
}

export function BookingWizard({ services }: BookingWizardProps) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleSlotSelect = (date: Date, slot: string) => {
    setSelectedDate(date)
    setSelectedSlot(slot)
    setStep(3)
  }

  const handleBookingSubmit = async (details: { name: string, email: string }) => {
    if (!selectedService || !selectedSlot) return

    try {
        const result = await createBooking({
            serviceId: selectedService.id,
            slot: selectedSlot,
            name: details.name,
            email: details.email
        })

        if (result.success) {
            toast.success("Booking Confirmed!")
            setIsSuccess(true)
        }
    } catch (error) {
        toast.error("Booking failed. Please try again.")
        console.error(error)
    }
  }

  const resetBooking = () => {
      setStep(1)
      setSelectedService(null)
      setSelectedDate(undefined)
      setSelectedSlot(null)
      setIsSuccess(false)
  }

  if (isSuccess) {
      return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
              <Card className="text-center p-8 border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-primary/5">
                  <div className="flex justify-center mb-6">
                      <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="relative"
                      >
                          <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full"></div>
                          <CheckCircle2 className="h-20 w-20 text-green-500 relative z-10" />
                      </motion.div>
                  </div>
                  
                  <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                  >
                      <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                          Booking Confirmed!
                      </h2>
                      <p className="text-muted-foreground mb-8 text-lg">
                          We've sent a confirmation email with all the details.
                      </p>
                      
                      <Button 
                          onClick={resetBooking} 
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
                      >
                          Book Another Service
                          <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                  </motion.div>
              </Card>
          </motion.div>
      )
  }

  const steps = [
    { number: 1, label: 'Service', icon: '🎯' },
    { number: 2, label: 'Date & Time', icon: '📅' },
    { number: 3, label: 'Details', icon: '✨' }
  ]

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Enhanced Step Indicator */}
      <div className="mb-12 relative">
        <div className="flex justify-between items-center relative z-10">
          {steps.map((s, index) => {
            const isActive = step >= s.number
            const isCurrent = step === s.number
            const isCompleted = step > s.number
            
            return (
              <div key={s.number} className="flex flex-col items-center flex-1 relative">
                <motion.div 
                  className={`
                    relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold z-10 transition-all duration-300
                    ${isCurrent 
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/50 scale-110' 
                      : isCompleted
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted text-muted-foreground border-2 border-border'}
                  `}
                  animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : s.icon}
                </motion.div>
                
                <span className={`text-sm mt-3 font-semibold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
                
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[50%] w-full h-1 -z-0">
                    <div className="h-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-primary/80"
                        initial={{ width: '0%' }}
                        animate={{ width: step > s.number ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="shadow-2xl border-2 border-border/50 backdrop-blur-sm bg-card/95 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary"></div>
                
                <CardHeader className="space-y-3 pb-8">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        {step === 1 && "Choose Your Service"}
                        {step === 2 && "Pick Your Time"}
                        {step === 3 && "Almost There!"}
                    </CardTitle>
                    <CardDescription className="text-base">
                        {step === 1 && "Select from our premium services tailored to your needs"}
                        {step === 2 && "Find the perfect time slot that fits your schedule"}
                        {step === 3 && "Just a few details to confirm your booking"}
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-8">
                    {step === 1 && (
                        <ServiceSelection services={services} onSelect={handleServiceSelect} />
                    )}
                    {step === 2 && selectedService && (
                        <DateTimeSelection 
                            serviceDuration={selectedService.durationMin} 
                            onSelect={handleSlotSelect}
                            onBack={() => setStep(1)}
                        />
                    )}
                    {step === 3 && selectedService && selectedDate && selectedSlot && (
                        <CustomerForm 
                            service={selectedService}
                            slot={selectedSlot}
                            onSubmit={handleBookingSubmit}
                            onBack={() => setStep(2)}
                        />
                    )}
                </CardContent>
            </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
