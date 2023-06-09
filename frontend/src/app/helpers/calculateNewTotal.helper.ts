// src/app/helpers/calculateNewTotal.helper.ts
import { ITotalCost } from '../../interfaces/total-cost.interface';

export class CalculateNewTotalHelper {
  static calculate(input: ITotalCost) {
    const newTotal = input.total - input.cost;
    return Math.round((newTotal < 0 ? 0 : newTotal) * 100) / 100;
  }
}