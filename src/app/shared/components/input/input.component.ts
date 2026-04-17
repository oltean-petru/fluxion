import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type InputVariant = 'default' | 'error';
type InputSize = 'sm' | 'md' | 'lg';

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
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() disabled = false;
  @Input() placeholder = 'Placeholder';
  @Input() type = 'text';
  @Input() leadingIcon: string | null = 'info';
  @Input() trailingIcon: string | null = 'close';

  value: string = '';
  isFocused = false;

  private onChange: any = () => {};
  private onTouched: any = () => {};

  get baseClasses() {
    return 'w-full cursor-text transition-all rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  }

  get variantClasses(): string {
    const variants = {
      default: 'border border-line bg-surface text-ink placeholder-ink-subtle focus:border-brand focus:ring-2 focus:ring-brand-soft',
      error: 'border border-danger bg-surface text-ink placeholder-ink-subtle focus:border-danger focus:ring-2 focus:ring-danger-soft'
    };
    return variants[this.variant] || variants.default;
  }

  get sizeClasses(): string {
    const sizes = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-3 text-lg'
    };

    const paddings = {
      sm: {
        left: this.leadingIcon ? 'pl-9' : 'pl-3',
        right: this.trailingIcon ? 'pr-9' : 'pr-3'
      },
      md: {
        left: this.leadingIcon ? 'pl-10' : 'pl-4',
        right: this.trailingIcon ? 'pr-10' : 'pr-4'
      },
      lg: {
        left: this.leadingIcon ? 'pl-11' : 'pl-5',
        right: this.trailingIcon ? 'pr-11' : 'pr-5'
      }
    };

    const size = this.size in sizes ? this.size : 'md';

    return `${sizes[size]} ${paddings[size].left} ${paddings[size].right}`;
  }

  get inputClasses(): string {
    return `${this.baseClasses} ${this.variantClasses} ${this.sizeClasses}`;
  }

  get iconClasses(): string {
    const sizes = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl'
    };

    return `${sizes[this.size] || sizes.md} leading-none`;
  }

  get trailingButtonClasses(): string {
    const sizes = {
      sm: 'h-6 w-6',
      md: 'h-7 w-7',
      lg: 'h-8 w-8'
    };

    return `${sizes[this.size] || sizes.md} inline-flex cursor-pointer items-center justify-center rounded-md text-ink-subtle transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-50`;
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
