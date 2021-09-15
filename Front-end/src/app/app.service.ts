import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface InternalStateType {
  [key: string]: any
}
@Injectable({
  providedIn: 'root'
})
export class AppService {
  _state: InternalStateType = { };
  userObject:any;  

  constructor() { }

  public setuserObject(data: any) {
    if (data) {
       this.userObject = data;
    }
}

  public getuserObject(): Observable<any> {
    return this.userObject;
 }
}
