import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';

const SALT_ROUNDS = 12;

export async function createAdmin(email: string, password: string) {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  await prisma.admin.create({
    data: {
      email,
      passwordHash,
    },
  });
}

export async function verifyAdminEmail(email: string): Promise<{
  id: string;
  email: string;
  passwordHash: string;
  refreshToken: string | null;
} | null> {
  const admin = await prisma.admin.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true, refreshToken: true },
  });
  return admin;
}

export async function updateAdminRefreshToken(id: string, token: string | null): Promise<void> {
  await prisma.admin.update({
    where: { id },
    data: { refreshToken: token },
  });
}

export async function seedAdmin(email: string, password: string): Promise<void> {
  const existing = await verifyAdminEmail(email);
  if (existing) {
    console.log('Admin account already exists:', email);
    return;
  }
  await createAdmin(email, password);
  console.log('Admin account seeded:', email);
}
