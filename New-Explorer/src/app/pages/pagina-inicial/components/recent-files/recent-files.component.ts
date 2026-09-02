import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RecentFile {
  readonly name: string;
  readonly details: string;
  readonly size: string;
  readonly icon: string;
  readonly className: string;
}

@Component({
  selector: 'app-recent-files',
  imports: [RouterLink],
  templateUrl: './recent-files.component.html',
  styleUrl: './recent-files.component.css'
})
export class RecentFilesComponent {
  protected readonly files: readonly RecentFile[] = [
    { name: 'Resumo_Banco_de_Dados.pdf', details: 'Faculdade · Hoje, 10:32', size: '2,4 MB', icon: 'fa-solid fa-file-pdf', className: 'pdf' },
    { name: 'Projeto_Explorer.docx', details: 'Projetos · Hoje, 09:15', size: '1,8 MB', icon: 'fa-solid fa-file-word', className: 'word' },
    { name: 'Interface_Explorer.png', details: 'Imagens · Ontem, 18:42', size: '3,2 MB', icon: 'fa-solid fa-file-image', className: 'image' }
  ];
}
