import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageShellComponent } from '../../shared/page-shell/page-shell.component';

type FiltroTag = 'all' | 'recent' | 'most-used';

interface Tag {
    readonly id: number;
    readonly nome: string;
    readonly quantidadeArquivos: number;
    readonly icone: string;
    readonly classeIcone: string;
    readonly criadaEm: string;
}

interface ArquivoTag {
    readonly id: number;
    readonly nome: string;
    readonly tipo: 'pdf' | 'image' | 'word' | 'video';
    readonly tamanho: string;
    readonly data: string;
    readonly tags: readonly Tag[];
}

interface TagSugerida {
    readonly nome: string;
    aplicada: boolean;
}

@Component({
    selector: 'app-tags',
    imports: [
        FormsModule,
        PageShellComponent
    ],
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.css'
})
export class TagsComponent {

    /* =========================================================
       DADOS
    ========================================================= */

    protected tags: Tag[] = [
        {
            id: 1,
            nome: 'Faculdade',
            quantidadeArquivos: 24,
            icone: 'fa-graduation-cap',
            classeIcone: 'purple',
            criadaEm: '2026-08-28'
        },
        {
            id: 2,
            nome: 'Projetos',
            quantidadeArquivos: 18,
            icone: 'fa-code',
            classeIcone: 'blue',
            criadaEm: '2026-08-25'
        },
        {
            id: 3,
            nome: 'Documentos',
            quantidadeArquivos: 15,
            icone: 'fa-file-lines',
            classeIcone: 'pink',
            criadaEm: '2026-08-22'
        },
        {
            id: 4,
            nome: 'Importante',
            quantidadeArquivos: 11,
            icone: 'fa-star',
            classeIcone: 'orange',
            criadaEm: '2026-08-20'
        },
        {
            id: 5,
            nome: 'Fotos',
            quantidadeArquivos: 9,
            icone: 'fa-image',
            classeIcone: 'green',
            criadaEm: '2026-08-18'
        },
        {
            id: 6,
            nome: 'Trabalhos',
            quantidadeArquivos: 7,
            icone: 'fa-folder-open',
            classeIcone: 'cyan',
            criadaEm: '2026-08-15'
        }
    ];

    protected arquivos: ArquivoTag[] = [
        {
            id: 1,
            nome: 'Trabalho_Banco_de_Dados.pdf',
            tipo: 'pdf',
            tamanho: '2,4 MB',
            data: 'Hoje',
            tags: [
                this.tags[0],
                this.tags[3]
            ]
        },
        {
            id: 2,
            nome: 'Projeto_LitFeed.docx',
            tipo: 'word',
            tamanho: '1,8 MB',
            data: 'Ontem',
            tags: [
                this.tags[1],
                this.tags[5]
            ]
        },
        {
            id: 3,
            nome: 'Apresentacao_Compiladores.pdf',
            tipo: 'pdf',
            tamanho: '4,2 MB',
            data: '28/08/2026',
            tags: [
                this.tags[0],
                this.tags[2],
                this.tags[5]
            ]
        },
        {
            id: 4,
            nome: 'Interface_LitFeed.png',
            tipo: 'image',
            tamanho: '856 KB',
            data: '27/08/2026',
            tags: [
                this.tags[1],
                this.tags[4]
            ]
        },
        {
            id: 5,
            nome: 'Demo_Projeto.mp4',
            tipo: 'video',
            tamanho: '18,5 MB',
            data: '25/08/2026',
            tags: [
                this.tags[1],
                this.tags[3],
                this.tags[5]
            ]
        }
    ];

    protected sugestoes: TagSugerida[] = [];

    /* =========================================================
       NOVA TAG
    ========================================================= */

    protected tagModalAberto = false;
    protected nomeNovaTag = '';

    /* =========================================================
       FILTROS
    ========================================================= */

    protected filtro: FiltroTag = 'all';

    protected get tagsFiltradas(): Tag[] {
        switch (this.filtro) {

            case 'recent':
                return [...this.tags].sort((a, b) =>
                    b.criadaEm.localeCompare(a.criadaEm)
                );

            case 'most-used':
                return [...this.tags].sort((a, b) =>
                    b.quantidadeArquivos - a.quantidadeArquivos
                );

            default:
                return this.tags;
        }
    }

    /* =========================================================
       IA
    ========================================================= */

    protected analisando = false;
    protected sugestoesEncontradas = false;

    /* =========================================================
       MODAL - NOVA TAG
    ========================================================= */

    protected abrirModal(): void {
        this.tagModalAberto = true;
    }

    protected fecharModal(): void {
        this.tagModalAberto = false;
        this.nomeNovaTag = '';
    }

    /* =========================================================
       CRIAR TAG
    ========================================================= */

    protected criarTag(): void {
        const nome = this.nomeNovaTag.trim();

        if (!nome) {
            return;
        }

        const tagJaExiste = this.tags.some(
            tag => tag.nome.toLowerCase() === nome.toLowerCase()
        );

        if (tagJaExiste) {
            return;
        }

        const novaTag: Tag = {
            id: this.tags.length + 1,
            nome,
            quantidadeArquivos: 0,
            icone: 'fa-tag',
            classeIcone: 'purple',
            criadaEm: new Date().toISOString().split('T')[0]
        };

        this.tags = [
            ...this.tags,
            novaTag
        ];

        this.fecharModal();
    }

    /* =========================================================
       FECHAR MODAL CLICANDO FORA
    ========================================================= */

    protected fecharModalAoClicarFora(
        evento: MouseEvent
    ): void {
        if (evento.target === evento.currentTarget) {
            this.fecharModal();
        }
    }

    /* =========================================================
       FILTROS
    ========================================================= */

    protected selecionarFiltro(
        filtro: FiltroTag
    ): void {
        this.filtro = filtro;
    }

    /* =========================================================
       IA - ANALISAR
    ========================================================= */

    protected analisarTags(): void {
        if (this.analisando) {
            return;
        }

        this.analisando = true;
        this.sugestoesEncontradas = false;

        setTimeout(() => {
            this.sugestoes = [
                {
                    nome: 'Documentos',
                    aplicada: false
                },
                {
                    nome: 'Importante',
                    aplicada: false
                },
                {
                    nome: 'Faculdade',
                    aplicada: false
                }
            ];

            this.analisando = false;
            this.sugestoesEncontradas = true;
        }, 1200);
    }

    /* =========================================================
       ADICIONAR TAG SUGERIDA
    ========================================================= */

    protected adicionarSugestao(
        sugestao: TagSugerida
    ): void {
        if (sugestao.aplicada) {
            return;
        }

        sugestao.aplicada = true;

        const tagJaExiste = this.tags.some(
            tag =>
                tag.nome.toLowerCase() ===
                sugestao.nome.toLowerCase()
        );

        if (tagJaExiste) {
            return;
        }

        const novaTag: Tag = {
            id: this.tags.length + 1,
            nome: sugestao.nome,
            quantidadeArquivos: 0,
            icone: 'fa-tag',
            classeIcone: 'purple',
            criadaEm: new Date().toISOString().split('T')[0]
        };

        this.tags = [
            ...this.tags,
            novaTag
        ];
    }
}
