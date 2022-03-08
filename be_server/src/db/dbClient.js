const PrismaClient = require('@prisma/client').PrismaClient;

const db = new PrismaClient();

module.exports = db;