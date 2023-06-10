// File: checkout.component.ts
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
import { ILocation } from '../../interfaces/location.interface';
import { IProductItem } from '../../interfaces/product-item.interface';

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

  constructor(
    private router: Router,
    private apiService: ApiService,
    private errorService: ErrorService
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
    this.totalPrice = calculateNewTotal(this.totalPrice, productCost);
    this.originalTotalPrice = calculateNewTotal(this.originalTotalPrice, productCost);

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
    const { totalPrice, cashbackValue } = applyCashback(
      this.totalPrice,
      this.cashbackValue,
      this.useCashback,
      this.originalTotalPrice,
      this.originalCashbackValue,
    );

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
    const { totalPrice, newCashbackValue } = finalizeCashback(
      this.totalPrice,
      this.cashbackValue,
      this.useCashback,
    );

    this.totalPrice = totalPrice;

    const orderData = formatOrderData(
      user,
      this.totalPrice,
      this.selectedLocation,
      this.products,
      newCashbackValue,
    );

    this.apiService.post('/checkout', orderData).subscribe({
      next: () => {
        // this.toastr.success('Compra realizada com sucesso!');
        this.cashbackValue = newCashbackValue;
        this.originalCashbackValue = newCashbackValue;
        LocalStorageHelper.saveCashbackValue(this.originalCashbackValue);
        this.products = [];
        LocalStorageHelper.saveCart(this.products);
        this.totalPrice = 0;
        LocalStorageHelper.saveTotalPrice(this.totalPrice);
        this.useCashback = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err);
        // this.toastr.error(this.errorMessage);
      },
    });
  }

  loadUserInfo(): void {
    const user = LocalStorageHelper.getUserInfo();
    this.cashbackValue = user.cashbackValue;
    this.originalCashbackValue = user.cashbackValue;
  }

  loadProducts(): void {
    this.products = LocalStorageHelper.getCart();
    this.totalPrice = LocalStorageHelper.getTotalPrice();
    this.originalTotalPrice = this.totalPrice;
  }

  loadLocations(): void {
    this.apiService.get('/locations').subscribe({
      next: (locations: ILocation[]) => {
        this.locations = locations;
      },
      error: (err) => {
        this.errorMessage = this.errorService.handleError(err);
        // this.toastr.error(this.errorMessage);
      },
    });
  }
}