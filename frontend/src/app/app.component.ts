// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocalStorageHelper } from './helpers/localStorage.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  currentPage = '';
  username = '';

  constructor(private router: Router) {
    // ouça as mudanças na rota
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setCurrentPage(event.urlAfterRedirects);
    });
  }

  ngOnInit() {
    this.username = LocalStorageHelper.getUserInfo().username || '';
    this.setCurrentPage(this.router.url);
  }

  setCurrentPage(path: string) {
    this.currentPage = path.startsWith('/') ? path.substring(1) : path;
  }

  get showHomeButton(): boolean {
    return this.currentPage !== 'login' && this.currentPage !== 'register';
  }

  get showOrdersButton(): boolean {
    return this.currentPage === 'home' || this.currentPage === 'ordersHistory';
  }

  get shouldShowHeader(): boolean {
    return this.router.url !== '/login' && this.router.url !== '/register';
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToOrders() {
    this.router.navigate(['/ordersHistory']);
  }

  toggleTheme() {
    // A lógica para alternar o tema vai aqui
  }

  logout() {
    localStorage.removeItem('userOurShop');
    this.router.navigate(['/login']);
  }
}