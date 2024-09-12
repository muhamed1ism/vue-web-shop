import prisma from '../config/db.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje artikla nije uspjelo' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) return res.status(404).json({ error: 'Artikal nije pronađen' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje artikla nije uspjelo' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;
  console.log(req.body);
  try {
    const newProduct = await prisma.product.create({
      data: { name, description, price, stock, imageUrl },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Kreiranje artikla nije uspjelo' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, stock, imageUrl },
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Ažuriranje artikla nije uspjelo' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Brisanje artikla nije uspjelo' });
  }
};