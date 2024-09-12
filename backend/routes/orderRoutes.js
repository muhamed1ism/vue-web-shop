import express from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';

const router = express.Router();

//User
router.post('/', authenticateToken, createOrder);
router.get('/', authenticateToken, getUserOrders);

//Admin
router.get('/admin', authenticateToken, authorizeAdmin, getAllOrders);
router.put('/admin/:id/status', authenticateToken, authorizeAdmin, updateOrderStatus);

export default router;
