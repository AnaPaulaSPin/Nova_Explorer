import { Injectable } from '@angular/core';
import { FileNode, FolderNode, ExplorerNode } from '../models/file-system.model';
import { FileCategory } from '../models/file-item.model';

type MockFileData = Omit<FileNode, 'kind' | 'favorite'> & { favorite?: boolean };

export type SearchFilter = 'todos' | FileCategory | 'pastas' | 'favoritos';

export interface SearchResult {
  readonly node: ExplorerNode;
  readonly path: string;
}

@Injectable({ providedIn: 'root' })
export class FileSystemStore {
  readonly root: FolderNode = {
    kind: 'folder',
    id: 'root',
    name: 'Meus arquivos',
    color: 'blue',
    children: [
      this.file({ id: 'root-database', name: 'Resumo_Banco_de_Dados.pdf', type: 'PDF', category: 'documentos', location: 'Faculdade', size: '2,4 MB', createdAt: 'Hoje, 10:32', modifiedAt: 'Hoje, 10:32', icon: 'fa-solid fa-file-pdf', color: 'pdf' }),
      this.file({ id: 'root-interface', name: 'Interface_Explorer.png', type: 'Imagem PNG', category: 'imagens', location: 'Imagens', size: '3,2 MB', createdAt: 'Ontem, 18:42', modifiedAt: 'Ontem, 18:42', icon: 'fa-solid fa-file-image', color: 'image' }),
      this.folder('college', 'Faculdade', 'blue', [
        this.file({ id: 'college-redes', name: 'Redes_II.pdf', type: 'PDF', category: 'documentos', location: 'Faculdade', size: '4,7 MB', createdAt: 'Ontem, 16:20', modifiedAt: 'Ontem, 16:20', icon: 'fa-solid fa-file-pdf', color: 'pdf' }),
        this.file({ id: 'college-pesquisa', name: 'Pesquisa_Redes.docx', type: 'Documento Word', category: 'documentos', location: 'Faculdade', size: '1,2 MB', createdAt: '20 ago. 2026', modifiedAt: '20 ago. 2026', icon: 'fa-solid fa-file-word', color: 'word' })
      ]),
      this.folder('projects', 'Projetos', 'purple', [
        this.file({ id: 'projects-explorer', name: 'Projeto_Explorer.docx', type: 'Documento Word', category: 'documentos', location: 'Projetos', size: '1,8 MB', createdAt: 'Hoje, 09:15', modifiedAt: 'Hoje, 09:15', icon: 'fa-solid fa-file-word', color: 'word', favorite: true }),
        this.file({ id: 'projects-presentation', name: 'Apresentacao_PET.pptx', type: 'PowerPoint', category: 'documentos', location: 'Projetos', size: '5,1 MB', createdAt: '25 ago. 2026', modifiedAt: '25 ago. 2026', icon: 'fa-solid fa-file-powerpoint', color: 'powerpoint' }),
        this.folder('angular', 'Angular', 'purple', [
          this.file({ id: 'angular-app', name: 'app.ts', type: 'TypeScript', category: 'outros', location: 'Angular', size: '8 KB', createdAt: '24 ago. 2026', modifiedAt: '24 ago. 2026', icon: 'fa-regular fa-file-code', color: 'word' }),
          this.file({ id: 'angular-styles', name: 'styles.css', type: 'CSS', category: 'outros', location: 'Angular', size: '4 KB', createdAt: '24 ago. 2026', modifiedAt: '24 ago. 2026', icon: 'fa-regular fa-file-code', color: 'word' })
        ])
      ]),
      this.folder('images', 'Imagens', 'pink', [
        this.file({ id: 'images-banner', name: 'banner.jpg', type: 'Imagem JPG', category: 'imagens', location: 'Imagens', size: '1,6 MB', createdAt: '19 ago. 2026', modifiedAt: '19 ago. 2026', icon: 'fa-solid fa-file-image', color: 'image' }),
        this.file({ id: 'images-interface', name: 'Interface_Explorer_2.png', type: 'Imagem PNG', category: 'imagens', location: 'Imagens', size: '2,8 MB', createdAt: '18 ago. 2026', modifiedAt: '18 ago. 2026', icon: 'fa-solid fa-file-image', color: 'image' })
      ]),
      this.folder('documents', 'Documentos', 'cyan', [
        this.file({ id: 'documents-notes', name: 'Notas.txt', type: 'Texto', category: 'documentos', location: 'Documentos', size: '12 KB', createdAt: '17 ago. 2026', modifiedAt: '17 ago. 2026', icon: 'fa-regular fa-file-lines', color: 'word' })
      ])
    ]
  };

  private nextId = 1;

  getFolder(folderId: string): FolderNode | undefined {
    return this.findNode(folderId)?.kind === 'folder' ? this.findNode(folderId) as FolderNode : undefined;
  }

  getNode(nodeId: string): ExplorerNode | undefined { return this.findNode(nodeId); }

  getChildren(folderId: string): ExplorerNode[] { return this.getFolder(folderId)?.children ?? []; }

  getBreadcrumb(folderId: string): FolderNode[] {
    const path: FolderNode[] = [];
    this.buildPath(this.root, folderId, path);
    return path;
  }

  getAllFiles(folder: FolderNode = this.root): FileNode[] {
    return folder.children.flatMap((child) => child.kind === 'file' ? [child] : this.getAllFiles(child));
  }

  getAllFolders(folder: FolderNode = this.root): FolderNode[] {
    return folder.children.flatMap((child) => child.kind === 'folder' ? [child, ...this.getAllFolders(child)] : []);
  }

  search(query: string, filter: SearchFilter = 'todos'): SearchResult[] {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return [];
    const results: SearchResult[] = [];
    this.collectMatches(this.root, normalizedQuery, filter, results);
    return results;
  }

