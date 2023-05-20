import { Product } from "~/models/Product";

export type CartItem = {
  product: Product;
  count: number;
};

export type CartItem1 = {
  productId: string;
  count: number;
};

export type Cart = {
  cart: {
    id: string;
    items: CartItem1[];
  },
};
