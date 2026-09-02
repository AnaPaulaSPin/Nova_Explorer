import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExplorerShellComponent } from '../../shared/explorer-shell/explorer-shell.component';
import { FileItemComponent } from './components/file-item/file-item.component';
import { FolderItemComponent } from './components/folder-item/folder-item.component';
import { FileCategory } from './models/file-item.model';
import { ExplorerNode, FileNode, FolderNode } from './models/file-system.model';
import { FileSystemStore } from './services/file-system.store';

type ViewMode = 'list' | 'grid';
type SortMode = 'name-asc' | 'name-desc' | 'newest' | 'oldest' | 'type' | 'size';
type ModalMode = 'folder' | 'rename' | 'bulk-rename' | 'info' | 'confirm-delete' | 'move' | null;

@Component({
  selector: 'app-meus-arquivos',
  imports: [ExplorerShellComponent, FileItemComponent, FolderItemComponent, FormsModule],
  templateUrl: './meus-arquivos.component.html',
  styleUrl: './meus-arquivos.component.css'
})
export class MeusArquivosComponent implements OnInit {
  protected readonly fileSystem = inject(FileSystemStore);
  private readonly route = inject(ActivatedRoute);
  protected readonly rootFolder = this.fileSystem.root;
  protected currentFolderId = this.rootFolder.id;
  protected searchTerm = '';
  protected selectedCategory: FileCategory | 'todos' | 'favoritos' = 'todos';
  protected sortMode: SortMode = 'newest';
  protected viewMode: ViewMode = 'list';
  protected modalMode: ModalMode = null;
  protected modalName = '';
  protected modalTarget: ExplorerNode | null = null;
  protected bulkNames: Record<string, string> = {};
  protected moveTargetFolder = this.rootFolder.id;
  protected toastMessage = '';
  protected isDropActive = false;
  protected readonly selectedIds = new Set<string>();

  ngOnInit(): void {
    const folderId = this.route.snapshot.queryParamMap.get('folder');
    if (folderId && this.fileSystem.getFolder(folderId)) this.currentFolderId = folderId;
  }

  protected get currentFolder(): FolderNode { return this.fileSystem.getFolder(this.currentFolderId) ?? this.rootFolder; }
  protected get breadcrumb(): FolderNode[] { return this.fileSystem.getBreadcrumb(this.currentFolderId); }
  protected get folders(): FolderNode[] { return this.fileSystem.getAllFolders(this.currentFolder); }
  protected get currentFolders(): FolderNode[] { return this.currentFolder.children.filter((node): node is FolderNode => node.kind === 'folder'); }
  protected get visibleFiles(): FileNode[] {
    const search = this.searchTerm.trim().toLocaleLowerCase();
    const files = search ? this.fileSystem.getAllFiles().filter((file) => file.name.toLocaleLowerCase().includes(search)) : this.currentFolder.children.filter((node): node is FileNode => node.kind === 'file');
    const filtered = files.filter((file) => this.selectedCategory === 'todos' || (this.selectedCategory === 'favoritos' ? file.favorite : file.category === this.selectedCategory));
    return [...filtered].sort((first, second) => {
      switch (this.sortMode) {
        case 'name-asc': return first.name.localeCompare(second.name);
        case 'name-desc': return second.name.localeCompare(first.name);
        case 'type': return first.type.localeCompare(second.type);
        case 'size': return this.sizeInBytes(first.size) - this.sizeInBytes(second.size);
        case 'oldest': return first.createdAt.localeCompare(second.createdAt);
        default: return second.modifiedAt.localeCompare(first.modifiedAt);
      }
    });
  }

  protected get selectedNodes(): ExplorerNode[] { return [...this.selectedIds].map((id) => this.fileSystem.getNode(id)).filter((node): node is ExplorerNode => !!node); }
  protected get selectedFiles(): FileNode[] { return this.selectedNodes.filter((node): node is FileNode => node.kind === 'file'); }
  protected get selectedFolders(): FolderNode[] { return this.selectedNodes.filter((node): node is FolderNode => node.kind === 'folder'); }
  protected get allVisibleSelected(): boolean { const items = [...this.currentFolders, ...this.visibleFiles]; return items.length > 0 && items.every((item) => this.selectedIds.has(item.id)); }
  protected get allSelectedAreFavorites(): boolean { return this.selectedFiles.length > 0 && this.selectedFiles.every((file) => file.favorite); }
  protected get selectedCount(): number { return this.selectedIds.size; }

  protected openFolder(folder: FolderNode): void { this.currentFolderId = folder.id; this.searchTerm = ''; this.clearSelection(); }
  protected goToFolder(folder: FolderNode): void { this.currentFolderId = folder.id; this.clearSelection(); }
  protected goToParent(): void { const parent = this.fileSystem.getBreadcrumb(this.currentFolderId).at(-2); if (parent) this.goToFolder(parent); }

  protected toggleSelection(node: ExplorerNode): void { if (this.selectedIds.has(node.id)) this.selectedIds.delete(node.id); else this.selectedIds.add(node.id); }
  protected clearSelection(): void { this.selectedIds.clear(); }
  protected toggleAllVisible(): void { const items = [...this.currentFolders, ...this.visibleFiles]; if (this.allVisibleSelected) items.forEach((item) => this.selectedIds.delete(item.id)); else items.forEach((item) => this.selectedIds.add(item.id)); }

