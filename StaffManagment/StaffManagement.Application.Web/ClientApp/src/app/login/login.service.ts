import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebapiService } from 'src/core/services/webapi.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private api: WebapiService) { }
getLogin(json: any): Observable<any> {
  return this.api.post('account/UserLogin', json);
}
getUserDetail(UserId): Observable<any>{
  return this.api.get('account/GetDetails', JSON.stringify({UserId : UserId}));
}
}
