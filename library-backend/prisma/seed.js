const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const adminCount = await prisma.admin.count();
  if (adminCount > 0) {
    console.log('Admin user(s) already exist — skipping seed.');
    return;
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log('No admin found and ADMIN_EMAIL/ADMIN_PASSWORD not set.');
    console.log('Set ADMIN_EMAIL and ADMIN_PASSWORD in your .env (or run the create-admin endpoint).');
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.create({
    data: {
      name: process.env.ADMIN_NAME || 'Admin',
      email,
      password: hash,
    },
  });

  console.log('Created initial admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
