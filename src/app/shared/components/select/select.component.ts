import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() placeholder = 'Select';
  @Input() label = '';
  @Input() options: Array<string | { label: string; value: string }> = [];
  @Input() value = '';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();

  get selectClasses(): string {
    return 'w-full appearance-none rounded-2xl border border-line bg-secondary px-4 py-3 pr-10 text-sm text-ink-body transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft disabled:cursor-not-allowed disabled:opacity-60';
  }

  get normalizedOptions(): Array<{ label: string; value: string }> {
    return this.options.map((option) => (typeof option === 'string' ? { label: option, value: option } : option));
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.valueChange.emit(target.value);
  }
}
