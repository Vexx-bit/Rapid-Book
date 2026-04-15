'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Service } from '@prisma/client'
import { ServiceSelection } from './ServiceSelection'
import { DateTimeSelection } from './DateTimeSelection'
import { CustomerForm } from './CustomerForm'
import { toast } from 'sonner'
import { createBooking } from "@/actions/create-booking"
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, Minus } from 'lucide-react'
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
            toast.success("BOOKING_INITIALIZED")
            setIsSuccess(true)
        }
    } catch (error) {
        toast.error("SYSTEM_FAILURE_RETRY")
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center"
          >
              <div className="flex justify-center mb-10">
                  <CheckCircle2 className="h-16 w-16 text-white stroke-[1px]" />
              </div>
              
              <div className="space-y-6">
                  <h2 className="text-4xl font-light tracking-tighter text-white uppercase">
                      Confirmed.
                  </h2>
                  <p className="text-[#666666] text-sm tracking-widest uppercase font-bold">
                    Transmission Sent // Node ID: {Math.random().toString(36).substring(7)}
                  </p>
                  
                  <div className="pt-12">
                      <Button 
                          onClick={resetBooking} 
                          className="bg-white text-black hover:bg-[#CCCCCC] rounded-none px-12 py-6 text-xs font-bold uppercase tracking-widest"
                      >
                          New Initialization
                      </Button>
                  </div>
              </div>
          </motion.div>
      )
  }

  return (
    <div className="w-full">
      {/* Precision Step Indicator */}
      <div className="mb-20 px-4">
        <div className="flex justify-between items-center max-w-sm mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-4">
               <div className={`
                 text-[10px] font-bold tracking-widest transition-all duration-500
                 ${step === s ? 'text-white scale-125' : 'text-[#333333]'}
               `}>
                 0{s}
               </div>
               {s < 3 && <Minus className="w-8 h-[1px] bg-[#1A1A1A]" />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="space-y-12">
                <div className="space-y-2 border-l-2 border-white pl-8">
                    <h3 className="text-3xl font-light tracking-tighter uppercase text-white">
                        {step === 1 && "Configuration Selection"}
                        {step === 2 && "Temporal Window"}
                        {step === 3 && "Registry Entry"}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555555]">
                       Phase {step} // Initializing {step === 1 ? 'Services' : step === 2 ? 'Schedule' : 'Authentication'}
                    </p>
                </div>
                
                <div className="min-h-[400px]">
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
                </div>
            </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
