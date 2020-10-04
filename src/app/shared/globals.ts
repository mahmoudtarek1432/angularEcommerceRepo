import{ Injectable } from '@angular/core'
import { observable, Observable, of, Subject } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class Globals{
    modalstatus:string = 'nottoggled';
    cartContent:number = 0;
    loggedIn:boolean = false;    
    baseUrl:string = 'http://localhost:58517/';
    headers:HttpHeaders = new HttpHeaders({
      'Access-Control-Allow-Credentials': 'true',
      'withCredentials': 'true'
    })
}
