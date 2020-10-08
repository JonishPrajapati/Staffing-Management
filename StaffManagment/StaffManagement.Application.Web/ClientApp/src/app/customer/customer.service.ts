import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

constructor(private api: WebapiService) { }

customerAdd(json:any): Observable<any>{
   return this.api.post('customer/CustomerAdd',json)
}
customerDetails(){
  return this.api.get('customer/GetCustomerDetails')
}
customerUpdate(json:any){
  return this.api.post('customer/CustomerUpdate',json)
}
}
