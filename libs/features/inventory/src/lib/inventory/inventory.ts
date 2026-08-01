import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService, InventoryItem } from '@corp/data-access/api';
import { ButtonComponent, TableComponent, TableColumn } from '@corp/design-system/ui';

@Component({
  selector: 'lib-inventory',
  imports: [CommonModule, ButtonComponent, TableComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class InventoryComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  
  readonly inventoryItems = signal<InventoryItem[]>([]);
  
  readonly columns: TableColumn<InventoryItem>[] = [
    { key: 'sku', header: 'SKU' },
    { key: 'name', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', type: 'currency' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'status', header: 'Status', type: 'badge' },
    { key: 'id', header: 'Actions', type: 'actions' }
  ];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.inventoryService.getInventory().subscribe((data) => {
      this.inventoryItems.set(data);
    });
  }

  addNewItem() {
    // Basic mock of adding an item since we don't have a modal form yet
    const name = prompt('Enter Product Name:');
    const sku = prompt('Enter SKU:');
    const price = parseFloat(prompt('Enter Price:') || '0');
    const quantity = parseInt(prompt('Enter Quantity:') || '0', 10);
    
    if (name && sku) {
      this.inventoryService.createItem({
        name,
        sku,
        price,
        quantity,
        category: 'General'
      }).subscribe(() => {
        this.loadData();
      });
    }
  }

  editItem(item: InventoryItem) {
    const newQuantity = parseInt(prompt(`Update quantity for ${item.name}:`, item.quantity.toString()) || item.quantity.toString(), 10);
    if (newQuantity !== item.quantity && !isNaN(newQuantity)) {
      this.inventoryService.updateItem(item.id, { quantity: newQuantity }).subscribe(() => {
        this.loadData();
      });
    }
  }

  deleteItem(item: InventoryItem) {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      this.inventoryService.deleteItem(item.id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
