'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const bookingSchema = z.object({
  serviceId: z.string(),
  slot: z.string(), // ISO String
  name: z.string(),
  email: z.string().email()
})

export async function createBooking(data: z.infer<typeof bookingSchema>) {
  const { serviceId, slot, name, email } = bookingSchema.parse(data)

  const service = await prisma.service.findUnique({
    where: { id: serviceId }
  })

  if (!service) {
    throw new Error("Service not found")
  }

  const startTime = new Date(slot)
  const endTime = new Date(startTime.getTime() + service.durationMin * 60000)

  // Double check availability (Race condition prevention)
  const overlapping = await prisma.booking.count({
    where: {
      startTime: { lt: endTime },
      endTime: { gt: startTime }
    }
  })

  if (overlapping > 0) {
    throw new Error("Slot is no longer available")
  }

  const booking = await prisma.booking.create({
    data: {
      customerName: name,
      customerEmail: email,
      startTime,
      endTime,
      serviceId,
      status: 'CONFIRMED'
    }
  })

  await prisma.invoice.create({
    data: {
      bookingId: booking.id,
      amount: service.price,
    }
  })

  revalidatePath('/')
  return { success: true, bookingId: booking.id }
}
