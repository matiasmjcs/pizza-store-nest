export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  deletedAt: Date;
  category: ICategory;
}

export interface ICartProduct {
  id: number;
  quantity: number;
  product: IProduct;
}
