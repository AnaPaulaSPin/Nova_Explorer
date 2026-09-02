import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface QuickLink {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly icon: string;
  readonly className: string;
}

@Component({
  selector: 'app-quick-access',
  imports: [RouterLink],
  templateUrl: './quick-access.component.html',
  styleUrl: './quick-access.component.css'
})
export class QuickAccessComponent {
  protected readonly links: readonly QuickLink[] = [
    { title: 'Meus arquivos', description: 'Visualize e organize seus arquivos', path: '/meus-arquivos', icon: 'fa-regular fa-folder-open', className: 'primary-card' },
    { title: 'Pesquisa inteligente', description: 'Encontre arquivos usando linguagem natural', path: '/pesquisa-inteligente', icon: 'fa-solid fa-wand-magic-sparkles', className: 'ai-card' },
    { title: 'Timeline', description: 'Explore seus arquivos por data', path: '/timeline', icon: 'fa-solid fa-clock-rotate-left', className: 'timeline-card' },
    { title: 'Galeria', description: 'Fotos e capturas organizadas', path: '/galeria', icon: 'fa-regular fa-images', className: 'gallery-card' }
  ];
}
