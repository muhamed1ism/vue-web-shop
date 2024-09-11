import dotenv from 'dotenv';
import app from './app.js';
import prisma from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server radi na portu ${PORT}`);
    });
  } catch (error) {
    console.error('Povezivanje s bazom nije uspjelo');
    process.exit(1);
  }
};

startServer();