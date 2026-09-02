import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  effect,
  inject
} from '@angular/core';

import { Router } from '@angular/router';

import { NoviCommunicationService } from './service/novi-communication.service';

type NoviReaction =
  | 'normal'
  | 'attention'
  | 'interaction'
  | 'happy'
  | 'sad'
  | 'wave'
  | 'jump'
  | 'spin'
  | 'surprise'
  | 'excited';

type NoviAction =
  | 'search'
  | 'tip'
  | 'suggestion'
  | 'files'
  | 'tags'
  | 'shortcut'
  | 'mood'
  | 'surprise';

interface NoviOption {
  readonly action: NoviAction;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

interface MoodReaction {
  readonly reaction: NoviReaction;
  readonly message: string;
  readonly title: string;
}

@Component({
  selector: 'app-novi-assistant',
  templateUrl: './novi-assistant.component.html',
  styleUrl: './novi-assistant.component.css'
})
export class NoviAssistantComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);

  private readonly noviCommunication = inject(
    NoviCommunicationService
  );

  protected isOpen = false;
  protected message = '';
  protected messageTitle = 'Novi';
  protected showMessage = false;
  protected reaction: NoviReaction = 'normal';

  private moodIndex = 0;

  private readonly moodReactions: readonly MoodReaction[] = [
    {
      reaction: 'normal',
      message: 'Estou pronto para ajudar!',
      title: 'Humor do Novi'
    },
    {
      reaction: 'happy',
      message: 'Hoje eu estou muito feliz! 😸',
      title: 'Humor do Novi'
    },
    {
      reaction: 'sad',
      message: 'Acho que preciso de um carinho... 😿',
      title: 'Humor do Novi'
    },
    {
      reaction: 'surprise',
      message: 'Uau! Eu fiquei surpreso! ✨',
      title: 'Humor do Novi'
    },
    {
      reaction: 'excited',
      message: 'Estou cheio de energia! 🎉',
      title: 'Humor do Novi'
    }
  ];

  protected readonly options: readonly NoviOption[] = [
    {
      action: 'search',
      title: 'Pesquisar',
      description: 'Encontrar um arquivo',
      icon: 'fa-solid fa-magnifying-glass'
    },
    {
      action: 'tip',
      title: 'Dica de pesquisa',
      description: 'Aprender um jeito mais rápido',
      icon: 'fa-regular fa-lightbulb'
    },
    {
      action: 'suggestion',
      title: 'Dar uma sugestão',
      description: 'Ver uma pesquisa pronta',
      icon: 'fa-solid fa-wand-magic-sparkles'
    },
    {
      action: 'files',
      title: 'Meus arquivos',
      description: 'Acessar seus documentos',
      icon: 'fa-regular fa-folder'
    },
    {
      action: 'tags',
      title: 'Tags',
      description: 'Organizar e filtrar',
      icon: 'fa-solid fa-tags'
    },
    {
      action: 'shortcut',
      title: 'Atalho rápido',
      description: 'Usar Ctrl + K para pesquisar',
      icon: 'fa-solid fa-keyboard'
    },
    {
      action: 'mood',
      title: 'Mudar meu humor',
      description: 'Veja o Novi reagir',
      icon: 'fa-regular fa-face-smile'
    },
    {
      action: 'surprise',
      title: 'Surpresa',
      description: 'Descubra uma reação',
      icon: 'fa-solid fa-gift'
    }
  ];


  private speechTimer?: ReturnType<typeof setTimeout>;
  private idleTimer?: ReturnType<typeof setTimeout>;

