import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  host: {
    class: 'block'
  },
  templateUrl: './section-card.component.html'
})
export class SectionCardComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
}
