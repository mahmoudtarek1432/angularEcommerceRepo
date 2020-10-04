import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cartItem } from 'src/app/shared/sharedvariables/cartItem';
import { UserManagerResponse } from 'src/app/shared/sharedvariables/userManagerResponse';
import { Globals } from 'src/app/shared/globals';
import { global } from '@angular/compiler/src/util';
import { JsonManagerResponse } from '../../shared/sharedvariables/JsonManagerResponse'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient,private globals: Globals) { }

  addToCart(productId:number, quantity:number):Observable<UserManagerResponse>{
    var body = {
      ProductId: productId,
      InCartQuantity: quantity
    }
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/Cart/AddToCart", body, {headers: this.globals.headers, withCredentials: true});
  }

  getCartItems():Observable<JsonManagerResponse<cartItem[]>>{
    return this.http.get<JsonManagerResponse<cartItem[]>>(this.globals.baseUrl+"api/Cart", {headers: this.globals.headers, withCredentials: true});
  }
  removeCartItem(productId: number):Observable<UserManagerResponse>{
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/Cart/Remove/"+productId, {temp:0}, {headers: this.globals.headers, withCredentials: true});
  }
  updateCartItem(productId:number, quantity:number):Observable<UserManagerResponse>{
    return this.http.post<UserManagerResponse>(this.globals.baseUrl+"api/Cart/Update/"+productId+"/"+quantity, {temp:0}, {headers: this.globals.headers, withCredentials: true});
  }
}
