import { TransferenciasService } from './../services/transferencias.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss'],
})
export class NovaTransferenciaComponent {

  valor: number;
  destino: number;

  constructor(private transferenciasService: TransferenciasService) {}

  transferir() {
    const valorEmitir = { valor: this.valor, destino: this.destino };
    this.transferenciasService.transferir(valorEmitir).subscribe({
      next: (result) => {
        console.log(result);
        this.limparCampos();
      },
      error: (error) => console.error(error),
    });
  }

  limparCampos(): void {
    this.valor = 0;
    this.destino = 0;
  }
}
