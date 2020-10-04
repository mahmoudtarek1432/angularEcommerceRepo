import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserManagerResponse } from 'src/app/shared/sharedvariables/userManagerResponse';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/shared/globals';
import { minifiedItem } from 'src/app/shared/sharedvariables/savedItem';

@Injectable({
  providedIn: 'root'
})
export class SaveditemsService {

  constructor(private http: HttpClient, private globals: Globals) { }

  addToSavedItems(productId: number):Observable<UserManagerResponse>{
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/SavedItems/AddSavedItem",productId,{headers:this.globals.headers,withCredentials: true})
  }

  RemoveFromSavedItems(productId: number):Observable<UserManagerResponse>{
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/SavedItems/RemoveSavedItem",productId,{headers:this.globals.headers,withCredentials: true})
  }

  GetSavedItems():Observable<minifiedItem[]>{
    return this.http.get<minifiedItem[]>(this.globals.baseUrl+"api/SavedItems",{headers:this.globals.headers,withCredentials: true});
  }
}
