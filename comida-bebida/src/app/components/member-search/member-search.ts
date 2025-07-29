import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Consumption } from '../../models/consumption';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiFacade } from '../../services/api.facade';

@Component({
  standalone: true,
  selector: 'app-member-search',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './member-search.html',
  styleUrl: './member-search.css',
})
export class MemberSearch {
  protected searchName: string = '';
  protected consumptions: Consumption[] | null = null;

  constructor(private router: Router, private apiFacade: ApiFacade) {}

  protected search(): void {
    if (!this.searchName) {
      return;
    }
    this.apiFacade.getConsumptions(this.searchName).subscribe((cons) => {
      this.consumptions = cons;
      this.router.navigate(['/details'], {
        state: {
          name: this.searchName,
          consumptions: this.consumptions,
        },
      });
    });
  }
}
