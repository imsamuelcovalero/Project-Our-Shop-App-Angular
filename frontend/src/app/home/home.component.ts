// File: home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { FormatHelper } from '../helpers/format.helper';
import { ErrorService } from '../services/error.service';
// import { ToastrService } from 'ngx-toastr';
import { IProductItem } from '../../interfaces/product-item.interface';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProductItem[] = [];
  errorMessage = '';
  totalPrice = 0;

  faShoppingCart = faShoppingCart;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private errorService: ErrorService,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadProducts();
  }

  formatPrice(price: number): string {
    return FormatHelper.formatPrice(price);
  }

  decrementQuantity(product: IProductItem): void {
    if (product.quantity > 0) {
      const updatedProduct = { ...product };
      updatedProduct.quantity -= 1;
      this.updateCart(updatedProduct);
    }
  }

  inputQuantity(product: IProductItem): void {
    const updatedProduct = { ...product };
    if (updatedProduct.quantity < 0) {
      updatedProduct.quantity = 0;
    }
    this.updateCart(updatedProduct);
  }

  incrementQuantity(product: IProductItem): void {
    const updatedProduct = { ...product };
    updatedProduct.quantity += 1;
    this.updateCart(updatedProduct);
  }

  updateCart(updatedProduct: IProductItem): void {
    const productIndex = this.products.findIndex(
      (product) => product._id === updatedProduct._id
    );
    if (updatedProduct.quantity > 0) {
      this.products[productIndex] = updatedProduct;
    } else {
      this.products.splice(productIndex, 1);
    }

    LocalStorageHelper.saveCart(this.products);
    this.totalPrice = this.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    this.totalPrice = Math.round(this.totalPrice * 100) / 100;
    LocalStorageHelper.saveTotalPrice(this.totalPrice);
  }

  private loadUserInfo(): void {
    const { token } = LocalStorageHelper.getUserInfo();
    this.apiService.get<{ cashbackValue: number }>('/login/me', { headers: { Authorization: token } }).subscribe({
      next: (result) => {
        LocalStorageHelper.saveCashbackValue(result.cashbackValue);
      },
      error: (error) => {
        this.errorMessage = this.errorService.handleError(error, 'Não foi possível autenticar o usuário.');
      }
    });
  }

  private loadProducts(): void {
    this.apiService.get<IProductItem[]>('/products').subscribe({
      next: (productsResponse) => {
        this.products = productsResponse.map((product) => ({
          ...product,
          quantity: 0,
        }));

        const cartItems: IProductItem[] | null = LocalStorageHelper.getCart();
        if (cartItems) {
          this.products = this.products.map((product: IProductItem) => {
            const cartItem = cartItems.find((item: IProductItem) => item._id === product._id);
            return cartItem ? { ...product, quantity: cartItem.quantity } : product;
          });
        }

        this.totalPrice = LocalStorageHelper.getTotalPrice();
      },
      error: (error) => {
        this.errorMessage = this.errorService.handleError(error, 'Não foi possível carregar os produtos.');
      }
    });
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}