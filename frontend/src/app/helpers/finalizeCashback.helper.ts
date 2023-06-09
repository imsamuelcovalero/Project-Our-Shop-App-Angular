// src/app/helpers/finalizeCashback.helper.ts
import { ICashbackInput } from '../../interfaces/cashback-input.interface';

export class FinalizeCashbackHelper {
  static finalize(input: ICashbackInput) {
    let newCashbackValue = input.cashbackValue;
    let totalPrice = input.totalPriceInput;

    if (input.useCashback) {
      if (input.cashbackValue >= totalPrice) {
        newCashbackValue = input.cashbackValue - totalPrice;
        totalPrice = 0;
      } else {
        totalPrice -= input.cashbackValue;
        newCashbackValue = 0;
      }
    }
    newCashbackValue += totalPrice * 0.01;
    newCashbackValue = Math.round(newCashbackValue * 100) / 100;

    return { totalPrice, newCashbackValue };
  }
}