import prisma from '../config/db.js';
import {uploadImageToImgbb} from "../utils/imgbb.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Fetching products failed' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Fetching product failed' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.file;

  if (name.trim() === '' || !price) {
    return res.status(409).json({ error: 'All fields are required' });
  }
  try {
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToImgbb(image.buffer);
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        imageUrl: imageUrl || '' },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Creating product failed' });
    throw error;
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  const image = req.file;

  if (name.trim() === '') {
    return res.status(409).json({ error: 'All fields are required' });
  }
  
  try {
    let imageUrl;
    if (image) {
      imageUrl = await uploadImageToImgbb(image.buffer);
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        ...(imageUrl && { imageUrl })
      },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Updating product failed' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Deleting product failed' });
  }
};