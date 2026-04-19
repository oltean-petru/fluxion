import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type InputSize = 'sm' | 'base' | 'lg' | 'xl';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() size: InputSize = 'base';
  @Input() disabled = false;
  @Input() placeholder = 'Placeholder';
  @Input() type = 'text';
  @Input() leadingIcon: string | null = 'info';
  @Input() trailingIcon: string | null = 'close';

  @Input() value: string = '';
  isFocused = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get hasValue(): boolean {
    return this.value.trim().length > 0;
  }

  get baseClasses() {
    return 'w-full cursor-text rounded-2xl border shadow-sm transition-all focus:outline-none disabled:cursor-not-allowed';
  }

  get stateClasses(): string {
    if (this.disabled) {
      return 'border-line bg-secondary text-ink-subtle placeholder-ink-subtle';
    }

    if (this.isFocused) {
      return 'border-brand bg-surface text-ink placeholder-ink-subtle ring-2 ring-brand-soft';
    }

    if (this.hasValue) {
      return 'border-line bg-surface text-ink placeholder-ink-subtle';
    }

    return 'border-line bg-secondary text-ink-body placeholder-ink-subtle';
  }

  get sizeClasses(): string {
    const sizes = {
      sm: 'py-1.5 text-sm',
      base: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
      xl: 'py-3 text-xl'
    };

    const paddings = {
      sm: {
        left: this.leadingIcon ? 'pl-9' : 'pl-3',
        right: this.trailingIcon ? 'pr-9' : 'pr-3'
      },
      base: {
        left: this.leadingIcon ? 'pl-10' : 'pl-4',
        right: this.trailingIcon ? 'pr-10' : 'pr-4'
      },
      lg: {
        left: this.leadingIcon ? 'pl-11' : 'pl-5',
        right: this.trailingIcon ? 'pr-11' : 'pr-5'
      },
      xl: {
        left: this.leadingIcon ? 'pl-12' : 'pl-6',
        right: this.trailingIcon ? 'pr-12' : 'pr-6'
      }
    };

    const size = this.size in sizes ? this.size : 'base';

    return `${sizes[size]} ${paddings[size].left} ${paddings[size].right}`;
  }

  get inputClasses(): string {
    return `${this.baseClasses} ${this.stateClasses} ${this.sizeClasses}`;
  }

  get iconClasses(): string {
    const sizes = {
      sm: 'text-base',
      base: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl'
    };

    return `${sizes[this.size] || sizes.base} leading-none`;
  }

  get leadingIconColorClasses(): string {
    if (this.disabled) {
      return 'text-ink-subtle';
    }

    if (this.isFocused) {
      return 'text-brand';
    }

    if (this.hasValue) {
      return 'text-ink';
    }

    return 'text-ink-subtle';
  }

  get trailingButtonClasses(): string {
    const sizes = {
      sm: 'h-6 w-6',
      base: 'h-7 w-7',
      lg: 'h-8 w-8',
      xl: 'h-9 w-9'
    };

    return `${sizes[this.size] || sizes.base} inline-flex items-center justify-center rounded-md transition-colors disabled:cursor-not-allowed`;
  }

  get trailingIconColorClasses(): string {
    if (this.disabled) {
      return 'text-ink-subtle';
    }

    if (this.isFocused) {
      return 'text-brand hover:text-brand-strong';
    }

    return 'text-ink-body hover:text-ink';
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    this.onTouched();
  }

  clearValue() {
    this.value = '';
    this.onChange(this.value);
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
