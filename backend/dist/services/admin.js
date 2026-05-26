"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = createAdmin;
exports.verifyAdminEmail = verifyAdminEmail;
exports.updateAdminRefreshToken = updateAdminRefreshToken;
exports.seedAdmin = seedAdmin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../lib/prisma");
const SALT_ROUNDS = 12;
async function createAdmin(email, password) {
    const passwordHash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    return prisma_1.prisma.$executeRaw `
    INSERT INTO "Admin" ("id", "email", "passwordHash", "createdAt", "updatedAt")
    VALUES (gen_random_uuid(), ${email}, ${passwordHash}, NOW(), NOW())
  `;
}
async function verifyAdminEmail(email) {
    const results = await prisma_1.prisma.$queryRawUnsafe('SELECT "id", "email", "passwordHash", "refreshToken" FROM "Admin" WHERE "email" = $1', email);
    const rows = results;
    return rows[0] || null;
}
async function updateAdminRefreshToken(id, token) {
    await prisma_1.prisma.$executeRawUnsafe('UPDATE "Admin" SET "refreshToken" = $1, "updatedAt" = NOW() WHERE "id" = $2', token, id);
}
async function seedAdmin(email, password) {
    const existing = await verifyAdminEmail(email);
    if (existing) {
        console.log('Admin account already exists:', email);
        return;
    }
    await createAdmin(email, password);
    console.log('Admin account seeded:', email);
}
//# sourceMappingURL=admin.js.map