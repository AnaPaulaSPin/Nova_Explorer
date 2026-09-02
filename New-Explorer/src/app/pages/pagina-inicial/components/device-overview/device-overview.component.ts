import { Component } from '@angular/core';

interface DeviceSummary {
  readonly name: string;
  readonly files: string;
  readonly usage: string;
  readonly status: string;
  readonly percent: number;
  readonly icon: string;
  readonly className: string;
}

@Component({
  selector: 'app-device-overview',
  templateUrl: './device-overview.component.html',
  styleUrl: './device-overview.component.css'
})
export class DeviceOverviewComponent {
  protected readonly devices: readonly DeviceSummary[] = [
    { name: 'Meu computador', files: '428 arquivos', usage: '62% utilizado', status: 'Online', percent: 62, icon: 'fa-solid fa-laptop', className: 'computer' },
    { name: 'Meu celular', files: '183 arquivos', usage: '38% utilizado', status: 'Online', percent: 38, icon: 'fa-solid fa-mobile-screen', className: 'phone' },
    { name: 'Minha nuvem', files: '1.204 arquivos', usage: '74% utilizado', status: 'Sincronizado', percent: 74, icon: 'fa-solid fa-cloud', className: 'cloud' }
  ];
}
