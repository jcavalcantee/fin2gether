import "dotenv/config";
import { Signer } from "@aws-sdk/rds-signer";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const requiredEnv = [
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER",
    "AWS_REGION",
];
for (const variable of requiredEnv) {
    if (!process.env[variable]) {
        throw new Error(`Environment variable ${variable} is required`);
    }
}
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const region = process.env.AWS_REGION;
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
    // Gera um token novo sempre que uma nova conexão precisar autenticar.
    password: () => signer.getAuthToken(),
    // Validação TLS do certificado do Aurora.
    ssl: {
        ca: readFileSync(resolve(process.cwd(), "certs/global-bundle.pem"), "utf8"),
        rejectUnauthorized: true,
    },
    // Limite inicial conservador para o ambiente Lambda.
    max: 2,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
});
// Instância única do Prisma Client.
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
//# sourceMappingURL=prisma.js.map