// src/interfaces/cart-item.interface.ts
export interface ICartItem {
  imageUrl: string;
  _id: string;
  name: string;
  price: number;
  quantity: number;
  __v: number;
}