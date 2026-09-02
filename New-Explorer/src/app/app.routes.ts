import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'pagina-inicial'
	},
	{
		path: 'pagina-inicial',
		title: 'Página Inicial - Nova Explorer',
		loadComponent: () => import('./pages/pagina-inicial/pagina-inicial.component').then((m) => m.PaginaInicialComponent)
	},
	{
		path: 'galeria',
		title: 'Galeria - Nova Explorer',
		loadComponent: () => import('./pages/galeria/galeria.component').then((m) => m.GaleriaComponent)
	},
	{
		path: 'meus-arquivos',
		title: 'Meus Arquivos - Nova Explorer',
		loadComponent: () => import('./pages/meus-arquivos/meus-arquivos.component').then((m) => m.MeusArquivosComponent)
	},
	{
		path: 'pesquisa-inteligente',
		title: 'Pesquisa Inteligente - Nova Explorer',
		loadComponent: () => import('./pages/pesquisa-inteligente/pesquisa-inteligente.component').then((m) => m.PesquisaInteligenteComponent)
	},
	{
		path: 'tags',
		title: 'Tags - Nova Explorer',
		loadComponent: () => import('./pages/tags/tags.component').then((m) => m.TagsComponent)
	},
	{
		path: 'timeline',
		title: 'Timeline - Nova Explorer',
		loadComponent: () => import('./pages/timeline/timeline.component').then((m) => m.TimelineComponent)
	},
	{
		path: '**',
		redirectTo: 'pagina-inicial'
	}
];
