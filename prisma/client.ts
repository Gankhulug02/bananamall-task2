import { PrismaClient } from "@prisma/client";

// Function to create a Prisma client singleton
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Declare global variable prisma with the type of the return value of prismaClientSingleton
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Initialize prisma using the singleton pattern or the existing global instance
const prisma = globalThis.prisma ?? prismaClientSingleton();

// Export the Prisma client instance
export default prisma;

// If not in production, set the global prisma variable to the Prisma client instance
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
