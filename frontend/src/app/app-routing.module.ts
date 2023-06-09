import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeViewComponent } from './views/home-view/home-view.component';
// import { LoginViewComponent } from './views/login-view/login-view.component';
// import { RegisterViewComponent } from './views/register-view/register-view.component';
// import { CheckoutViewComponent } from './views/checkout-view/checkout-view.component';
// import { OrdersHistoryViewComponent } from './views/orders-history-view/orders-history-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginViewComponent },
  // { path: 'register', component: RegisterViewComponent },
  // { path: 'home', component: HomeViewComponent },
  // { path: 'checkout', component: CheckoutViewComponent },
  // { path: 'ordersHistory', component: OrdersHistoryViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }