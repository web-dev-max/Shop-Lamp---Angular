export interface ICart {
  productId: string;
  quantity: number;
  price: number | null;
}

export interface ICartWithProductInfo extends ICart {
  name: string;
  info: string;
  productImage: string;
  amount: number | null;
}
