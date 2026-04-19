import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from './shared/components/side-menu/side-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly searchQuery = signal('');

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  clearSearchQuery(): void {
    this.searchQuery.set('');
  }
}
