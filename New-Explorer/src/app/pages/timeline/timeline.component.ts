import { Component } from '@angular/core';

import { PageShellComponent } from '../../shared/page-shell/page-shell.component';

type Periodo = 'all' | 'today' | 'week' | 'month';

type TipoAlteracao =
  | 'all'
  | 'created'
  | 'modified'
  | 'deleted'
  | 'moved';

interface EventoTimeline {
  readonly nome: string;
  readonly tipoArquivo: string;
  readonly iconeArquivo: string;
  readonly classeArquivo: string;
  readonly data: string;
  readonly horario: string;
  readonly acao: TipoAlteracao;
  readonly descricao: string;
  readonly dispositivo: string;
  readonly iconeDispositivo: string;
}

@Component({
  selector: 'app-timeline',
  imports: [PageShellComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  protected periodoSelecionado: Periodo = 'all';
  protected tipoAlteracaoSelecionado: TipoAlteracao = 'all';

  protected dataSelecionada = '';

  protected readonly eventos: readonly EventoTimeline[] = [
    {
      nome: 'Projeto_Explorer.docx',
      tipoArquivo: 'Documento',
      iconeArquivo: 'fa-solid fa-file-lines',
      classeArquivo: 'document',
      data: '2026-09-02',
      horario: '14:32',
      acao: 'modified',
      descricao: 'Arquivo foi atualizado recentemente.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Resumo_Banco_de_Dados.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-09-02',
      horario: '10:32',
      acao: 'created',
      descricao: 'Novo arquivo adicionado aos seus arquivos.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Interface_Explorer.png',
      tipoArquivo: 'Imagem',
      iconeArquivo: 'fa-solid fa-file-image',
      classeArquivo: 'image',
      data: '2026-09-02',
      horario: '09:48',
      acao: 'moved',
      descricao: 'Arquivo movido de Downloads para Projetos.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'arquivos_antigos.zip',
      tipoArquivo: 'Arquivo compactado',
      iconeArquivo: 'fa-solid fa-file-zipper',
      classeArquivo: 'archive',
      data: '2026-09-01',
      horario: '08:21',
      acao: 'deleted',
      descricao: 'Arquivo removido do dispositivo.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Anotacoes_Compiladores.docx',
      tipoArquivo: 'Documento',
      iconeArquivo: 'fa-solid fa-file-lines',
      classeArquivo: 'document',
      data: '2026-09-01',
      horario: '19:15',
      acao: 'modified',
      descricao: 'Anotações da disciplina foram atualizadas.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Diagrama_Banco_Dados.png',
      tipoArquivo: 'Imagem',
      iconeArquivo: 'fa-solid fa-file-image',
      classeArquivo: 'image',
      data: '2026-08-31',
      horario: '16:42',
      acao: 'created',
      descricao: 'Nova imagem adicionada à pasta da faculdade.',
      dispositivo: 'Meu celular',
      iconeDispositivo: 'fa-solid fa-mobile-screen'
    },
    {
      nome: 'Anotacoes_Redes.txt',
      tipoArquivo: 'Documento de texto',
      iconeArquivo: 'fa-solid fa-file-lines',
      classeArquivo: 'document',
      data: '2026-08-30',
      horario: '18:24',
      acao: 'created',
      descricao: 'Novo arquivo criado.',
      dispositivo: 'Meu celular',
      iconeDispositivo: 'fa-solid fa-mobile-screen'
    },
    {
      nome: 'Banco_de_Dados.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-08-29',
      horario: '15:10',
      acao: 'modified',
      descricao: 'Arquivo atualizado.',
      dispositivo: 'Minha nuvem',
      iconeDispositivo: 'fa-solid fa-cloud'
    },
    {
      nome: 'Capa_Projeto.png',
      tipoArquivo: 'Imagem',
      iconeArquivo: 'fa-solid fa-file-image',
      classeArquivo: 'image',
      data: '2026-08-28',
      horario: '11:42',
      acao: 'moved',
      descricao: 'Arquivo organizado na pasta Projetos.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Relatorio_Redes_2.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-08-27',
      horario: '20:18',
      acao: 'modified',
      descricao: 'Relatório acadêmico recebeu novas informações.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Trabalho_Contabilidade.xlsx',
      tipoArquivo: 'Planilha',
      iconeArquivo: 'fa-solid fa-file-excel',
      classeArquivo: 'spreadsheet',
      data: '2026-08-26',
      horario: '13:07',
      acao: 'created',
      descricao: 'Planilha criada para uma atividade acadêmica.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'README_Projeto.md',
      tipoArquivo: 'Markdown',
      iconeArquivo: 'fa-brands fa-markdown',
      classeArquivo: 'document',
      data: '2026-08-24',
      horario: '17:33',
      acao: 'modified',
      descricao: 'Documentação do projeto foi atualizada.',
      dispositivo: 'Minha nuvem',
      iconeDispositivo: 'fa-solid fa-cloud'
    },
    {
      nome: 'Apresentacao_Nova_Explorer.pptx',
      tipoArquivo: 'Apresentação',
      iconeArquivo: 'fa-solid fa-file-powerpoint',
      classeArquivo: 'presentation',
      data: '2026-08-22',
      horario: '10:25',
      acao: 'created',
      descricao: 'Nova apresentação adicionada ao projeto.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Mockup_Tela_Perfil.png',
      tipoArquivo: 'Imagem',
      iconeArquivo: 'fa-solid fa-file-image',
      classeArquivo: 'image',
      data: '2026-08-20',
      horario: '14:51',
      acao: 'moved',
      descricao: 'Imagem movida para a pasta de projetos.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Pesquisa_Compiladores.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-08-18',
      horario: '09:14',
      acao: 'created',
      descricao: 'Material de estudo adicionado aos arquivos.',
      dispositivo: 'Meu celular',
      iconeDispositivo: 'fa-solid fa-mobile-screen'
    },
    {
      nome: 'Codigo_AFD.c',
      tipoArquivo: 'Código-fonte',
      iconeArquivo: 'fa-solid fa-file-code',
      classeArquivo: 'code',
      data: '2026-08-15',
      horario: '22:08',
      acao: 'modified',
      descricao: 'Código do analisador léxico foi atualizado.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Anotacoes_BD2.txt',
      tipoArquivo: 'Documento de texto',
      iconeArquivo: 'fa-solid fa-file-lines',
      classeArquivo: 'document',
      data: '2026-08-12',
      horario: '16:20',
      acao: 'created',
      descricao: 'Novas anotações da disciplina foram criadas.',
      dispositivo: 'Meu celular',
      iconeDispositivo: 'fa-solid fa-mobile-screen'
    },
    {
      nome: 'Projeto_LitFeed.zip',
      tipoArquivo: 'Arquivo compactado',
      iconeArquivo: 'fa-solid fa-file-zipper',
      classeArquivo: 'archive',
      data: '2026-08-08',
      horario: '12:44',
      acao: 'created',
      descricao: 'Backup do projeto foi criado.',
      dispositivo: 'Minha nuvem',
      iconeDispositivo: 'fa-solid fa-cloud'
    },
    {
      nome: 'Reuniao_PET_Saude.docx',
      tipoArquivo: 'Documento',
      iconeArquivo: 'fa-solid fa-file-lines',
      classeArquivo: 'document',
      data: '2026-08-05',
      horario: '18:05',
      acao: 'modified',
      descricao: 'Documento da reunião foi atualizado.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Foto_Evento_Faculdade.jpg',
      tipoArquivo: 'Imagem',
      iconeArquivo: 'fa-solid fa-file-image',
      classeArquivo: 'image',
      data: '2026-07-28',
      horario: '17:38',
      acao: 'created',
      descricao: 'Imagem adicionada à pasta de eventos.',
      dispositivo: 'Meu celular',
      iconeDispositivo: 'fa-solid fa-mobile-screen'
    },
    {
      nome: 'Resumo_Internet.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-07-25',
      horario: '09:32',
      acao: 'modified',
      descricao: 'Resumo sobre Internet e protocolos atualizado.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Exercicios_Java.java',
      tipoArquivo: 'Código-fonte',
      iconeArquivo: 'fa-solid fa-file-code',
      classeArquivo: 'code',
      data: '2026-07-20',
      horario: '21:17',
      acao: 'created',
      descricao: 'Arquivo com exercícios de programação.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Documentacao_Explorer.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-07-14',
      horario: '14:02',
      acao: 'moved',
      descricao: 'Documento organizado na pasta Projetos.',
      dispositivo: 'Minha nuvem',
      iconeDispositivo: 'fa-solid fa-cloud'
    },
    {
      nome: 'Banco_Dados_Projeto.sql',
      tipoArquivo: 'SQL',
      iconeArquivo: 'fa-solid fa-database',
      classeArquivo: 'code',
      data: '2026-07-08',
      horario: '11:36',
      acao: 'modified',
      descricao: 'Estrutura do banco de dados foi atualizada.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Planejamento_Angular.docx',
      tipoArquivo: 'Documento',
      iconeArquivo: 'fa-solid fa-file-lines',
      classeArquivo: 'document',
      data: '2026-06-25',
      horario: '15:48',
      acao: 'created',
      descricao: 'Planejamento inicial do projeto Angular.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Wireframe_Nova_Explorer.png',
      tipoArquivo: 'Imagem',
      iconeArquivo: 'fa-solid fa-file-image',
      classeArquivo: 'image',
      data: '2026-06-18',
      horario: '10:12',
      acao: 'created',
      descricao: 'Primeiro wireframe da interface do Explorer.',
      dispositivo: 'Meu computador',
      iconeDispositivo: 'fa-solid fa-laptop'
    },
    {
      nome: 'Requisitos_Projeto.pdf',
      tipoArquivo: 'PDF',
      iconeArquivo: 'fa-solid fa-file-pdf',
      classeArquivo: 'pdf',
      data: '2026-06-10',
      horario: '19:26',
      acao: 'modified',
      descricao: 'Requisitos funcionais e não funcionais foram revisados.',
      dispositivo: 'Minha nuvem',
      iconeDispositivo: 'fa-solid fa-cloud'
    }
  ];

  protected get eventosFiltrados(): readonly EventoTimeline[] {
    return this.eventos
      .filter(evento => {
        const correspondePeriodo =
          this.periodoSelecionado === 'all' ||
          this.eventoPertenceAoPeriodo(
            evento.data,
            this.periodoSelecionado
          );

        const correspondeAcao =
          this.tipoAlteracaoSelecionado === 'all' ||
          evento.acao === this.tipoAlteracaoSelecionado;

        const correspondeData =
          !this.dataSelecionada ||
          evento.data === this.dataSelecionada;

        return (
          correspondePeriodo &&
          correspondeAcao &&
          correspondeData
        );
      })
      .sort((a, b) => {
        const dataA = `${a.data}T${a.horario}`;
        const dataB = `${b.data}T${b.horario}`;

        return dataB.localeCompare(dataA);
      });
  }

  protected get quantidadeEventos(): number {
    return this.eventosFiltrados.length;
  }

  protected get quantidadeCriados(): number {
    return this.eventosFiltrados.filter(
      evento => evento.acao === 'created'
    ).length;
  }

  protected get quantidadeModificados(): number {
    return this.eventosFiltrados.filter(
      evento => evento.acao === 'modified'
    ).length;
  }

  protected get quantidadeMovidos(): number {
    return this.eventosFiltrados.filter(
      evento => evento.acao === 'moved'
    ).length;
  }

  protected get quantidadeExcluidos(): number {
    return this.eventosFiltrados.filter(
      evento => evento.acao === 'deleted'
    ).length;
  }

  protected selecionarPeriodo(periodo: Periodo): void {
    this.periodoSelecionado = periodo;
    this.dataSelecionada = '';
  }

  protected selecionarTipoAlteracao(
    event: Event
  ): void {
    const select =
      event.target as HTMLSelectElement;

    this.tipoAlteracaoSelecionado =
      select.value as TipoAlteracao;
  }

  protected selecionarData(event: Event): void {
    const input =
      event.target as HTMLInputElement;

    this.dataSelecionada = input.value;
    this.periodoSelecionado = 'all';
  }

  protected limparFiltros(): void {
    this.periodoSelecionado = 'all';
    this.tipoAlteracaoSelecionado = 'all';
    this.dataSelecionada = '';
  }

  protected formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-').map(Number);

    const dataLocal = new Date(
      ano,
      mes - 1,
      dia
    );

    return dataLocal.toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    );
  }

  protected formatarDiaSemana(data: string): string {
    const [ano, mes, dia] = data.split('-').map(Number);

    const dataLocal = new Date(
      ano,
      mes - 1,
      dia
    );

    return dataLocal.toLocaleDateString(
      'pt-BR',
      {
        weekday: 'long'
      }
    );
  }

  private eventoPertenceAoPeriodo(
    dataEvento: string,
    periodo: Periodo
  ): boolean {
    const agora = new Date();

    const [ano, mes, dia] =
      dataEvento.split('-').map(Number);

    const data = new Date(
      ano,
      mes - 1,
      dia
    );

    if (periodo === 'today') {
      return (
        data.getFullYear() === agora.getFullYear() &&
        data.getMonth() === agora.getMonth() &&
        data.getDate() === agora.getDate()
      );
    }

    if (periodo === 'week') {
      const inicioSemana = new Date(agora);
      const diaSemana = inicioSemana.getDay();

      inicioSemana.setDate(
        agora.getDate() - diaSemana
      );

      inicioSemana.setHours(0, 0, 0, 0);

      const fimSemana = new Date(
        inicioSemana
      );

      fimSemana.setDate(
        inicioSemana.getDate() + 6
      );

      fimSemana.setHours(
        23,
        59,
        59,
        999
      );

      return (
        data >= inicioSemana &&
        data <= fimSemana
      );
    }

    if (periodo === 'month') {
      return (
        data.getFullYear() === agora.getFullYear() &&
        data.getMonth() === agora.getMonth()
      );
    }

    return true;
  }
}
