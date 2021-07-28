import { PrismaClient } from "@prisma/client"

export async function seed() {
  const prisma = new PrismaClient()
  prisma.user.createMany({
    data: Array.from(Array(10).keys()).map((i) => ({
      name: `user${i}`,
      email: `user${i}@example.com`,
    })),
  })
  await prisma.$disconnect()
}
