"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/prisma.ts
const prisma_1 = require("../src/generated/prisma");
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new prisma_1.PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
exports.default = prisma;
