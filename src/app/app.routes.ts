import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard-page/dashboard-page').then((m) => m.DashboardPage),
  },
];
