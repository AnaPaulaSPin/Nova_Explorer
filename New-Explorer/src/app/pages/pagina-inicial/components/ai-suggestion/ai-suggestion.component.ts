import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ai-suggestion',
  templateUrl: './ai-suggestion.component.html',
  styleUrl: './ai-suggestion.component.css'
})
export class AiSuggestionComponent {
  private readonly router = inject(Router);

  protected openFiles(): void {
    void this.router.navigate(['/meus-arquivos']);
  }
}
