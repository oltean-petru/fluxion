import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type TrendTone = 'positive' | 'negative' | 'neutral';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html'
})
export class StatCardComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) value = '';
  @Input() subtitle = '';
  @Input() icon = 'dashboard';
  @Input() trendLabel: string | null = null;
  @Input() trendTone: TrendTone = 'neutral';

  get trendClasses(): string {
    if (this.trendTone === 'positive') {
      return 'bg-success-soft text-success';
    }

    if (this.trendTone === 'negative') {
      return 'bg-danger-soft text-danger';
    }

    return 'bg-secondary text-ink-subtle';
  }
}
