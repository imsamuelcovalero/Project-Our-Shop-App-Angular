// src/interfaces/order-data.interface.ts
export interface IOrderData {
  user: { id: string };
  totalPrice: number;
  selectedLocation: string;
  products: Array<{ _id: string, quantity: number }>;
  cashbackValue: number;
}