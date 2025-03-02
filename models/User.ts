import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false, default: 'default.png' },
    gender: {
      type: String,
      enum: {
        values: ['masculino', 'femenino', 'undefined'],
        message: '{VALUE} no es un género válido',
        default: 'undefined',
        required: false,
      },
    },
    telephone: {
      type: String,
      required: false,
      length: 10,
      unique: true,
      default: '',
    },
    dateOfBirth: { type: String, required: false, default: '' },
    active: { type: Boolean, required: true, default: true },
    role: {
      type: String,
      enum: {
        values: ['admin', 'client', 'super-user', 'SEO'],
        message: '{VALUE} no es un role válido',
        default: 'client',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
