'use client'

import { useState } from 'react'
import { Service } from '@prisma/client'
import { ServiceSelection } from './ServiceSelection'
import { DateTimeSelection } from './DateTimeSelection'
import { CustomerForm } from './CustomerForm'
import { toast } from 'sonner'
import { createBooking } from "@/actions/create-booking"
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Minus } from 'lucide-react'
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
            toast.success("CONFIRMED")
            setIsSuccess(true)
        }
    } catch (error) {
        toast.error("ERROR")
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
            className="p-12 md:p-24 text-center space-y-16"
          >
              <div className="flex justify-center">
                  <CheckCircle2 className="h-20 w-20 text-white stroke-[1px]" />
              </div>
              
              <div className="space-y-4">
                  <h2 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">
                      CONFIRMED.
                  </h2>
                  <p className="text-[#333333] text-xs tracking-[0.4em] uppercase font-bold">
                    The coordination sequence has been finalized.
                  </p>
              </div>
              
              <div className="pt-12">
                  <Button 
                      onClick={resetBooking} 
                      className="bg-white text-black hover:bg-[#CCCCCC] rounded-none px-16 py-8 text-xs font-bold uppercase tracking-[0.3em] active:scale-95 transition-all"
                  >
                      BACK TO REGISTRY
                  </Button>
              </div>
          </motion.div>
      )
  }

  return (
    <div className="w-full">
      {/* Precision Step Indicator */}
      <div className="mb-32 px-4 border-b border-[#111111] pb-10">
        <div className="flex justify-between items-center max-w-sm">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-6">
               <div className={`
                 text-xs font-bold tracking-[0.3em] transition-all duration-700
                 ${step === s ? 'text-white translate-y-[-2px]' : 'text-[#222222]'}
               `}>
                 0{s}
               </div>
               {s < 3 && <Minus className="w-12 h-[1px] bg-[#111111]" />}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="space-y-16 p-8 md:p-0">
                <div className="space-y-4 relative">
                    <h3 className="text-5xl font-black tracking-tighter uppercase text-white leading-none">
                        {step === 1 && "Registry Selection"}
                        {step === 2 && "Temporal Node"}
                        {step === 3 && "Credential Entry"}
                    </h3>
                    <div className="h-[2px] w-20 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                </div>
                
                <div className="min-h-[450px]">
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
