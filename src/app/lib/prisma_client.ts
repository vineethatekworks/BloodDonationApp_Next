import { PrismaClient } from '@prisma/client'
declare global {
  // Prevent multiple instances of Prisma Client in development
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma;
