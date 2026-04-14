'use client'

import { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAvailableSlots } from '@/actions/check-availability'
import { format } from 'date-fns'
import { Loader2, ArrowLeft, ArrowRight, Calendar as CalendarIcon, Clock } from 'lucide-react'
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
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <h3>Select Date</h3>
          </div>
          
          <div className="border-2 border-border rounded-xl p-6 bg-gradient-to-br from-card to-muted/20 shadow-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
              className="rounded-lg"
            />
          </div>
        </div>
        
        {/* Time Slots Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-primary" />
            <h3>Available Slots</h3>
            {date && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                {format(date, 'MMM d, yyyy')}
              </span>
            )}
          </div>
          
          <div className="border-2 border-border rounded-xl p-6 bg-gradient-to-br from-card to-muted/20 shadow-lg min-h-[380px] flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">Finding available slots...</p>
                </div>
              </div>
            ) : slots.length > 0 ? (
              <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="grid grid-cols-2 gap-3 pb-2">
                  {slots.map((slot, index) => (
                    <motion.div
                      key={slot}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Button
                        variant={selectedSlot === slot ? "default" : "outline"}
                        className={`w-full h-12 font-semibold transition-all ${
                          selectedSlot === slot 
                            ? 'bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/30' 
                            : 'hover:border-primary/50 hover:bg-primary/5'
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {format(new Date(slot), 'h:mm a')}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div className="space-y-2">
                  <div className="text-4xl">📅</div>
                  <p className="text-muted-foreground font-medium">
                    No slots available for this date
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please select another date
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={onBack}
          size="lg"
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          disabled={!selectedSlot || !date} 
          onClick={() => date && selectedSlot && onSelect(date, selectedSlot)}
          size="lg"
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg disabled:opacity-50"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
