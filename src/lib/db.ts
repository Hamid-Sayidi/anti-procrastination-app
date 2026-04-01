import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     datasources: {
//       db: {
//         url: "file:./prisma/dev.db",
//       },
//     },
//   });
// };
// if (!process.env.DATABASE_URL) {
//   process.env.DATABASE_URL = "file:./prisma/dev.db";
// }

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
