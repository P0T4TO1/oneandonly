export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: 'men' | 'women' | 'kid' | 'unisex';

  // TODO: agregar createdAt y updatedAt
  createdAt: string;
  updatedAt: string;
}

export type ISize =
  | 'XS'
  | 'S'
  | 'M'
  | 'L'
  | 'XL'
  | 'XXL'
  | 'unitalla'
  | 'curvy';
export type IType = 'ropa' | 'lencería' | 'accesorios';
