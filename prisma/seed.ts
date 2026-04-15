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
  const servicesData = [
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
  for (const s of servicesData) {
    const service = await prisma.service.create({
      data: {
        name: s.name,
        durationMin: s.durationMin,
        price: s.price
      }
    })
    createdServices.push(service)
  }
  console.log('✅ Created services')

  // 2. Create Mock Bookings
  const now = new Date()
  
  const bookingsData = [
    {
      customerName: 'Alice Johnson',
      customerEmail: 'alice@example.com',
      service: createdServices[0],
      startTime: new Date(now.getTime() + 86400000), // Tomorrow
      status: 'CONFIRMED' as const
    },
    {
      customerName: 'Bob Smith',
      customerEmail: 'bob@example.com',
      service: createdServices[1],
      startTime: new Date(now.getTime() + 172800000), // Day after tomorrow
      status: 'PENDING' as const
    },
    {
      customerName: 'Charlie Brown',
      customerEmail: 'charlie@example.com',
      service: createdServices[2],
      startTime: new Date(now.getTime() - 86400000), // Yesterday
      status: 'COMPLETED' as const
    }
  ]

  for (const b of bookingsData) {
    const endTime = new Date(b.startTime.getTime() + b.service.durationMin * 60000)
    
    await prisma.booking.create({
      data: {
        customerName: b.customerName,
        customerEmail: b.customerEmail,
        serviceId: b.service.id,
        startTime: b.startTime,
        endTime: endTime,
        status: b.status
      }
    })
  }

  console.log('✅ Created mock bookings with correct end times')
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
