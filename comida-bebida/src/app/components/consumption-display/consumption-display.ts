import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CommonModule } from '@angular/common';
import { Consumption } from '../../models/consumption';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiFacade } from '../../services/api.facade';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-consume-display',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './consumption-display.html',
  styleUrl: './consumption-display.css',
})
export class ConsumptionDisplay implements OnInit {
  protected memberName: string | null = null;
  protected categories: Category[] | null = null;
  protected consumptions: Consumption[] | null = null;
  protected newConsumptions: { [catId: string]: number } = {};
  protected countdown: number = 0; // Countdown für die Weiterleitung
  private countdownSub?: Subscription;
  get saveDisabled(): boolean {
    const hasPositive = Object.values(this.newConsumptions).some(
      (val) => val > 0
    );
    return !hasPositive;
  }

  constructor(private router: Router, private apiFacade: ApiFacade) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state;
    this.memberName = state?.['name'];
    this.consumptions = state?.['consumptions'] || [];
    console.log(JSON.stringify(this.newConsumptions));
  }

  ngOnInit(): void {
    this.apiFacade.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
    this.resetNewConsumptions();
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

    this.apiFacade
      .saveConsumptions(this.memberName, this.newConsumptions)
      .subscribe({
        next: (response: Consumption[]) => {
          // aktualisiere die angezeigten Verbrauchswerte und leite nach 3 Sekunden weiter zur Startseite
          this.consumptions = response;
          this.resetNewConsumptions();
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

  protected decreaseConsume(catId: string): void {
    this.newConsumptions[catId] = this.newConsumptions[catId] - 1;
    if (this.newConsumptions[catId] < 0) {
      this.newConsumptions[catId] = 0;
    }
    this.cancelCountdown();
  }

  protected increaseConsume(catId: string): void {
    this.newConsumptions[catId] = this.newConsumptions[catId] + 1;
    this.cancelCountdown();
  }

  protected clearConsume(catId: string): void {
    this.newConsumptions[catId] = 0;
    this.cancelCountdown();
  }

  protected cancelCountdown() {
    this.countdownSub?.unsubscribe();
    this.countdown = 0; // Reset countdown
  }

  private resetNewConsumptions(): void {
    for (const c of this.categories ?? []) {
      this.newConsumptions[c.id] = 0;
    }
  }
}
