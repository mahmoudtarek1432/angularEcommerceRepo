import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Globals } from 'src/app/shared/globals';
import { Observable } from 'rxjs';
import { minifiedItem } from 'src/app/shared/sharedvariables/savedItem';

@Injectable({
  providedIn: 'root'
})
export class RecentlyviewedService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getRecentlyViewedItems(): Observable<minifiedItem[]>{
    return this.http.get<minifiedItem[]>(this.globals.baseUrl+"/api/History",{headers: this.globals.headers, withCredentials: true})
  }
}
