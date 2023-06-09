// src/interfaces/apply-cashback-input.interface.ts
export interface IApplyCashbackInput {
  totalPriceInput: number;
  cashbackValueInput: number;
  useCashback: boolean;
  originalTotalPrice: number;
  originalCashbackValue: number;
}