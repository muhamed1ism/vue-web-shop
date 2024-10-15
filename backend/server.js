import dotenv from 'dotenv';
import app from './app.js';
import prisma from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();