import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavigationItem {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  protected readonly navigation: readonly NavigationItem[] = [
    { label: 'Início', path: '/pagina-inicial', icon: 'fa-solid fa-house' },
    { label: 'Meus arquivos', path: '/meus-arquivos', icon: 'fa-regular fa-folder' },
    { label: 'Pesquisa inteligente', path: '/pesquisa-inteligente', icon: 'fa-solid fa-wand-magic-sparkles' },
    { label: 'Timeline', path: '/timeline', icon: 'fa-solid fa-clock-rotate-left' },
    { label: 'Galeria', path: '/galeria', icon: 'fa-regular fa-images' },
    { label: 'Tags', path: '/tags', icon: 'fa-solid fa-tags' }
  ];
}
