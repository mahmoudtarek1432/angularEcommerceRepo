import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/sharedvariables/product';
import { Globals } from 'src/app/shared/globals';
import { global } from '@angular/compiler/src/util';
import { Review } from 'src/app/shared/sharedvariables/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient, private globals:Globals) { }

  getProductById(id:number): Observable<Product>{
    return this.http.get<Product>( this.globals.baseUrl + 'api/Products/'+id,{headers: this.globals.headers,withCredentials: true});
  }

  addReview(reviewdata: Review){
    return this.http.post(this.globals.baseUrl+"api/Reviews/Add",reviewdata,{headers: this.globals.headers,withCredentials: true})
  }

  getProductAvailableQuantity(productId: number):Observable<number>{
    return this.http.get<number>(this.globals.baseUrl+"api/productQuantity/"+productId,{headers:this.globals.headers,withCredentials:true});
  }

  getProductFilters(Category):Observable<object>{
    return this.http.get<object>(this.globals.baseUrl+"api/Products/CategoryFilters/"+Category,{headers:this.globals.headers,withCredentials:true})
  }

  getProuductList(category,filters,orderby,page): Observable<Product[]>{
    return this.http.get<Product[]>(this.globals.baseUrl+"api/Products/"+orderby+"/"+category+"/"+page+"/?filters="+filters
    ,{headers:this.globals.headers,withCredentials:true});

  }
}
