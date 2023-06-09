// src/app/helpers/localStorage.helper.ts
import { IUserInfo } from '../../interfaces/user-info.interface';
import { ICartItem } from '../../interfaces/cart-item.interface';

export class LocalStorageHelper {
  static getCart() {
    const cart = localStorage.getItem('ourShopCartItems');
    return cart ? JSON.parse(cart) : null;
  }

  static getCashbackValue() {
    const cashbackValue = localStorage.getItem('ourShopCashbackValue');
    return cashbackValue ? JSON.parse(cashbackValue) : 0;
  }

  static getTotalPrice() {
    const totalPrice = localStorage.getItem('ourShopTotalPrice');
    return totalPrice ? JSON.parse(totalPrice) : 0;
  }

  static getUserInfo() {
    const userInfo = localStorage.getItem('userOurShop');
    return userInfo ? JSON.parse(userInfo) : {};
  }

  static saveCart(cartItems: ICartItem[]) {
    const itemsWithQuantity = cartItems.filter((item) => item.quantity > 0);
    localStorage.setItem('ourShopCartItems', JSON.stringify(itemsWithQuantity));
  }

  static saveCashbackValue(cashbackValue: number) {
    localStorage.setItem('ourShopCashbackValue', JSON.stringify(cashbackValue));
  }

  static saveTotalPrice(totalPrice: number) {
    localStorage.setItem('ourShopTotalPrice', JSON.stringify(totalPrice));
  }

  static saveUserInfo(userInfo: IUserInfo) {
    localStorage.setItem('userOurShop', JSON.stringify(userInfo));
  }
}