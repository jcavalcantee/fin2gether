import { prisma } from "./prisma.js";

async function main() {
  try {
    console.log("Testando conexão com o Aurora PostgreSQL...");

    const result = await prisma.$queryRaw`
      SELECT
        current_database()::text AS database,
        current_user::text AS user,
        NOW() AS server_time;
    `;

    console.log("Conexão estabelecida com sucesso!");
    console.log(result);
  } catch (error) {
    console.error("Erro ao conectar com o banco:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
