import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Product, Order, User } from '../../../models';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../utils/authOptions';

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);

    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { orderItems, total } = req.body as IOrder;

  // Vericar que tengamos un usuario
  const session = await getServerSession(req, res, authOptions) as { user: { email: string } };

  if (!session) {
    return res
      .status(401)
      .json({ message: 'Debe de estar autenticado para hacer esto' });
  }

  // Crear un arreglo con los productos que la persona quiere
  const productsIds = orderItems.map((product) => product._id);
  await db.connect();

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    await db.disconnect();
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find(
        (prod) => prod.id === current._id
      )?.price;
      if (!currentPrice) {
        throw new Error('Verifique el carrito de nuevo, producto no existe');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (total !== backendTotal) {
      throw new Error('El total no cuadra con el monto');
    }

    // Todo bien hasta este punto
    const userId = user._id;
    const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({
      message: errorMessage || 'Revise logs del servidor',
    });
  }
};
