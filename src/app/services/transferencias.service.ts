import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transferencia } from '../models/transferencias.model';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {

  private url: string = 'http://localhost:3000/transferencias';
  transfers: Transferencia[] = [];

  private transfersDataSource: BehaviorSubject<Transferencia[]> = new BehaviorSubject<Transferencia[]>([]);
  transfersData = this.transfersDataSource.asObservable();

  constructor(
    private httpClient: HttpClient
  ){
    this.getTransferencias().subscribe({
      next: (result) => {
        this.transfers = result;
        this.transfersDataSource.next(this.transfers);
      }
    });
  }

  transferir(transferencia: Transferencia): Observable<Transferencia> {
    this.hydrate(transferencia);
    this.transfersDataSource.next([...this.transfersDataSource.getValue(), transferencia])
    return this.httpClient.post<Transferencia>(this.url, transferencia);
  }

  getTransferencias(): Observable<Transferencia[]> {
    return this.httpClient.get<Transferencia[]>(this.url);
  }

  private hydrate(transferencia: Transferencia): void {
    transferencia.data = new Date();
  }

}
