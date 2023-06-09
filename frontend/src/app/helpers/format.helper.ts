// src/app/helpers/format.helper.ts

export class FormatHelper {
  static formatDate(dateString: string): string {
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  static formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }
}