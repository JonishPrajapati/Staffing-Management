import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

constructor(private api: WebapiService) { }

    invoiceAdd(json:any): Observable<any>{
      return this.api.post('invoice/InvoiceAdd',json)
    }

    invoiceDetails(){
      return this.api.get('invoice/GetInvoiceDetail')
    }
    singleInvoiceDetails(invoiceId): Observable<any>{
      return this.api.fetch('invoice/GenerateSingleInvoice',invoiceId);
    }
}
