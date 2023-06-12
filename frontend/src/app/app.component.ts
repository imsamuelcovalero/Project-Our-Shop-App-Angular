// src/app/app.component.ts
import { Component, Inject } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LocalStorageHelper } from './helpers/localStorage.helper';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;
  currentPage = '';
  username = '';

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    // ouça as mudanças na rota
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setCurrentPage(event.urlAfterRedirects);
    });
  }

  ngOnInit() {
    const username = LocalStorageHelper.getUserInfo().username || '';
    console.log('username', username);
    this.username = username;

    this.setCurrentPage(this.router.url);

    const localTheme = localStorage.getItem('ourShopTheme');
    if (localTheme) {
      this.darkTheme = localTheme === 'dark';
    }

    this.setTheme();
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
    this.router.navigate(['/orders-history']);
  }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('ourShopTheme', this.darkTheme ? 'dark' : 'light');
    setTimeout(() => {
      this.setTheme();
      console.log('toggleTheme', this.darkTheme);
    }, 0);
  }

  setTheme() {
    const body = this.document.body;
    if (this.darkTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  logout() {
    localStorage.removeItem('userOurShop');
    // localStorage.removeItem('ourShopTheme');
    this.router.navigate(['/login']);
  }
}