import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders, OrderProduct, OrderDetails } from '../../shared/sharedvariables/orders';
import { HttpClient } from '@angular/common/http'
import { Globals } from '../../shared/globals'

@Injectable({
  providedIn: 'root'
})
export class Orderservice {

  constructor(private http: HttpClient, private globals: Globals) { }

  getOrders():Observable<Orders[]>{
    return this.http.get<Orders[]>(this.globals.baseUrl+'api/Order/OrdersList',{headers: this.globals.headers, withCredentials: true});
  }

  getOrderProducts(OrderId: number):Observable<OrderProduct[]>{
    return this.http.get<OrderProduct[]>(this.globals.baseUrl+'api/Order/OrderProducts/'+OrderId,{headers: this.globals.headers, withCredentials: true});
  }

  getOrderDetails(OrderId: number):Observable<OrderDetails>{
    return this.http.get<OrderDetails>(this.globals.baseUrl+'api/Order/OrderDetails/'+OrderId,{headers: this.globals.headers, withCredentials: true});
  }
}
