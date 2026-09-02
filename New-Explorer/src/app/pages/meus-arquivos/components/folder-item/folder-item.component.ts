import { Component, input, output } from '@angular/core';
import { FolderNode } from '../../models/file-system.model';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.css'
})
export class FolderItemComponent {
  readonly folder = input.required<FolderNode>();
  readonly fileCount = input(0);
  readonly folderCount = input(0);
  readonly selected = input(false);
  readonly openFolder = output<void>();
  readonly selectFolder = output<void>();
  readonly renameFolder = output<void>();

  protected select(event: Event): void {
    event.stopPropagation();
    this.selectFolder.emit();
  }
}
