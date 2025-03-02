import type { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { User } from "../../../models";
import { db } from "../../../database";
import { getSession } from "next-auth/react";

type Data = { message: string } | any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getProfile(req, res);

    case "PUT":
      return putProfile(req, res);

    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

const getProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id } = req.query as { _id: string };

  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "Debe de estar autenticado para hacer esto" });
  }

  if (!_id || !isValidObjectId(_id))
    return res.status(400).json({ message: "ID no válido" });

  await db.connect();
  const profile = await User.findById(_id).lean();
  await db.disconnect();

  if (!profile)
    return res.status(400).json({ message: "No existe usuario por ese id" });

  return res.status(200).json(profile);
};

const putProfile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { _id, name, surname, email, gender, dateOfBirth, telephone } =
    req.body;

  const session: any = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ message: "Debe de estar autenticado para hacer esto" });
  }

  if (!_id) return res.status(400).json({ message: "Falta Id del usuario" });

  if (!isValidObjectId(_id))
    return res.status(400).json({ message: "ID no válido" });

  await db.connect();
  const profile = await User.findById(_id).lean();

  if (!profile)
    return res.status(400).json({ message: "No existe usuario por ese id" });

  if (name || surname || email || gender || dateOfBirth || telephone) {
    await User.updateOne(
      { _id },
      {
        name,
        surname,
        email,
        gender,
        dateOfBirth,
        telephone,
      }
    );
    await db.disconnect();

    return res.status(200).json({ message: "Usuario actualizado" });
  }
  await db.disconnect();
  return res.status(200).json({ message: "No se actualizó ningún dato" });
};
