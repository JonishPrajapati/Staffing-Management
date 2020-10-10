import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private api: WebapiService) { }
  transactionAdd(json:any): Observable<any>{
    return this.api.post('transaction/TransactionAdd',json)
  }
  transactionDetails(){
   return this.api.get('transaction/GetTransactionDetails')
  }
  transactionUpdate(json:any){
   return this.api.post('transaction/TransactionUpdate',json)
  }
}
