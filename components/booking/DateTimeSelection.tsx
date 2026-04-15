'use client'

import { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAvailableSlots } from '@/actions/check-availability'
import { format } from 'date-fns'
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface DateTimeSelectionProps {
  serviceDuration: number
  onSelect: (date: Date, slot: string) => void
  onBack: () => void
}

export function DateTimeSelection({ serviceDuration, onSelect, onBack }: DateTimeSelectionProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSlots() {
      if (date) {
        setLoading(true)
        setSlots([])
        setSelectedSlot(null)
        try {
          const fetchedSlots = await getAvailableSlots(date.toISOString(), serviceDuration)
          setSlots(fetchedSlots)
        } catch (error) {
          console.error("Failed to fetch slots", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchSlots()
  }, [date, serviceDuration])

  return (
    <div className="space-y-16">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Minimalist Calendar Section */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#444444]">
            [02.1] Select Configuration Date
          </h3>
          
          <div className="border border-[#1A1A1A] p-4 bg-transparent">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              className="rounded-none text-white mx-auto shadow-none bg-transparent"
            />
          </div>
        </div>
        
        {/* Minimalist Time Slots Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
             <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#444444]">
               [02.2] Available Entry Nodes
             </h3>
             {date && (
               <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">
                 {format(date, 'MMM d, yyyy')}
               </span>
             )}
          </div>
          
          <div className="border border-[#1A1A1A] p-8 min-h-[350px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                 <Loader2 className="h-8 w-8 animate-spin text-white stroke-[1px]" />
              </div>
            ) : slots.length > 0 ? (
              <ScrollArea className="flex-1">
                <div className="grid grid-cols-1 gap-2">
                  {slots.map((slot, index) => (
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <button
                        className={`w-full py-4 text-xs font-bold tracking-widest uppercase transition-all border border-transparent hover:border-[#333333] ${
                          selectedSlot === slot 
                            ? 'bg-white text-black' 
                            : 'text-[#666666] hover:text-white'
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {format(new Date(slot), 'HH:mm')}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center opacity-30 uppercase tracking-[0.2em] text-xs font-bold">
                No availability detected.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Precision Navigation */}
      <div className="flex justify-between pt-12 border-t border-[#111111]">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444] hover:text-white"
        >
          <ArrowLeft className="mr-3 h-4 w-4" />
          Abort sequence
        </Button>
        
        <Button 
          disabled={!selectedSlot || !date} 
          onClick={() => date && selectedSlot && onSelect(date, selectedSlot)}
          className="bg-white text-black hover:bg-[#CCCCCC] rounded-none px-12 py-6 text-xs font-bold uppercase tracking-widest active:scale-95 transition-all"
        >
          Confirm temporal node
          <ArrowRight className="ml-3 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
