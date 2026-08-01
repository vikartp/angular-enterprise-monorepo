import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly http = inject(HttpClient);

  getInventory(): Observable<InventoryItem[]> {
    // In a real app this would be an API endpoint like '/api/inventory'
    // Here we are fetching the static mock JSON from the public directory
    return this.http.get<InventoryItem[]>('/inventory.json');
  }
}
