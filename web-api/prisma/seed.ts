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
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('user2@example2.com', ${await bcrypt.hash(
    '654321',
    10,
  )})`;
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('user3@example3.com', ${await bcrypt.hash(
    '123456',
    10,
  )})`;
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('user4@gmail.com', ${await bcrypt.hash(
    '09854321',
    10,
  )})`;
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('user5@example2.com', ${await bcrypt.hash(
    '09876543',
    10,
  )})`;
  await prisma.$executeRaw`insert into business.user (email, password) VALUES ('user6@example3.com', ${await bcrypt.hash(
    '34567890',
    10,
  )})`;

  await prisma.$executeRaw`truncate table business.player cascade`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('simple player', 1)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('batman', 2)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('megaladon', 3)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('boss', 4)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('petya', 5)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('manboy', 6)`;
  await prisma.$executeRaw`insert into business.player (user_name, user_id) VALUES ('vladimir', 7)`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