  protected toggleFavorite(file: FileNode): void { this.fileSystem.toggleFavorite(file.id); this.notify(file.favorite ? 'Arquivo adicionado aos favoritos.' : 'Arquivo removido dos favoritos.'); }
  protected favoriteSelection(): void {
    const files = this.selectedFiles;
    if (!files.length) return;
    const favoriteAll = files.every((file) => file.favorite);
    files.forEach((file) => {
      if (file.favorite === favoriteAll) this.fileSystem.toggleFavorite(file.id);
    });
    this.notify(favoriteAll ? 'Arquivos removidos dos favoritos.' : 'Arquivos adicionados aos favoritos.');
  }

  protected renameSelection(): void {
    if (this.selectedCount === 1) this.openRename(this.selectedNodes[0]);
    else if (this.selectedCount > 1) { this.bulkNames = Object.fromEntries(this.selectedNodes.map((node) => [node.id, node.name])); this.modalMode = 'bulk-rename'; }
  }
  protected openRename(node: ExplorerNode): void { this.modalTarget = node; this.modalName = node.name; this.modalMode = 'rename'; }
  protected saveBulkRename(): void { this.selectedNodes.forEach((node) => { const name = this.bulkNames[node.id]?.trim(); if (name) this.fileSystem.rename(node.id, node.kind === 'file' ? this.keepExtension(node.name, name) : name); }); this.notify('Itens renomeados.'); this.clearSelection(); this.closeModal(); }

  protected requestDeleteSelected(): void { if (this.selectedCount) this.modalMode = 'confirm-delete'; }
  protected deleteSelected(): void { const count = this.selectedCount; this.fileSystem.remove([...this.selectedIds]); this.clearSelection(); this.closeModal(); this.notify(`${count} item${count === 1 ? '' : 's'} excluído${count === 1 ? '' : 's'}.`); }
  protected deleteNode(node: ExplorerNode): void { this.selectedIds.clear(); this.selectedIds.add(node.id); this.requestDeleteSelected(); }

  protected createFolder(): void { this.modalName = ''; this.modalTarget = null; this.modalMode = 'folder'; }
  protected saveModal(): void {
    const name = this.modalName.trim();
    if (!name) return;
    if (this.modalMode === 'folder') {
      this.fileSystem.createFolder(this.currentFolderId, name);
      this.notify('Pasta criada.');
    } else if (this.modalMode === 'rename' && this.modalTarget) {
      const nextName = this.modalTarget.kind === 'file' ? this.keepExtension(this.modalTarget.name, name) : name;
      this.fileSystem.rename(this.modalTarget.id, nextName);
      this.notify('Nome atualizado.');
    }
    this.closeModal();
  }
  protected openInfo(node: ExplorerNode): void { this.modalTarget = node; this.modalMode = 'info'; }
  protected closeModal(): void { this.modalMode = null; this.modalTarget = null; }

  protected openMoveSelected(): void { this.moveTargetFolder = this.currentFolderId; this.modalMode = 'move'; }
  protected get moveTargets(): FolderNode[] { return [this.rootFolder, ...this.fileSystem.getAllFolders().filter((folder) => !this.selectedIds.has(folder.id) && !this.selectedFolders.some((selected) => this.fileSystem.getPath(folder.id).startsWith(this.fileSystem.getPath(selected.id) + ' > ')))]; }
  protected applyMove(): void { const moved = this.fileSystem.move([...this.selectedIds], this.moveTargetFolder); this.notify(`${moved} item${moved === 1 ? '' : 's'} movido${moved === 1 ? '' : 's'}.`); this.clearSelection(); this.closeModal(); }

  protected setCategory(category: FileCategory | 'todos' | 'favoritos'): void { this.selectedCategory = category; }
  protected setSort(sort: SortMode): void { this.sortMode = sort; }
  protected setView(mode: ViewMode): void { this.viewMode = mode; }
  protected openFile(file: FileNode): void { this.notify(`Abrindo ${file.name}.`); }
  protected moveFile(file: FileNode): void { this.selectedIds.clear(); this.selectedIds.add(file.id); this.openMoveSelected(); }
  protected exportSelected(): void { this.notify(`${this.selectedCount} itens exportados.`); }

  protected dragOver(event: DragEvent): void { event.preventDefault(); this.isDropActive = true; }
  protected dragLeave(): void { this.isDropActive = false; }
  protected dropFiles(event: DragEvent): void { event.preventDefault(); this.isDropActive = false; const droppedFiles = Array.from(event.dataTransfer?.files ?? []); droppedFiles.forEach((file) => this.fileSystem.addDroppedFile(this.currentFolderId, file)); if (droppedFiles.length) this.notify(`${droppedFiles.length} arquivo${droppedFiles.length === 1 ? '' : 's'} adicionado${droppedFiles.length === 1 ? '' : 's'}.`); }

  protected filePath(file: FileNode): string { return this.fileSystem.getPath(file.id).replace(` > ${file.name}`, '').replace(`${this.rootFolder.name} > `, ''); }
  protected folderFileCount(folder: FolderNode): number { return this.fileSystem.countFiles(folder); }
  protected folderCount(folder: FolderNode): number { return this.fileSystem.countFolders(folder); }

  private sizeInBytes(size: string): number { return Number.parseFloat(size.replace(',', '.')) * (size.includes('MB') ? 1024 : 1); }
  private keepExtension(currentName: string, nextName: string): string { const extension = currentName.includes('.') ? currentName.slice(currentName.lastIndexOf('.')) : ''; return nextName.endsWith(extension) || !extension ? nextName : `${nextName}${extension}`; }
  private notify(message: string): void { this.toastMessage = message; setTimeout(() => this.toastMessage = '', 2600); }
}
