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
    <div className="space-y-40">
      <div className="grid md:grid-cols-2 gap-32">
        {/* Minimalist Calendar Section */}
        <div className="space-y-12">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#333333] border-b border-[#111111] pb-6">
            DATE_SELECTION_PROTOCOL
          </h3>
          
          <div className="bg-transparent group transition-all">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              className="rounded-none text-white mx-auto shadow-none bg-transparent scale-110 active:scale-100 transition-transform"
            />
          </div>
        </div>
        
        {/* Minimalist Time Slots Section */}
        <div className="space-y-12">
          <div className="flex justify-between items-end border-b border-[#111111] pb-6">
             <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#333333]">
               AVAILABILITY_NODE
             </h3>
             {date && (
               <span className="text-xl font-light text-white tracking-tighter">
                 {format(date, 'MMMM d, yyyy')}
               </span>
             )}
          </div>
          
          <div className="min-h-[400px] flex flex-col relative">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                 <Loader2 className="h-12 w-12 animate-spin text-white stroke-[0.5px]" />
              </div>
            ) : slots.length > 0 ? (
              <ScrollArea className="flex-1 pr-6">
                <div className="grid grid-cols-1 gap-2">
                  {slots.map((slot, index) => (
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.015 }}
                    >
                      <button
                        className={`w-full py-8 text-2xl font-light tracking-tighter transition-all duration-500 border-b border-[#111111] flex items-center justify-between hover:pl-6 ${
                          selectedSlot === slot 
                            ? 'text-white pl-6' 
                            : 'text-[#222222] hover:text-[#555555]'
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {format(new Date(slot), 'HH:mm')}
                        {selectedSlot === slot && <div className="h-1 w-12 bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"></div>}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center opacity-20 uppercase tracking-[0.4em] text-[10px] font-black">
                Registry search returned no nodes.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Precision Navigation */}
      <div className="flex justify-between pt-20">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#333333] hover:text-white transition-all hover:bg-transparent"
        >
          <ArrowLeft className="mr-6 h-6 w-6 stroke-[1px]" />
          ABORT SEQUENCE
        </Button>
        
        <Button 
          disabled={!selectedSlot || !date} 
          onClick={() => date && selectedSlot && onSelect(date, selectedSlot)}
          className="bg-white text-black hover:bg-[#CCCCCC] rounded-none px-20 py-10 text-[10px] font-black uppercase tracking-[0.4em] active:scale-95 transition-all shadow-none"
        >
          EXECUTE
          <ArrowRight className="ml-6 h-6 w-6 stroke-[1px]" />
        </Button>
      </div>
    </div>
  )
}
