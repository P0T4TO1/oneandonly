import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces';
import { Order } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data = { message: string } | IOrder;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getOrdersByID(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getOrdersByID = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { id } = req.query;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: 'Bad request' });
  }

  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  return res.status(200).json(order);
};
