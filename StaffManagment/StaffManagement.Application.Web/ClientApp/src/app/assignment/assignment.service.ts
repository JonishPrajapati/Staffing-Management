import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private api: WebapiService) { }

  assignmentAdd(json:any): Observable<any>{
     return this.api.post('assignment/AssignmentAdd',json)
  }
  assignmentDetails(){
    return this.api.get('assignment/GetAssignmentDetails')
  }
  assignmentUpdate(json:any){
    return this.api.post('assignment/AssignmentUpdate',json)
  }
}
