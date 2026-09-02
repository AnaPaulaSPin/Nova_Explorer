import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageShellComponent } from '../../shared/page-shell/page-shell.component';

import {
    ANIMAIS_GALERIA,
    MIDIAS_GALERIA,
    PESSOAS_GALERIA,
    MidiaGaleria,
    AnimalGaleria
} from '../../shared/data/galeria.mock';


type FiltroGaleria = 'all' | 'photo' | 'video';

type OrdenacaoGaleria = 'recent' | 'oldest' | 'name';


interface GrupoData {
    readonly chave: string;
    readonly titulo: string;
    readonly itens: readonly MidiaGaleria[];
}


@Component({
    selector: 'app-galeria',

    imports: [
        FormsModule,
        PageShellComponent
    ],

    templateUrl: './galeria.component.html',
    styleUrl: './galeria.component.css'
})
export class GaleriaComponent {

    /* =========================================================
       DADOS
    ========================================================= */

    protected readonly pessoas = PESSOAS_GALERIA;

    protected readonly animaisBase = ANIMAIS_GALERIA;

    protected readonly midias = MIDIAS_GALERIA;


    /* =========================================================
       FILTROS E CONTROLES
    ========================================================= */

    protected busca = '';

    protected filtro: FiltroGaleria = 'all';

    protected ordenacao: OrdenacaoGaleria = 'recent';


    protected readonly filtros = [
        {
            valor: 'all' as const,
            label: 'Todas',
            icone: ''
        },
        {
            valor: 'photo' as const,
            label: 'Fotos',
            icone: 'fa-solid fa-image'
        },
        {
            valor: 'video' as const,
            label: 'Vídeos',
            icone: 'fa-solid fa-video'
        }
    ];


    /* =========================================================
       MODAL
    ========================================================= */

    protected imagemSelecionada: MidiaGaleria | null = null;


    /* =========================================================
       MÍDIAS FILTRADAS
    ========================================================= */

    protected get midiasFiltradas(): readonly MidiaGaleria[] {

        const consulta = this.normalizar(this.busca);

        let resultado = this.midias.filter((midia) => {

            const correspondeAoFiltro =
                this.filtro === 'all' ||
                midia.tipo === this.filtro;

            if (!correspondeAoFiltro) {
                return false;
            }

            if (!consulta) {
                return true;
            }

            const textoPesquisa = [
                midia.nome,
                midia.descricao,
                ...midia.pessoas,
                ...midia.animais
            ].join(' ');

            return this.normalizar(textoPesquisa)
                .includes(consulta);
        });


        resultado = [...resultado];


        /* =====================================================
           ORDENAÇÃO
        ===================================================== */

        if (this.ordenacao === 'recent') {

            return resultado.sort(
                (a, b) =>
                    new Date(b.data).getTime() -
                    new Date(a.data).getTime()
            );
        }


        if (this.ordenacao === 'oldest') {

            return resultado.sort(
                (a, b) =>
                    new Date(a.data).getTime() -
                    new Date(b.data).getTime()
            );
        }


        return resultado.sort(
            (a, b) =>
                a.nome.localeCompare(
                    b.nome,
                    'pt-BR'
                )
        );
    }


    /* =========================================================
       GRUPOS POR DATA
    ========================================================= */

    protected get gruposPorData(): readonly GrupoData[] {

        const grupos = new Map<
            string,
            MidiaGaleria[]
        >();


        for (const midia of this.midiasFiltradas) {

            const chave = this.obterChaveData(
                midia.data
            );


            if (!grupos.has(chave)) {
                grupos.set(chave, []);
            }


            grupos.get(chave)!.push(midia);
        }


        return Array.from(
            grupos.entries()
        ).map(
            ([chave, itens]) => ({
                chave,
                titulo: this.obterTituloGrupo(chave),
                itens
            })
        );
    }


    /* =========================================================
       PESSOAS
    ========================================================= */

    protected get pessoasComContagem() {

        return this.pessoas
            .map((pessoa) => {

                const totalFotos =
                    this.midias.filter(
                        (midia) =>
                            midia.tipo === 'photo' &&
                            midia.pessoas.includes(
                                pessoa.nome
                            )
                    ).length;


                return {
                    ...pessoa,
                    totalFotos
                };
            })
            .filter(
                (pessoa) =>
                    pessoa.totalFotos > 0
            );
    }


    protected get pessoasVisiveis() {
        return this.pessoasComContagem.slice(0, 5);
    }


    protected get pessoasRestantes(): number {

        return Math.max(
            0,
            this.pessoasComContagem.length - 5
        );
    }


    /* =========================================================
       ANIMAIS
    ========================================================= */

    protected get animais(): readonly AnimalGaleria[] {

        return this.animaisBase.map((animal) => {

            const quantidadeFotos =
                this.midias.filter(
                    (midia) =>
                        midia.animais.includes(
                            animal.nome
                        )
                ).length;


            return {
                ...animal,
                quantidadeFotos
            };
        });
    }


    /* =========================================================
       FILTROS
    ========================================================= */

    protected selecionarFiltro(
        filtro: FiltroGaleria
    ): void {

        this.filtro = filtro;
    }


    /* =========================================================
       ORDENAÇÃO
    ========================================================= */

    protected alterarOrdenacao(
        evento: Event
    ): void {

        const select =
            evento.target as HTMLSelectElement;

        this.ordenacao =
            select.value as OrdenacaoGaleria;
    }


    /* =========================================================
       VISUALIZAÇÃO
    ========================================================= */

    protected abrirImagem(
        midia: MidiaGaleria
    ): void {

        this.imagemSelecionada = midia;
    }


    protected fecharImagem(): void {

        this.imagemSelecionada = null;
    }


    /* =========================================================
       DATAS
    ========================================================= */

    private obterChaveData(
        data: string
    ): string {

        const dataMidia = new Date(data);

        const hoje = new Date();


        if (
            this.mesmoDia(
                dataMidia,
                hoje
            )
        ) {

            return 'hoje';
        }


        const ontem = new Date(hoje);

        ontem.setDate(
            hoje.getDate() - 1
        );


        if (
            this.mesmoDia(
                dataMidia,
                ontem
            )
        ) {

            return 'ontem';
        }


        return `${dataMidia.getFullYear()}-${String(
            dataMidia.getMonth() + 1
        ).padStart(2, '0')}`;
    }


    private obterTituloGrupo(
        chave: string
    ): string {

        if (chave === 'hoje') {
            return 'Hoje';
        }


        if (chave === 'ontem') {
            return 'Ontem';
        }


        const [ano, mes] =
            chave.split('-').map(Number);


        const data = new Date(
            ano,
            mes - 1,
            1
        );


        const titulo =
            data.toLocaleDateString(
                'pt-BR',
                {
                    month: 'long',
                    year: 'numeric'
                }
            );


        return titulo.charAt(0).toUpperCase()
            + titulo.slice(1);
    }


    private mesmoDia(
        primeiraData: Date,
        segundaData: Date
    ): boolean {

        return (
            primeiraData.getFullYear() ===
                segundaData.getFullYear() &&

            primeiraData.getMonth() ===
                segundaData.getMonth() &&

            primeiraData.getDate() ===
                segundaData.getDate()
        );
    }


    /* =========================================================
       PESQUISA
    ========================================================= */

    private normalizar(
        texto: string
    ): string {

        return texto
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase();
    }
}
