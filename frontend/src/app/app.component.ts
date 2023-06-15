// src/app/app.component.ts
import { Component, Inject, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
// import { LocalStorageHelper } from './helpers/localStorage.helper';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy { // Implemente OnDestroy para cancelar a inscrição quando o componente for destruído
  darkTheme = false;
  currentPage = '';
  username = '';
  private subscription: Subscription; // Adicione esta linha

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private authService: AuthService) { // Injete AuthService
    this.subscription = this.authService.currentUser.subscribe(username => { // Se inscreva no currentUser do AuthService
      this.username = username;
    });

    // ouça as mudanças na rota
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.setCurrentPage(event.urlAfterRedirects);
    });
  }

  ngOnDestroy() { // Adicione este método para cancelar a inscrição quando o componente for destruído
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    // const username = LocalStorageHelper.getUserInfo().username || '';
    // console.log('username', username);
    // this.username = username;

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
    return true;
  }

  get showOrdersButton(): boolean {
    return this.currentPage !== 'checkout';
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
    this.authService.logout(); // Utilize o método logout do AuthService
    this.router.navigate(['/login']);
  }
}