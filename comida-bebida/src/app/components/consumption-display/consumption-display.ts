import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Consumption } from '../../models/consumption';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiFacade } from '../../services/api.facade';
import { interval, Subscription, take } from 'rxjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ProductConsumption } from '../../models/product-consumption';

@Component({
  selector: 'app-consume-display',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    FlexLayoutModule,
    MatTableModule,
    MatCardModule,
    DecimalPipe,
  ],
  templateUrl: './consumption-display.html',
  styleUrl: './consumption-display.css',
})
export class ConsumptionDisplay implements OnInit {
  onInputChange(productConsumption: ProductConsumption, event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = parseInt(target?.value);
    if (isNaN(inputValue) || inputValue < 0) {
      productConsumption.withdrawnQty = 0;
    } else {
      productConsumption.withdrawnQty = inputValue;
    }
  }

  /**
   * Array der verbrauchten Artikel, die in der Tabelle angezeigt werden.
   * In diesem Array wird pro Artikel sowohl der bisherige Verbrauch als auch
   * die Anzahl der entnommenen Artikel gespeichert.
   */
  protected productConsumptions: ProductConsumption[] = [];

  /**
   * Array der Verbrauchsartikel, die aus der API geladen werden.
   * Aus diesen Daten wird das productConsumptions Array gefüllt.
   */
  protected consumptions: Consumption[] = [];

  displayedColumns: string[] = ['name', 'price', 'quantity', 'withdrawnQty'];

  protected memberName: string | null = null;
  protected categories: Category[] | null = null;
  protected countdown: number = 0; // Countdown für die Weiterleitung
  private countdownSub?: Subscription;
  get saveDisabled(): boolean {
    const hasPositive = Object.values(this.productConsumptions).some(
      (val) => val.withdrawnQty > 0
    );
    return !hasPositive;
  }

  constructor(private router: Router, private apiFacade: ApiFacade) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state;
    this.memberName = state?.['name'];
    this.consumptions = state?.['consumptions'] || [];
  }

  ngOnInit(): void {
    this.apiFacade.getCategories().subscribe((cats) => {
      this.categories = cats;
      this.fillProductConsumptions();
    });
  }

  private fillProductConsumptions(): void {
    if (!this.categories) {
      return;
    }

    for (const cat of this.categories) {
      const consumption = this.consumptions?.find(
        (co) => co.categoryId === cat.id
      );
      const pConsumption = this.productConsumptions?.find(
        (co) => co.id === cat.id
      );
      if (pConsumption) {
        pConsumption.quantity = consumption?.quantity ?? 0;
        pConsumption.withdrawnQty = 0;
      } else {
        const pc = {
          id: cat.id,
          name: cat.description,
          price: cat.price,
          quantity: consumption?.quantity ?? 0,
          withdrawnQty: 0,
        } as ProductConsumption;
        this.productConsumptions.push(pc);
      }
    }
  }

  protected getConsume(catId: string): number {
    return (
      this.consumptions?.find((c) => c.categoryId === catId)?.quantity ?? 0
    );
  }

  protected saveConsumptions() {
    if (!this.memberName) {
      return;
    }
    const newConsumptions: { [catId: string]: number } = {};
    for (const pc of this.productConsumptions) {
      newConsumptions[pc.id] = pc.withdrawnQty;
    }

    this.apiFacade
      .saveConsumptions(this.memberName, newConsumptions)
      .subscribe({
        next: (response: Consumption[]) => {
          this.consumptions = response;

          this.fillProductConsumptions();

          this.countdown = 6;
          this.countdownSub = interval(1000)
            .pipe(take(this.countdown))
            .subscribe({
              next: () => this.countdown--,
              complete: () => this.router.navigate(['']),
            });
        },
        error: (err: any) => {
          console.error(
            'Fehler beim Speichern des eingegebenen Verbrauchs:',
            err
          );
          alert(
            'Fehler beim Speichern des eingegebenen Verbrauchs. Bitte versuchen Sie es später erneut.'
          );
        },
      });
  }

  protected decreaseConsume(productConsumption: ProductConsumption): void {
    productConsumption.withdrawnQty = productConsumption.withdrawnQty - 1;
    if (productConsumption.withdrawnQty < 0) {
      productConsumption.withdrawnQty = 0;
    }
    this.cancelCountdown();
  }

  protected increaseConsume(productConsumption: ProductConsumption): void {
    productConsumption.withdrawnQty++;
    this.cancelCountdown();
  }

  protected clearConsume(productConsumption: ProductConsumption): void {
    productConsumption.withdrawnQty = 0;
    this.cancelCountdown();
  }

  protected cancelCountdown() {
    this.countdownSub?.unsubscribe();
    this.countdown = 0; // Reset countdown
  }
}
