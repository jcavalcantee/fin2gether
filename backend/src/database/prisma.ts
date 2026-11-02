import "dotenv/config";

import { Signer } from "@aws-sdk/rds-signer";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";

const requiredEnv = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "AWS_REGION",
] as const;

for (const variable of requiredEnv) {
  if (!process.env[variable]) {
    throw new Error(`Environment variable ${variable} is required`);
  }
}

const host = process.env.DB_HOST!;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_NAME!;
const user = process.env.DB_USER!;
const region = process.env.AWS_REGION!;

if (!Number.isInteger(port) || port <= 0) {
  throw new Error("DB_PORT must be a valid port number");
}

// Responsável por gerar os tokens de autenticação IAM.
const signer = new Signer({
  hostname: host,
  port,
  username: user,
  region,
});

// Configuração do driver PostgreSQL.
const adapter = new PrismaPg({
  host,
  port,
  database,
  user,
  password: () => signer.getAuthToken(),

  ssl: {
    rejectUnauthorized: true,
  },

  max: 2,
  idleTimeoutMillis: 10_000,
  connectionTimeoutMillis: 5_000,
});

// Instância única do Prisma Client.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
