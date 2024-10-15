import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeAdmin from '../middleware/authorizeAdmin.js';
import upload from "../middleware/upload.js";

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, authorizeAdmin, upload.single('image'), createProduct);
router.put('/:id', authenticateToken, authorizeAdmin, upload.single('image'), updateProduct);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteProduct);

export default router;
