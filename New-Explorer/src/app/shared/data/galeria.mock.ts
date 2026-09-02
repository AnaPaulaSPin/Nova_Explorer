export interface PessoaGaleria {
  readonly id: number;
  readonly nome: string;
  readonly foto: string;
  readonly quantidadeFotos: number;
}

export interface AnimalGaleria {
  readonly id: number;
  readonly nome: string;
  readonly icone: string;
  readonly classeIcone: string;
  readonly quantidadeFotos: number;
}

export interface MidiaGaleria {
  readonly id: number;
  readonly nome: string;
  readonly tipo: 'photo' | 'video';
  readonly url: string;
  readonly data: string;
  readonly descricao: string;
  readonly pessoas: readonly string[];
  readonly animais: readonly string[];
  readonly duracao?: string;
}

export const PESSOAS_GALERIA: readonly PessoaGaleria[] = [
  {
    id: 1,
    nome: 'Pessoa 1',
    foto: 'https://randomuser.me/api/portraits/women/44.jpg',
    quantidadeFotos: 24
  },
  {
    id: 2,
    nome: 'Pessoa 2',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
    quantidadeFotos: 18
  },
  {
    id: 3,
    nome: 'Pessoa 3',
    foto: 'https://randomuser.me/api/portraits/women/65.jpg',
    quantidadeFotos: 15
  },
  {
    id: 4,
    nome: 'Pessoa 4',
    foto: 'https://randomuser.me/api/portraits/men/52.jpg',
    quantidadeFotos: 11
  },
  {
    id: 5,
    nome: 'Pessoa 5',
    foto: 'https://randomuser.me/api/portraits/women/33.jpg',
    quantidadeFotos: 8
  }
];

export const ANIMAIS_GALERIA: readonly AnimalGaleria[] = [
  {
    id: 1,
    nome: 'Cachorros',
    icone: 'fa-solid fa-dog',
    classeIcone: 'dog',
    quantidadeFotos: 36
  },
  {
    id: 2,
    nome: 'Gatos',
    icone: 'fa-solid fa-cat',
    classeIcone: 'cat',
    quantidadeFotos: 21
  },
  {
    id: 3,
    nome: 'Outros animais',
    icone: 'fa-solid fa-dove',
    classeIcone: 'bird',
    quantidadeFotos: 9
  }
];

export const MIDIAS_GALERIA: readonly MidiaGaleria[] = [
  {
    id: 1,
    nome: 'Faculdade',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-02T09:30:00',
    descricao: 'Foto de pessoas estudando',
    pessoas: ['Pessoa 1', 'Pessoa 2'],
    animais: []
  },
  {
    id: 2,
    nome: 'Viagem',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-02T08:15:00',
    descricao: 'Paisagem durante uma viagem',
    pessoas: [],
    animais: []
  },
  {
    id: 3,
    nome: 'Vídeo viagem',
    tipo: 'video',
    url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-02T07:40:00',
    descricao: 'Vídeo de viagem',
    pessoas: [],
    animais: [],
    duracao: '00:42'
  },
  {
    id: 4,
    nome: 'Natureza',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-02T06:20:00',
    descricao: 'Foto de natureza',
    pessoas: [],
    animais: []
  },
  {
    id: 5,
    nome: 'Cidade',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-02T05:50:00',
    descricao: 'Foto da cidade',
    pessoas: [],
    animais: []
  },
  {
    id: 6,
    nome: 'Praia',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-02T04:30:00',
    descricao: 'Foto de praia',
    pessoas: [],
    animais: []
  },
  {
    id: 7,
    nome: 'Cachorro',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-01T18:20:00',
    descricao: 'Cachorro',
    pessoas: [],
    animais: ['Cachorros']
  },
  {
    id: 8,
    nome: 'Gato',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-01T16:10:00',
    descricao: 'Gato',
    pessoas: [],
    animais: ['Gatos']
  },
  {
    id: 9,
    nome: 'Pet cachorro',
    tipo: 'video',
    url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-01T14:45:00',
    descricao: 'Vídeo de cachorro',
    pessoas: [],
    animais: ['Cachorros'],
    duracao: '01:12'
  },
  {
    id: 10,
    nome: 'Família',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80',
    data: '2026-09-01T12:30:00',
    descricao: 'Foto de família',
    pessoas: ['Pessoa 1', 'Pessoa 3'],
    animais: []
  },
  {
    id: 11,
    nome: 'Paisagem',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80',
    data: '2026-08-27T15:30:00',
    descricao: 'Paisagem',
    pessoas: [],
    animais: []
  },
  {
    id: 12,
    nome: 'Montanha',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80',
    data: '2026-08-26T14:20:00',
    descricao: 'Montanhas',
    pessoas: [],
    animais: []
  },
  {
    id: 13,
    nome: 'Floresta',
    tipo: 'photo',
    url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=80',
    data: '2026-08-25T10:40:00',
    descricao: 'Floresta',
    pessoas: [],
    animais: []
  },
  {
    id: 14,
    nome: 'Natureza video',
    tipo: 'video',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80',
    data: '2026-08-24T17:15:00',
    descricao: 'Vídeo de natureza',
    pessoas: [],
    animais: [],
    duracao: '00:55'
  }
];
