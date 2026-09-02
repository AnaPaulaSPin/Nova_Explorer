import { FileCategory } from './file-item.model';

export interface FileNode {
  readonly kind: 'file';
  readonly id: string;
  name: string;
  readonly type: string;
  readonly category: FileCategory;
  location: string;
  readonly size: string;
  readonly createdAt: string;
  readonly modifiedAt: string;
  readonly icon: string;
  readonly color: string;
  favorite: boolean;
}

export interface FolderNode {
  readonly kind: 'folder';
  readonly id: string;
  name: string;
  readonly color: string;
  children: ExplorerNode[];
}

export type ExplorerNode = FileNode | FolderNode;
