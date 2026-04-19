import { Component, Input } from '@angular/core';

type StatusTone = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html'
})
export class StatusBadgeComponent {
  @Input({ required: true }) label = '';
  @Input() tone: StatusTone = 'neutral';

  get badgeClasses(): string {
    const toneClassMap: Record<StatusTone, string> = {
      success: 'bg-success-soft text-success',
      warning: 'bg-warning-soft text-warning',
      danger: 'bg-danger-soft text-danger',
      neutral: 'bg-secondary text-ink-subtle',
      info: 'bg-brand-softer text-brand'
    };

    return toneClassMap[this.tone];
  }
}
