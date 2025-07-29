import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ng-demo',
  imports: [MatTableModule, MatCardModule, DecimalPipe],
  templateUrl: './ng-demo.html',
  styleUrl: './ng-demo.css',
})
export class NgDemo {
  displayedColumns: string[] = [
    'name',
    'price',
    'consumption',
    'newAmount',
    'actions',
  ];

  dataSource: Drink[] = [
    { name: 'Wasser', price: 0.5, consumption: 120, newAmount: 0 },
    { name: 'Bier', price: 1.2, consumption: 75, newAmount: 0 },
    { name: 'Limonade', price: 0.8, consumption: 95, newAmount: 0 },
  ];

  increment(drink: Drink): void {
    drink.newAmount++;
  }

  decrement(drink: Drink): void {
    if (drink.newAmount > 0) {
      drink.newAmount--;
    }
  }

  onInputChange(drink: Drink, value: EventTarget): void {
    // if (value === null || value.trim() === '') {
    //   drink.newAmount = 0;
    //   return;
    // }
    // const parsed = parseInt(value, 10);
    // drink.newAmount = isNaN(parsed) ? 0 : parsed;
  }
}

interface Drink {
  name: string;
  price: number;
  consumption: number;
  newAmount: number;
}
