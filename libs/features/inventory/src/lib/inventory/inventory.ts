import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { InventoryService, InventoryItem } from '@corp/data-access/api';
import { ButtonComponent } from '@corp/design-system/ui';

@Component({
  selector: 'lib-inventory',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class InventoryComponent {
  private readonly inventoryService = inject(InventoryService);
  
  // Convert the HTTP Observable into a reactive Signal
  readonly inventory = toSignal(this.inventoryService.getInventory(), { initialValue: [] as InventoryItem[] });

  editItem(item: InventoryItem) {
    console.log('Edit item:', item);
  }

  deleteItem(item: InventoryItem) {
    console.log('Delete item:', item);
  }
}
