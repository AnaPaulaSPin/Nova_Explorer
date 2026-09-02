import {
  Component,
  HostListener,
  effect,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { PageShellComponent } from '../../shared/page-shell/page-shell.component';
import { NoviCommunicationService } from '../../shared/novi-assistant/service/novi-communication.service';


interface ResultadoPesquisa {
  readonly nome: string;
  readonly local: string;
  readonly tipo: string;
  readonly tamanho: string;
  readonly descricao: string;
  readonly relevancia: number;
  readonly icone: string;
  readonly classeIcone: string;
}

@Component({
  selector: 'app-pesquisa-inteligente',
  imports: [
    FormsModule,
    PageShellComponent
  ],
  templateUrl: './pesquisa-inteligente.component.html',
  styleUrl: './pesquisa-inteligente.component.css'
})
export class PesquisaInteligenteComponent {

  private readonly noviCommunication = inject(
    NoviCommunicationService
  );

  protected query = '';
  protected pesquisaRealizada = false;
  protected resultadosFiltrados: ResultadoPesquisa[] = [];

  protected readonly sugestoes = [
    'Encontre meus arquivos da faculdade',
    'Mostre os arquivos modificados recentemente',
    'Encontre minhas imagens'
  ];

protected readonly resultados: readonly ResultadoPesquisa[] = [
  {
    nome: 'Resumo_Banco_de_Dados.pdf',
    local: 'Faculdade',
    tipo: 'PDF',
    tamanho: '2,4 MB',
    descricao: 'Arquivo relacionado aos estudos de Banco de Dados.',
    relevancia: 96,
    icone: 'fa-solid fa-file-pdf',
    classeIcone: 'result-card__icon--pdf'
  },
  {
    nome: 'Projeto_Explorer.docx',
    local: 'Projetos',
    tipo: 'Word',
    tamanho: '1,8 MB',
    descricao: 'Documento relacionado ao desenvolvimento do Nova Explorer.',
    relevancia: 94,
    icone: 'fa-solid fa-file-word',
    classeIcone: 'result-card__icon--word'
  },
  {
    nome: 'Interface_Explorer.png',
    local: 'Imagens',
    tipo: 'PNG',
    tamanho: '3,2 MB',
    descricao: 'Captura da interface do projeto Nova Explorer.',
    relevancia: 91,
    icone: 'fa-solid fa-file-image',
    classeIcone: 'result-card__icon--image'
  },
  {
    nome: 'Relatorio_Redes_2.pdf',
    local: 'Faculdade',
    tipo: 'PDF',
    tamanho: '4,7 MB',
    descricao: 'Relatório acadêmico sobre redes de computadores e protocolos.',
    relevancia: 88,
    icone: 'fa-solid fa-file-pdf',
    classeIcone: 'result-card__icon--pdf'
  },
  {
    nome: 'Anotacoes_Compiladores.docx',
    local: 'Faculdade',
    tipo: 'Word',
    tamanho: '936 KB',
    descricao: 'Anotações sobre análise léxica, sintática e fundamentos de compiladores.',
    relevancia: 85,
    icone: 'fa-solid fa-file-word',
    classeIcone: 'result-card__icon--word'
  },
  {
    nome: 'Diagrama_Banco_Dados.png',
    local: 'Faculdade',
    tipo: 'PNG',
    tamanho: '1,6 MB',
    descricao: 'Diagrama utilizado para representar a estrutura do banco de dados.',
    relevancia: 83,
    icone: 'fa-solid fa-file-image',
    classeIcone: 'result-card__icon--image'
  },
  {
    nome: 'Documentacao_Nova_Explorer.pdf',
    local: 'Projetos',
    tipo: 'PDF',
    tamanho: '5,1 MB',
    descricao: 'Documentação geral das funcionalidades e estrutura do Nova Explorer.',
    relevancia: 81,
    icone: 'fa-solid fa-file-pdf',
    classeIcone: 'result-card__icon--pdf'
  },
  {
    nome: 'pesquisa-inteligente.component.ts',
    local: 'Nova Explorer',
    tipo: 'TypeScript',
    tamanho: '12 KB',
    descricao: 'Componente responsável pela interface e lógica da pesquisa inteligente.',
    relevancia: 79,
    icone: 'fa-solid fa-file-code',
    classeIcone: 'result-card__icon--code'
  },
  {
    nome: 'novi-assistant.component.ts',
    local: 'Nova Explorer',
    tipo: 'TypeScript',
    tamanho: '9 KB',
    descricao: 'Componente responsável pelas interações do assistente Novi.',
    relevancia: 77,
    icone: 'fa-solid fa-file-code',
    classeIcone: 'result-card__icon--code'
  },
  {
    nome: 'README_Projeto.md',
    local: 'Projetos',
    tipo: 'Markdown',
    tamanho: '18 KB',
    descricao: 'Informações, instruções e documentação do projeto.',
    relevancia: 74,
    icone: 'fa-brands fa-markdown',
    classeIcone: 'result-card__icon--code'
  },
  {
    nome: 'Apresentacao_Nova_Explorer.pptx',
    local: 'Projetos',
    tipo: 'PowerPoint',
    tamanho: '8,6 MB',
    descricao: 'Apresentação utilizada para demonstrar o projeto Nova Explorer.',
    relevancia: 72,
    icone: 'fa-solid fa-file-powerpoint',
    classeIcone: 'result-card__icon--presentation'
  },
  {
    nome: 'Foto_Evento_Faculdade.jpg',
    local: 'Imagens',
    tipo: 'JPG',
    tamanho: '2,9 MB',
    descricao: 'Imagem registrada durante um evento da faculdade.',
    relevancia: 68,
    icone: 'fa-solid fa-file-image',
    classeIcone: 'result-card__icon--image'
  },
  {
    nome: 'Trabalho_Contabilidade.xlsx',
    local: 'Faculdade',
    tipo: 'Excel',
    tamanho: '742 KB',
    descricao: 'Planilha utilizada em atividade acadêmica de Contabilidade.',
    relevancia: 65,
    icone: 'fa-solid fa-file-excel',
    classeIcone: 'result-card__icon--spreadsheet'
  },
  {
    nome: 'Anotacoes_Aula.txt',
    local: 'Faculdade',
    tipo: 'TXT',
    tamanho: '14 KB',
    descricao: 'Anotações gerais realizadas durante as aulas.',
    relevancia: 61,
    icone: 'fa-solid fa-file-lines',
    classeIcone: 'result-card__icon--text'
  },
  {
    nome: 'Mockup_Tela_Perfil.png',
    local: 'Projetos',
    tipo: 'PNG',
    tamanho: '4,2 MB',
    descricao: 'Protótipo visual da tela de perfil do projeto.',
    relevancia: 58,
    icone: 'fa-solid fa-file-image',
    classeIcone: 'result-card__icon--image'
  }
];

  private readonly noviEffect = effect(() => {

    const action =
      this.noviCommunication.searchAction$();

    if (!action) {
      return;
    }

    setTimeout(() => {

      if (action === 'focus-search') {
        this.focarCampoPesquisa();
      }

      if (action === 'suggestion-search') {
        this.selecionarSugestaoAleatoria();
      }

      this.noviCommunication.clearSearchAction();

    });

  });



 protected realizarPesquisa(event?: Event): void {
  event?.preventDefault();

  const consultaOriginal = this.query.trim();

  if (!consultaOriginal) {
    this.focarCampoPesquisa();
    return;
  }

  const consulta = this.normalizar(consultaOriginal);

  this.query = consultaOriginal;
  this.pesquisaRealizada = true;

  let resultadosEncontrados: ResultadoPesquisa[];

  if (
    consulta.includes('faculdade') ||
    consulta.includes('estudos') ||
    consulta.includes('academico') ||
    consulta.includes('academica')
  ) {
    resultadosEncontrados = this.resultados
      .filter(resultado =>
        this.normalizar(resultado.local) === 'faculdade'
      )
      .map(resultado => ({
        ...resultado,
        relevancia: 100
      }));

  } else if (
    consulta.includes('recente') ||
    consulta.includes('recentes') ||
    consulta.includes('modificado') ||
    consulta.includes('modificados')
  ) {
    resultadosEncontrados = [...this.resultados]
      .sort((a, b) =>
        b.relevancia - a.relevancia
      );

  } else if (
    consulta.includes('imagem') ||
    consulta.includes('imagens') ||
    consulta.includes('foto') ||
    consulta.includes('fotos')
  ) {
    resultadosEncontrados = this.resultados
      .filter(resultado =>
        resultado.classeIcone ===
        'result-card__icon--image'
      )
      .map(resultado => ({
        ...resultado,
        relevancia: 100
      }));

  } else {
    resultadosEncontrados =
      this.buscarResultados(consulta);
  }

  this.resultadosFiltrados =
    resultadosEncontrados;

  this.noviCommunication.sendSearchMessage(
    resultadosEncontrados.length > 0
      ? `Encontrei ${resultadosEncontrados.length} arquivo(s) para: “${this.query}”. 🔎`
      : `Não encontrei arquivos para: “${this.query}”. 🔎`,
    resultadosEncontrados.length > 0
      ? 'excited'
      : 'sad',
    resultadosEncontrados.length > 0
      ? 'Pesquisa concluída'
      : 'Nenhum resultado'
  );
}

protected selecionarSugestao(
  consulta: string
): void {
  this.query = consulta;
  this.realizarPesquisa();
}

private selecionarSugestaoAleatoria(): void {
  if (!this.sugestoes.length) {
    this.noviCommunication.sendSearchMessage(
      'Ainda não encontrei sugestões nesta tela. 😺',
      'surprise'
    );

    return;
  }

  const indice = Math.floor(
    Math.random() * this.sugestoes.length
  );

  const consulta =
    this.sugestoes[indice];

  this.query = consulta;

  this.realizarPesquisa();

  this.noviCommunication.sendSearchMessage(
    'Que tal pesquisar isso? Já coloquei a sugestão para você! ✨',
    'excited',
    'Novi recomenda'
  );
}

private buscarResultados(
  consulta: string
): ResultadoPesquisa[] {
  const termos = consulta
    .split(/\s+/)
    .filter(termo => termo.length > 2);

  return this.resultados
    .map(resultado => {
      const texto = this.normalizar(
        [
          resultado.nome,
          resultado.local,
          resultado.tipo,
          resultado.descricao
        ].join(' ')
      );

      const correspondencias =
        termos.filter(termo =>
          texto.includes(termo)
        ).length;

      const relevancia =
        termos.length > 0
          ? Math.round(
              (correspondencias / termos.length) *
              100
            )
          : 0;

      return {
        resultado,
        relevancia
      };
    })
    .filter(item =>
      item.relevancia > 0
    )
    .sort(
      (a, b) =>
        b.relevancia - a.relevancia
    )
    .map(item => ({
      ...item.resultado,
      relevancia: item.relevancia
    }));
}

private normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}


  @HostListener('document:keydown', ['$event'])
  protected handleKeyboardShortcut(
    event: KeyboardEvent
  ): void {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === 'k'
    ) {

      event.preventDefault();

      this.focarCampoPesquisa();
    }
  }


  private focarCampoPesquisa(): void {

    setTimeout(() => {

      const input = document.getElementById(
        'smartSearchInput'
      ) as HTMLInputElement | null;

      input?.focus();

      input?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

    });
  }
}
