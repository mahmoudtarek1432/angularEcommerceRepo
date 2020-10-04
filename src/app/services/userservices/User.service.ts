import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { observable, Observable } from 'rxjs'
import { Globals } from 'src/app/shared/globals';
import { UserManagerResponse } from 'src/app/shared/sharedvariables/userManagerResponse';
import { RequestOptions } from '@angular/http';
import { Product } from 'src/app/shared/sharedvariables/product';
import { minifiedItem } from 'src/app/shared/sharedvariables/savedItem';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private globals:Globals) { }

  PostUserLogin(Email: string, password: string): Observable<UserManagerResponse>{

    var body = {
      Email: Email,
      Password: password
    }
    console.log(this.globals.baseUrl+'api/Auth/Login')
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+'api/Auth/Login',body,{headers:this.globals.headers, withCredentials:true});
  }

  checkUserAuthentication(): Observable<UserManagerResponse>{
    return this.http.get<UserManagerResponse>(this.globals.baseUrl+"api/Auth/CheckAuth",{headers:this.globals.headers, withCredentials:true});
  }

  GetUserLogout():Observable<UserManagerResponse>{

    return this.http.get<UserManagerResponse>(this.globals.baseUrl+"api/Auth/Logout",{headers:this.globals.headers, withCredentials:true});
  }

  PostChangePassword(currentPassword: string, newPassword: string):Observable<UserManagerResponse>{

    var body = {
      currentPassword: currentPassword,
      newPassword: newPassword
    }
    
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/Auth/ChangePassword",body,{headers:this.globals.headers, withCredentials:true});
  }

  UpdateUserInfo(UserInfo):Observable<UserManagerResponse>{
    return  this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/Auth/EditInfo",UserInfo,{headers:this.globals.headers, withCredentials:true});
  }
}
