import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@corp-workspace/inventory').then(m => m.InventoryComponent)
  }
];
