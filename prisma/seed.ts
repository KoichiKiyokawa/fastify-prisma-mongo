import { PrismaClient } from "@prisma/client"

export async function seed() {
  const prisma = new PrismaClient()
  prisma.user.createMany({
    data: [...Array(10).keys()].map((i) => ({ name: `user${i}` })),
  })
  await prisma.$disconnect()
}
