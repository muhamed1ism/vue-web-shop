const express = require('express');
const app = express();
const prisma = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

const prismaClient = new prisma.PrismaClient();
