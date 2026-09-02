import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly currentLocation = input('Início');
  private readonly router = inject(Router);

  search(query: string): void {
    const value = query.trim();
    if (value) {
      void this.router.navigate(['/pesquisa-inteligente'], { queryParams: { q: value } });
    }
  }

  goBack(): void { window.history.back(); }
  goForward(): void { window.history.forward(); }
  reload(): void { window.location.reload(); }
}
