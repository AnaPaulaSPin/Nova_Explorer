import { Injectable, signal } from '@angular/core';

export type NoviSearchAction =
  | 'focus-search'
  | 'suggestion-search';

export interface NoviSearchMessage {
  readonly message: string;
  readonly reaction:
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
  readonly title: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoviCommunicationService {

  private readonly searchAction = signal<NoviSearchAction | null>(null);

  private readonly searchMessage =
    signal<NoviSearchMessage | null>(null);

  readonly searchAction$ = this.searchAction.asReadonly();

  readonly searchMessage$ = this.searchMessage.asReadonly();

  requestSearchFocus(): void {
    this.searchAction.set('focus-search');
  }

  requestSuggestionSearch(): void {
    this.searchAction.set('suggestion-search');
  }

  sendSearchMessage(
    message: string,
    reaction: NoviSearchMessage['reaction'] = 'normal',
    title = 'Novi'
  ): void {
    this.searchMessage.set({
      message,
      reaction,
      title
    });
  }

  clearSearchAction(): void {
    this.searchAction.set(null);
  }

  clearSearchMessage(): void {
    this.searchMessage.set(null);
  }
}
