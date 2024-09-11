import express from 'express';
import { registerUser, loginUser, getUserData } from '../controllers/authController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authenticateToken, getUserData);

export default router;