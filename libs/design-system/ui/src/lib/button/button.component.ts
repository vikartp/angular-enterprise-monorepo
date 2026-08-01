import {
  Component,
  input,
  output,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Enterprise Button Component — Presentation-Only (Dumb Component)
 *
 * ✅ Zero business logic. Zero API dependencies.
 * ✅ All configuration via Signal inputs.
 * ✅ All user interactions via output functions.
 * ✅ OnPush change detection for maximum performance.
 *
 * @example
 * ```html
 * <ds-button variant="primary" size="md" (clicked)="onSave()">
 *   Save Changes
 * </ds-button>
 * ```
 */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-loading]': 'loading() || null',
  },
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading()"
      [attr.aria-label]="ariaLabel()"
      class="ds-btn__inner"
      (click)="handleClick($event)"
      (focus)="focused.emit()"
      (blur)="blurred.emit()"
    >
      @if (loading()) {
        <span class="ds-btn__spinner" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="ds-btn__spinner-svg">
            <circle
              cx="12" cy="12" r="10"
              stroke="currentColor"
              stroke-width="3"
              fill="none"
              stroke-linecap="round"
              stroke-dasharray="31.4 31.4"
            />
          </svg>
        </span>
      }

      @if (iconLeft()) {
        <span class="ds-btn__icon ds-btn__icon--left" aria-hidden="true">
          <ng-content select="[slot=icon-left]" />
        </span>
      }

      <span class="ds-btn__label" [class.ds-btn__label--hidden]="loading()">
        <ng-content />
      </span>

      @if (iconRight()) {
        <span class="ds-btn__icon ds-btn__icon--right" aria-hidden="true">
          <ng-content select="[slot=icon-right]" />
        </span>
      }
    </button>
  `,
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  // ── Signal Inputs ──
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly fullWidth = input(false);
  readonly iconLeft = input(false);
  readonly iconRight = input(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  // ── Outputs ──
  readonly clicked = output<MouseEvent>();
  readonly focused = output<void>();
  readonly blurred = output<void>();

  // ── Computed Host Classes ──
  readonly hostClasses = computed(() => {
    const classes = [
      'ds-btn',
      `ds-btn--${this.variant()}`,
      `ds-btn--${this.size()}`,
    ];
    if (this.fullWidth()) classes.push('ds-btn--full-width');
    if (this.loading()) classes.push('ds-btn--loading');
    if (this.disabled()) classes.push('ds-btn--disabled');
    return classes.join(' ');
  });

  handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}
