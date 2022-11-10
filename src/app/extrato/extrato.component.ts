import { Transferencia } from './../models/transferencias.model';
import { TransferenciasService } from './../services/transferencias.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {

  transferencias$: Observable<Transferencia[]>;

  constructor(
    private transferenciasService: TransferenciasService
  ){}

  ngOnInit(): void {
    this.transferencias$ = this.transferenciasService.transfersData;
  }

}
