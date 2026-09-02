export type FileCategory = 'documentos' | 'imagens' | 'videos' | 'audios' | 'outros';

export interface FileItem {
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
