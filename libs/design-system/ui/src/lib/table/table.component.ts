import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn<T> {
  key: Extract<keyof T, string>;
  header: string;
  type?: 'text' | 'currency' | 'badge' | 'actions';
  badgePrefix?: string; // used for creating classes like status-in-stock
}

@Component({
  selector: 'ds-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input({ required: true }) data: T[] = [];
  @Input({ required: true }) columns: TableColumn<T>[] = [];
  @Input() actionsTemplate?: TemplateRef<any>;
}
