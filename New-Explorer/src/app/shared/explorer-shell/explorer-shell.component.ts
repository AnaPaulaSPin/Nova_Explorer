import { Component, input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NoviAssistantComponent } from '../novi-assistant/novi-assistant.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-explorer-shell',
  imports: [NavbarComponent, NoviAssistantComponent, SidebarComponent],
  templateUrl: './explorer-shell.component.html',
  styleUrl: './explorer-shell.component.css'
})
export class ExplorerShellComponent {
  readonly currentLocation = input('Início');
}
