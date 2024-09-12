import prisma from '../config/db.js';

export const createOrder = async (req, res) => {
  const { items, total } = req.body;
  const userId = req.user.id;
  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Kreiranje narudžbe nije uspjelo' });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje narudžbe nije uspjelo' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje narudžbi nije uspjelo' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Ažuriranje narudžbe nije uspjelo' });
  }
};
