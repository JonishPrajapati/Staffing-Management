import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

constructor(private api: WebapiService) { }
jobAdd(json:any): Observable<any>{
  return this.api.post('job/JobAdd',json)
}
jobDetails(){
 return this.api.get('job/GetJobDetails')
}
jobUpdate(json:any){
 return this.api.post('job/JobUpdate',json)
}
}
