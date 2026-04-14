'use server'

import { prisma } from "@/lib/prisma"
import { Booking } from "@prisma/client"
import { startOfDay, endOfDay, addMinutes, isBefore, isAfter } from "date-fns"

export async function getAvailableSlots(dateString: string, serviceDuration: number) {
  const selectedDate = new Date(dateString)
  
  // Define working hours: 9 AM to 5 PM
  const startOfWork = new Date(selectedDate)
  startOfWork.setHours(9, 0, 0, 0)
  
  const endOfWork = new Date(selectedDate)
  endOfWork.setHours(17, 0, 0, 0)

  // Fetch all bookings for the specified date
  // We include PENDING bookings to prevent race conditions/double booking during checkout
  const bookings = await prisma.booking.findMany({
    where: {
      startTime: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate)
      }
    }
  })

  const slots: string[] = []
  let currentSlot = startOfWork
  const interval = 30 // Slots occur every 30 minutes

  while (isBefore(currentSlot, endOfWork)) {
    const slotEnd = addMinutes(currentSlot, serviceDuration)

    // Stop if the service exceeds working hours
    if (isAfter(slotEnd, endOfWork)) {
      break
    }

    // Check for overlap with existing bookings
    const isOverlap = bookings.some((booking: Booking) => {
      const bStart = new Date(booking.startTime)
      const bEnd = new Date(booking.endTime)
      
      // Overlap condition: (SlotStart < BookingEnd) && (SlotEnd > BookingStart)
      return (currentSlot < bEnd) && (slotEnd > bStart)
    })

    if (!isOverlap) {
      slots.push(currentSlot.toISOString())
    }

    // Move to next slot
    currentSlot = addMinutes(currentSlot, interval)
  }

  return slots
}
