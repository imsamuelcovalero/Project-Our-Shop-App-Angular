// File: src/app/orders-history/orders-history.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { LocalStorageHelper } from '../helpers/localStorage.helper';
import { FormatHelper } from '../helpers/format.helper';
import { IOrder } from '../../interfaces/order.interface';
import { ToastrService } from 'ngx-toastr';

export interface IOrderResponse {
  orders: IOrder[];
  // Adicione outras propriedades aqui se necessário
}

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  orders: IOrder[] = [];
  cashbackValue = 0;
  errorMessage = '';
  displayedColumns: string[] = ['order', 'date', 'orderValue', 'cashbackValue'];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.retrieveOrders();
  }

  formatPrice(price: number): string {
    return FormatHelper.formatPrice(price);
  }

  formatDate(date: string): string {
    return FormatHelper.formatDate(date);
  }

  private loadUserInfo(): void {
    console.log('aqui');

    this.authService.authenticateUser().subscribe({
      next: () => {
        this.cashbackValue = LocalStorageHelper.getCashbackValue();
        this.retrieveOrders();
      },
      error: (error: Error) => {
        this.errorMessage = this.errorService.handleError(error, 'Não foi possível autenticar o usuário.');
        this.toastr.error(this.errorMessage);
      }
    });
  }

  private retrieveOrders(): void {
    const { token } = LocalStorageHelper.getUserInfo();
    this.apiService.get<IOrder[]>('/orders', { headers: { Authorization: token } }).subscribe({
      next: (result) => {
        console.log('result', result);

        this.orders = result;
        console.log('this.orders', this.orders);
      },
      error: (error) => {
        this.errorMessage = this.errorService.handleError(error, 'Não foi possível recuperar o histórico de pedidos.');
        this.toastr.error(this.errorMessage);
      }
    });
  }
}