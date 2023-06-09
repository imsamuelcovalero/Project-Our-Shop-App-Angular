// src/app/helpers/applyCashback.helper.ts

import { IApplyCashbackInput } from '../../interfaces/apply-cashback-input.interface';

export class ApplyCashbackHelper {
  static apply(input: IApplyCashbackInput) {
    let cashbackValue = input.cashbackValueInput;
    let totalPrice = input.totalPriceInput;

    if (input.useCashback) {
      if (cashbackValue >= totalPrice) {
        cashbackValue -= totalPrice;
        totalPrice = 0;
      } else {
        totalPrice -= cashbackValue;
        totalPrice = Math.round(totalPrice * 100) / 100;
        cashbackValue = 0;
        if (totalPrice < 0) totalPrice = 0; // Verificação adicional
      }
    } else {
      cashbackValue = input.originalCashbackValue;
      totalPrice = input.originalTotalPrice;
    }

    return { totalPrice, cashbackValue };
  }
}