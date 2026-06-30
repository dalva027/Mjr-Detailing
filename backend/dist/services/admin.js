"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdmin = createAdmin;
exports.verifyAdminEmail = verifyAdminEmail;
exports.findAdminById = findAdminById;
exports.updateAdminRefreshToken = updateAdminRefreshToken;
exports.seedAdmin = seedAdmin;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../lib/prisma");
const SALT_ROUNDS = 12;
async function createAdmin(email, password) {
    const passwordHash = await bcrypt_1.default.hash(password, SALT_ROUNDS);
    await prisma_1.prisma.admin.create({
        data: {
            email,
            passwordHash,
        },
    });
}
async function verifyAdminEmail(email) {
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { email },
        select: { id: true, email: true, passwordHash: true, refreshToken: true },
    });
    return admin;
}
async function findAdminById(id) {
    const admin = await prisma_1.prisma.admin.findUnique({
        where: { id },
        select: { id: true, email: true, passwordHash: true, refreshToken: true },
    });
    return admin;
}
async function updateAdminRefreshToken(id, token) {
    await prisma_1.prisma.admin.update({
        where: { id },
        data: { refreshToken: token },
    });
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