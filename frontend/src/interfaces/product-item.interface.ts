// src/interfaces/cart-item.interface.ts
export interface IProductItem {
  imageUrl: string;
  _id: string;
  name: string;
  price: number;
  quantity: number;
  __v: number;
}