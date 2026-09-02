import { Component, input } from '@angular/core';
import { ExplorerShellComponent } from '../explorer-shell/explorer-shell.component';

@Component({
  selector: 'app-page-shell',
  imports: [ExplorerShellComponent],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.css'
})
export class PageShellComponent {
  readonly title = input.required<string>();
}
