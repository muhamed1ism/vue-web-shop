import express from 'express';
import { registerUser, loginUser, getUserData, logoutUser } from '../controllers/authController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authenticateToken, getUserData);
router.delete('/logout', authenticateToken, logoutUser);

export default router;