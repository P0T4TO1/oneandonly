import bcrypt from "bcryptjs";

import { User } from "../models";
import { db } from "./";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    role,
    name,
  };
};

// Esta función crea o verifica el usuario de OAuth
export const oAUthToDbUser = async (
  oAuthEmail: string,
  oAuthName: string,
  oAuthImage: string
) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const {
      _id,
      name,
      surname,
      email,
      image,
      gender,
      telephone,
      dateOfBirth,
      active,
      role,
    } = user;
    return {
      _id,
      name,
      surname,
      email,
      image,
      gender,
      telephone,
      dateOfBirth,
      active,
      role,
    };
  }

  const ceo: string =
    oAuthEmail === "jaretgarciagomez@gmail.com"
      ? "SEO"
      : oAuthEmail === "menagohe@gmail.com" ||
        oAuthEmail === "gilgarciavargas@gmail.com"
      ? "admin"
      : "client";

  const [stringName, stringSurname]: string[] = oAuthName.split(" ");

  const password = Math.random().toString(36).slice(-8);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt) as string;

  const newUser = new User({
    email: oAuthEmail,
    name: stringName as string,
    surname: stringSurname as string,
    password: hash as string,
    image: oAuthImage,
    active: true,
    role: ceo as string,
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, email, role } = newUser;
  return { _id, name, email, role };
};
