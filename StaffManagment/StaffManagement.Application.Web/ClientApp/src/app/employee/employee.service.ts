import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

constructor(private api: WebapiService) { }

    employeeAdd(json:any): Observable<any>{
      return this.api.post('employee/EmployeeAdd',json);
    }
    employeeDetails(){
      console.log("ello servuce");
      
      return this.api.get('employee/GetEmployeeDetails');
    }
    employeeUpdate(json:any): Observable<any>{
      return this.api.post('employee/EmployeeUpdate',json)
    }
}
