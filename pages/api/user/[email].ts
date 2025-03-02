import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';

type Data = { message: string } | string;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getUserId(req, res);

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}

const getUserId = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email } = req.query;

  await db.connect();

  const user = await User.findOne({ email }).lean();

  await db.disconnect();

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  console.log(user, 'user api get user id');

  return res.status(200).json(user._id);
};
