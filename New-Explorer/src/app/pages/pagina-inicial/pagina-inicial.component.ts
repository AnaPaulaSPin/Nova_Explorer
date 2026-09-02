import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExplorerShellComponent } from '../../shared/explorer-shell/explorer-shell.component';
import { AiSuggestionComponent } from './components/ai-suggestion/ai-suggestion.component';
import { DeviceOverviewComponent } from './components/device-overview/device-overview.component';
import { QuickAccessComponent } from './components/quick-access/quick-access.component';
import { RecentFilesComponent } from './components/recent-files/recent-files.component';

@Component({
  selector: 'app-pagina-inicial',
  imports: [AiSuggestionComponent, DeviceOverviewComponent, ExplorerShellComponent, QuickAccessComponent, RecentFilesComponent, RouterLink],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {
}
