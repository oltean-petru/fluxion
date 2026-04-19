import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() leadingIcon: string | null = 'chevron_left';
  @Input() trailingIcon: string | null = 'chevron_right';
  @Input() iconOnly = false;

  get baseClasses() {
    return 'inline-flex items-center justify-center cursor-pointer font-medium transition-colors rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  }

  get variantClasses(): string {
    const variants = {
      primary: 'bg-brand text-white hover:bg-brand-strong focus:ring-4 focus:ring-brand-soft',
      secondary: 'bg-surface border border-line text-ink hover:bg-surface-muted focus:ring-4 focus:ring-line-subtle',
      danger: 'bg-danger text-white hover:bg-danger-strong focus:ring-4 focus:ring-danger-soft',
      ghost: 'text-ink hover:bg-surface-muted focus:ring-4 focus:ring-line-subtle',
      link: '!px-0 !py-0 !rounded-none text-brand hover:text-brand-strong focus:ring-0 bg-transparent'
    };
    return variants[this.variant] || variants.primary;
  }

  get sizeClasses(): string {
    if (this.iconOnly) {
      const iconOnlySizes = {
        sm: 'h-8 w-8 p-0',
        md: 'h-10 w-10 p-0',
        lg: 'h-12 w-12 p-0'
      };

      return iconOnlySizes[this.size] || iconOnlySizes.md;
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-base gap-2',
      lg: 'px-6 py-3 text-lg gap-2.5'
    };
    return sizes[this.size] || sizes.md;
  }

  get iconClasses(): string {
    const sizes = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl'
    };

    return `${sizes[this.size] || sizes.md} leading-none`;
  }

  get buttonClasses(): string {
    return `${this.baseClasses} ${this.variantClasses} ${this.sizeClasses}`;
  }
}