private readonly noviMessageEffect = effect(() => {
  const message =
    this.noviCommunication.searchMessage$();

  console.log('Novi recebeu:', message);

  if (!message) {
    return;
  }

  this.speak(
    message.message,
    message.reaction,
    message.title
  );

  this.noviCommunication.clearSearchMessage();
});

  ngOnInit(): void {
    setTimeout(() => {
      this.speak(
        'Oi! Eu sou o Novi. Clique em mim para descobrir o que eu posso fazer! 🐾',
        'happy'
      );

      this.resetIdleTimer();
    }, 900);
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  protected handleCharacterClick(): void {
    this.showMessage = false;

    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }

    this.resetIdleTimer();
  }

  protected handleCharacterDoubleClick(
    event: MouseEvent
  ): void {
    event.preventDefault();

    this.closeMenu();

    this.speak(
      'MIAU! Você descobriu meu truque secreto! ✨',
      'spin',
      'Novi surpresa'
    );
  }

  protected handleMouseEnter(): void {
    if (!this.isOpen) {
      this.speak(
        'Oi! Clique em mim para abrir minhas opções. 🐱',
        'attention'
      );
    }

    this.resetIdleTimer();
  }

  protected closeMessage(): void {
    this.showMessage = false;
    this.resetIdleTimer();
  }

  protected handleAction(action: NoviAction): void {
    switch (action) {
      case 'search':
        this.closeMenu();

        this.speak(
          'Vamos pesquisar! Escreva o que você está procurando. 🔎',
          'jump'
        );

        this.noviCommunication.requestSearchFocus();

        void this.router.navigate([
          '/pesquisa-inteligente'
        ]);

        break;

      case 'tip':
        this.closeMenu();

        this.speak(
          'Dica: você pode escrever algo como ‘arquivos PDF sobre redes de 2025’. Eu consigo entender a descrição. 💡',
          'happy',
          'Dica do Novi'
        );

        break;

      case 'suggestion':
        this.closeMenu();

        this.noviCommunication.requestSuggestionSearch();

        void this.router.navigate([
          '/pesquisa-inteligente'
        ]);

        break;

      case 'files':
        this.closeMenu();

        this.speak(
          'Vamos para seus arquivos! 📁',
          'jump'
        );

        this.navigateAfterMessage('/meus-arquivos');

        break;

      case 'tags':
        this.closeMenu();

        this.speak(
          'As tags deixam seus arquivos muito mais fáceis de encontrar! 🏷️',
          'wave'
        );

        this.navigateAfterMessage('/tags');

        break;

      case 'shortcut':
        this.closeMenu();

        this.speak(
          'Aperte Ctrl + K e eu levo você direto para a pesquisa. ⌨️',
          'happy',
          'Atalho rápido'
        );

        break;

      case 'mood':
        this.closeMenu();
        this.advanceMood();
        break;

      case 'surprise':
        this.closeMenu();

        this.speak(
          this.randomSurprise(),
          'jump',
          'Novi surpresa'
        );

        break;
    }

    this.resetIdleTimer();
  }

  @HostListener('document:click', ['$event'])
  protected closeWhenClickingOutside(
    event: Event
  ): void {
    if (
      this.isOpen &&
      event.target instanceof Node &&
      !event.target.parentElement?.closest(
        '.novi-assistant'
      )
    ) {
      this.closeMenu();
    }
  }

  private openMenu(): void {
    this.isOpen = true;
    this.reaction = 'interaction';
  }

  private closeMenu(): void {
    this.isOpen = false;
    this.reaction = 'normal';
  }

  private advanceMood(): void {
    this.moodIndex =
      (this.moodIndex + 1) %
      this.moodReactions.length;

    const mood =
      this.moodReactions[this.moodIndex];

    this.speak(
      mood.message,
      mood.reaction,
      mood.title
    );
  }

  private speak(
    message: string,
    reaction: NoviReaction = 'normal',
    title = 'Novi'
  ): void {
    this.message = message;
    this.messageTitle = title;
    this.showMessage = true;
    this.reaction = reaction;

    if (this.speechTimer) {
      clearTimeout(this.speechTimer);
    }

    this.speechTimer = setTimeout(() => {
      if (!this.isOpen) {
        this.showMessage = false;
      }
    }, 5000);
  }

  private resetIdleTimer(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    this.idleTimer = setTimeout(() => {
      if (!this.isOpen) {
        this.speak(
          'Pssiu... estou aqui se você precisar de mim! 💜',
          'attention'
        );
      }
    }, 25000);
  }

  private navigateAfterMessage(path: string): void {
    setTimeout(() => {
      void this.router.navigate([path]);
    }, 700);
  }

  private randomSurprise(): string {
    const responses = [
      'Miau! Você encontrou uma interação secreta! 🎉',
      'Eu tenho 9 vidas... e várias dicas! 🐾',
      'Procure por mim quando precisar de ajuda. 💜',
      'Segredo: o Ctrl + K é meu atalho favorito! ✨'
    ];

    const randomValue =
      crypto.getRandomValues(
        new Uint32Array(1)
      )[0];

    return responses[
      randomValue % responses.length
    ];
  }

  private clearTimers(): void {
    if (this.speechTimer) {
      clearTimeout(this.speechTimer);
    }

    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
  }
}
