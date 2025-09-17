import * as bcrypt from 'bcrypt';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`alter sequence business.user_id_seq restart with 1;`;
  await prisma.$executeRaw`alter sequence business.player_id_seq restart with 1;`;

  await prisma.$executeRaw`truncate table business.user cascade`;
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('user@example.com', ${await bcrypt.hash(
    '1234567890',
    10,
  )})`;
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('batman@gmail.com', ${await bcrypt.hash(
    '0987654321',
    10,
  )})`;

  await prisma.$executeRaw`truncate table business.player cascade`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('simple player', 1)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('batman', 2)`;
}

void main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
