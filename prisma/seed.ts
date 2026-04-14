import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const services = [
    {
      name: 'Consultation',
      durationMin: 30,
      price: 50.00
    },
    {
      name: 'Standard Service',
      durationMin: 60,
      price: 100.00
    },
    {
      name: 'Premium Package',
      durationMin: 90,
      price: 150.00
    }
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }

  console.log('Seed data created.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