  countFiles(folder: FolderNode): number { return this.getAllFiles(folder).length; }
  countFolders(folder: FolderNode): number { return folder.children.filter((child) => child.kind === 'folder').length; }

  getPath(nodeId: string): string {
    const node = this.findNode(nodeId);
    if (!node) return this.root.name;
    const parentPath = this.findParentPath(this.root, nodeId);
    return [this.root.name, ...(parentPath ?? []), node.name].join(' > ');
  }

  createFolder(parentId: string, name: string): FolderNode | undefined {
    const parent = this.getFolder(parentId);
    if (!parent || !name.trim()) return undefined;
    const folder = this.folder(`folder-${Date.now()}-${this.nextId++}`, name.trim(), 'cyan', []);
    parent.children.push(folder);
    return folder;
  }

  rename(nodeId: string, name: string): boolean {
    const node = this.findNode(nodeId);
    if (!node || !name.trim()) return false;
    node.name = name.trim();
    return true;
  }

  toggleFavorite(nodeId: string): boolean {
    const node = this.findNode(nodeId);
    if (node?.kind !== 'file') return false;
    node.favorite = !node.favorite;
    return node.favorite;
  }

  move(nodeIds: readonly string[], targetFolderId: string): number {
    const target = this.getFolder(targetFolderId);
    if (!target) return 0;
    let moved = 0;
    for (const nodeId of nodeIds) {
      const node = this.findNode(nodeId);
      if (!node || node.id === this.root.id || node.kind === 'folder' && this.contains(node, target.id)) continue;
      const parent = this.findParent(this.root, nodeId);
      if (!parent || parent.id === target.id) continue;
      const index = parent.children.indexOf(node);
      if (index >= 0) {
        parent.children.splice(index, 1);
        target.children.push(node);
        if (node.kind === 'file') node.location = target.name;
        moved++;
      }
    }
    return moved;
  }

  remove(nodeIds: readonly string[]): number {
    let removed = 0;
    for (const nodeId of nodeIds) {
      const parent = this.findParent(this.root, nodeId);
      const node = parent?.children.find((child) => child.id === nodeId);
      if (parent && node) {
        parent.children.splice(parent.children.indexOf(node), 1);
        removed++;
      }
    }
    return removed;
  }

  addDroppedFile(parentId: string, file: File): FileNode | undefined {
    const parent = this.getFolder(parentId);
    if (!parent) return undefined;
    const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
    const image = ['png', 'jpg', 'jpeg', 'gif'].includes(extension);
    let category: FileNode['category'] = 'outros';
    if (image) category = 'imagens';
    else if (['mp4', 'webm'].includes(extension)) category = 'videos';
    else if (['mp3', 'wav'].includes(extension)) category = 'audios';
    else if (['pdf', 'doc', 'docx', 'pptx', 'txt'].includes(extension)) category = 'documentos';
    const node = this.file({ id: `dropped-${Date.now()}-${this.nextId++}`, name: file.name, type: extension.toUpperCase() || 'Arquivo', category, location: parent.name, size: `${Math.max(1, Math.round(file.size / 1024))} KB`, createdAt: 'Agora', modifiedAt: 'Agora', icon: image ? 'fa-solid fa-file-image' : 'fa-regular fa-file', color: image ? 'image' : 'word' });
    parent.children.push(node);
    return node;
  }

  private findNode(nodeId: string, folder: FolderNode = this.root): ExplorerNode | undefined {
    if (folder.id === nodeId) return folder;
    for (const child of folder.children) {
      if (child.id === nodeId) return child;
      if (child.kind === 'folder') {
        const found = this.findNode(nodeId, child);
        if (found) return found;
      }
    }
    return undefined;
  }

  private collectMatches(folder: FolderNode, query: string, filter: SearchFilter, results: SearchResult[]): void {
    for (const child of folder.children) {
      const matchesName = child.name.toLocaleLowerCase().includes(query);
      const matchesFilter = child.kind === 'folder' ? filter === 'todos' || filter === 'pastas' : filter === 'todos' || filter === child.category || filter === 'favoritos' && child.favorite;
      if (matchesName && matchesFilter) results.push({ node: child, path: this.getPath(child.id) });
      if (child.kind === 'folder') this.collectMatches(child, query, filter, results);
    }
  }

  private findParent(folder: FolderNode, nodeId: string): FolderNode | undefined {
    for (const child of folder.children) {
      if (child.id === nodeId) return folder;
      if (child.kind === 'folder') {
        const parent = this.findParent(child, nodeId);
        if (parent) return parent;
      }
    }
    return undefined;
  }

  private findParentPath(folder: FolderNode, nodeId: string): string[] | undefined {
    for (const child of folder.children) {
      if (child.id === nodeId) return [];
      if (child.kind === 'folder') {
        const path = this.findParentPath(child, nodeId);
        if (path) return [child.name, ...path];
      }
    }
    return undefined;
  }

  private buildPath(folder: FolderNode, targetId: string, path: FolderNode[]): boolean {
    if (folder.id === targetId) { path.unshift(folder); return true; }
    for (const child of folder.children) {
      if (child.kind === 'folder' && this.buildPath(child, targetId, path)) { path.unshift(folder); return true; }
    }
    return false;
  }

  private contains(folder: FolderNode, nodeId: string): boolean { return !!this.findNode(nodeId, folder); }

  private folder(id: string, name: string, color: string, children: ExplorerNode[]): FolderNode { return { kind: 'folder', id, name, color, children }; }
  private file(data: MockFileData): FileNode { return { kind: 'file', ...data, favorite: data.favorite ?? false }; }
}
