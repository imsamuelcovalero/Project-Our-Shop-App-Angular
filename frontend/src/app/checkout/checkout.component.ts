// File: src/app/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ErrorService } from '../services/error.service';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { FormatHelper } from '../helpers/format.helper';
import { CalculateNewTotalHelper } from '../helpers/calculateNewTotal.helper';
import { ApplyCashbackHelper } from '../helpers/applyCashback.helper';
import { FinalizeCashbackHelper } from '../helpers/finalizeCashback.helper';
import { FormatOrderDataHelper } from '../helpers/formatOrderData.helper';
import { ILocation, IServerLocation } from '../../interfaces/location.interface';
import { IProductItem } from '../../interfaces/product-item.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  products: IProductItem[] = [];
  totalPrice = 0;
  originalTotalPrice = 0;
  cashbackValue = 0;
  originalCashbackValue = 0;
  useCashback = false;
  errorMessage = '';
  locations: ILocation[] = [];
  selectedLocation: null | string = null;
  displayedColumns: string[] = ['item', 'descricao', 'quantidade', 'preco', 'subtotal', 'remover'];

  constructor(
    private router: Router,
    private apiService: ApiService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadProducts();
    this.loadLocations();
  }

  formatPrice(price: number): string {
    return FormatHelper.formatPrice(price);
  }

  subTotal(product: IProductItem): number {
    return product.price * product.quantity;
  }

  removeFromCart(index: number): void {
    const productCost = this.products[index].price * this.products[index].quantity;

    this.totalPrice = CalculateNewTotalHelper.calculate({ total: this.totalPrice, cost: productCost });
    this.originalTotalPrice = CalculateNewTotalHelper.calculate({ total: this.originalTotalPrice, cost: productCost });

    if (this.products.length === 1 && this.useCashback) {
      this.cashbackValue = this.originalCashbackValue;
      LocalStorageHelper.saveCashbackValue(this.cashbackValue);
      this.useCashback = false;
    }

    this.products.splice(index, 1);
    LocalStorageHelper.saveCart(this.products);
    LocalStorageHelper.saveTotalPrice(this.totalPrice);
  }

  updateTotalPrice(): void {
    const { totalPrice, cashbackValue } = ApplyCashbackHelper.apply({
      totalPriceInput: this.totalPrice,
      cashbackValueInput: this.cashbackValue,
      useCashback: this.useCashback,
      originalTotalPrice: this.originalTotalPrice,
      originalCashbackValue: this.originalCashbackValue,
    });

    this.totalPrice = totalPrice;
    this.cashbackValue = cashbackValue;
    LocalStorageHelper.saveTotalPrice(this.totalPrice);
    LocalStorageHelper.saveCashbackValue(this.cashbackValue);
  }

  finalizeOrder(): void {
    if (!this.selectedLocation) {
      this.errorMessage = 'Por favor, selecione um local de retirada.';
      return;
    }

    const user = LocalStorageHelper.getUserInfo();

    const { totalPrice, newCashbackValue } = FinalizeCashbackHelper.finalize({
      totalPriceInput: this.totalPrice,
      cashbackValue: this.cashbackValue,
      useCashback: this.useCashback,
    });

    this.totalPrice = totalPrice;

    const orderData = FormatOrderDataHelper.format({
      user: user,
      totalPrice: this.totalPrice,
      selectedLocation: this.selectedLocation,
      products: this.products,
      cashbackValue: newCashbackValue,
    });

    this.apiService.post('/checkout', orderData).subscribe({
      next: () => {
        this.toastr.success('Compra realizada com sucesso!');
        this.cashbackValue = newCashbackValue;
        this.originalCashbackValue = newCashbackValue;
        LocalStorageHelper.saveCashbackValue(this.originalCashbackValue);
        this.products = [];
        LocalStorageHelper.saveCart(this.products);
        this.totalPrice = 0;
        LocalStorageHelper.saveTotalPrice(this.totalPrice);
        this.useCashback = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err);
        this.toastr.error(this.errorMessage);
      },
    });
  }

  private loadUserInfo(): void {
    const { token } = LocalStorageHelper.getUserInfo();
    this.apiService.get<{ cashbackValue: number }>('/login/me', { headers: { Authorization: token } }).subscribe({
      next: (result) => {
        this.cashbackValue = result.cashbackValue;
        this.originalCashbackValue = result.cashbackValue;
      },
      error: (error) => {
        this.errorMessage = this.errorService.handleError(error, 'Não foi possível autenticar o usuário.');
        this.toastr.error(this.errorMessage);
      }
    });
  }

  private loadProducts(): void {
    this.products = LocalStorageHelper.getCart();
    this.totalPrice = LocalStorageHelper.getTotalPrice();
    this.originalTotalPrice = this.totalPrice;
  }

  private loadLocations(): void {
    this.apiService.get<IServerLocation[]>('/checkout').subscribe({
      next: (serverLocations: IServerLocation[]) => {
        this.locations = serverLocations.map(({ _id: id, name, address }) => ({ id, name, address }));
      },
      error: (err: any) => {
        this.errorMessage = this.errorService.handleError(err);
        this.toastr.error(this.errorMessage);
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}