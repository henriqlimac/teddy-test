import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CustomersComponent } from './features/customers/customers.component';
import { LoginComponent } from './features/login/login.component';
import { SelectedCustomersComponent } from './features/selected-customers/selected-customers.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'customers', component: CustomersComponent },
      { path: 'selected', component: SelectedCustomersComponent },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
