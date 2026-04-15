import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed for Rapid-Book...')

  // Clear existing items to avoid duplicates
  try {
    await prisma.booking.deleteMany({})
    await prisma.service.deleteMany({})
  } catch (e) {
    console.log('ℹ️ No existing records to clear.')
  }

  // 1. Create Services
  const services = [
    {
      name: 'Strategy Consultation',
      durationMin: 45,
      price: 125.00
    },
    {
      name: 'Full Implementation',
      durationMin: 120,
      price: 450.00
    },
    {
      name: 'System Audit',
      durationMin: 90,
      price: 275.00
    },
    {
      name: 'Managed Support',
      durationMin: 60,
      price: 150.00
    }
  ]

  const createdServices = []
  for (const service of services) {
    const s = await prisma.service.create({
      data: service
    })
    createdServices.push(s)
  }
  console.log('✅ Created services')

  // 2. Create Mock Bookings
  const bookings = [
    {
      customerName: 'Alice Johnson',
      customerEmail: 'alice@example.com',
      serviceId: createdServices[0].id,
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      status: 'CONFIRMED'
    },
    {
      customerName: 'Bob Smith',
      customerEmail: 'bob@example.com',
      serviceId: createdServices[1].id,
      startTime: new Date(Date.now() + 172800000), // Day after tomorrow
      status: 'PENDING'
    },
    {
      customerName: 'Charlie Brown',
      customerEmail: 'charlie@example.com',
      serviceId: createdServices[2].id,
      startTime: new Date(Date.now() - 86400000), // Yesterday
      status: 'COMPLETED'
    },
    {
      customerName: 'Diana Prince',
      customerEmail: 'diana@example.com',
      serviceId: createdServices[0].id,
      startTime: new Date(Date.now() + 3600000), // In 1 hour
      status: 'CONFIRMED'
    }
  ]

  for (const booking of bookings) {
    await prisma.booking.create({
      data: booking
    })
  }

  console.log('✅ Created mock bookings')
  console.log('🎉 Database seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
