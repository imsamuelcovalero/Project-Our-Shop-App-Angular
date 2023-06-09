// src/app/helpers/formatOrderData.helper.ts
import { IOrderData } from '../../interfaces/order-data.interface';

export class FormatOrderDataHelper {
  static format(orderData: IOrderData) {
    console.log('produtos antes do processamento', orderData.products);
    const formattedProducts = orderData.products.map((product) => {
      const { _id: id, quantity } = product;
      return {
        productId: id,
        quantity,
      };
    });
    console.log('produtos após o processamento', formattedProducts);

    return {
      userId: orderData.user.id,
      totalPrice: orderData.totalPrice,
      withdrawalPointId: orderData.selectedLocation,
      saleDate: new Date().toISOString(),
      products: formattedProducts,
      cashbackValue: orderData.cashbackValue,
    };
  }
}