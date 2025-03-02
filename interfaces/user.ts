import dayjs from 'dayjs';

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  image?: string;
  gender?: string;
  telephone?: string;
  dateOfBirth?: dayjs.Dayjs | null | string;
  active: boolean;
  role: string;

  createdAt?: string;
  updatedAt?: string;
}
