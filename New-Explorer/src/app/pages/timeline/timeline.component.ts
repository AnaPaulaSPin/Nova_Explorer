import { Component } from '@angular/core';
import { PageShellComponent } from '../../shared/page-shell/page-shell.component';

@Component({
  selector: 'app-timeline',
  imports: [PageShellComponent],
  template: '<app-page-shell title="Timeline" />'
})
export class TimelineComponent {}
