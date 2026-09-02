import { Component, HostListener, input, output } from '@angular/core';
import { FileItem } from '../../models/file-item.model';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.css'
})
export class FileItemComponent {
  readonly file = input.required<FileItem>();
  readonly selected = input(false);
  readonly listView = input(false);
  readonly displayLocation = input<string | undefined>();
  readonly selectFile = output<void>();
  readonly openFile = output<void>();
  readonly renameFile = output<void>();
  readonly toggleFavorite = output<void>();
  readonly deleteFile = output<void>();
  readonly showInfo = output<void>();
  readonly moveFile = output<void>();

  protected menuOpen = false;

  @HostListener('document:click', ['$event'])
  protected closeMenuWhenClickingOutside(event: Event): void {
    if (this.menuOpen && event.target instanceof Node && !event.target.parentElement?.closest('.file-actions')) {
      this.closeMenu();
    }
  }

  protected toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  protected closeMenu(): void {
    this.menuOpen = false;
  }
}
