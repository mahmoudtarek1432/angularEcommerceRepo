import { Component, OnInit } from '@angular/core';
import { cartItem } from '../shared/sharedvariables/cartItem';
import { CARTITEMS } from '../shared/sharedvariables/cartItems';
import { ThrowStmt } from '@angular/compiler';
import { CartService } from '../services/cartservices/cart.service';
import { ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Globals } from '../shared/globals';
import { CookieService } from 'ngx-cookie-service';
import { global } from '@angular/compiler/src/util';
import { ProductService } from '../services/productservices/productservices.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartIs: cartItem[];
  couponPercent:number = 9;
  totalPrice:number = 0;

  constructor(public cartService: CartService, public globals:Globals, public cookie: CookieService, private productService: ProductService) {
    if(globals.loggedIn){
      cartService.getCartItems().subscribe(result => {
        if(result.isSuccessful == true){
          this.cartIs = result.responseObject;
          this.calculateTotal()
        }
      })
    }
    else{
      var cartCookie = this.cookie.get("GuestCart");
      console.log(this.cookie.get("GuestCart"))
      if(cartCookie != ""){
        this.cartIs = JSON.parse(cartCookie);
      }
    }
   }

  ngOnInit() {
  }

  calculateTotal(){
    this.cartIs.forEach((item)=>
    this.totalPrice += item.unitePrice * item.inCartQuantity
    )
  }

  updateCartItem(productid: number, quantity:Element|any){
    if(this.globals.loggedIn){
      this.cartService.updateCartItem(productid,quantity.value).subscribe(result =>{
        if(result.isSuccessful){
          this.cartIs.forEach(c => {
            if(c.productId == productid){c.inCartQuantity = quantity.value}
          })
        }
      })
    }
    else{
      var guestcartitems:cartItem[] = JSON.parse(this.cookie.get("GuestCart"));
      this.productService.getProductAvailableQuantity(productid)
      .subscribe(result => {
        guestcartitems.forEach(c =>{ 
          if(c.productId != productid){
            c.inCartQuantity = result
        }});
        this.cookie.set("GuestCart",JSON.stringify(guestcartitems))
      });
    }
  }

  removeCartItem(productid: number){
    if(this.globals.loggedIn){
      this.cartService.removeCartItem(productid).subscribe(result =>{
        if(result.isSuccessful){
          this.cartIs = this.cartIs.filter(c => c.productId != productid);
        }
      })
    }
    else{
      var guestcartitems:cartItem[] = JSON.parse(this.cookie.get("GuestCart"));
      guestcartitems = guestcartitems.filter(c => c.productId != productid);
      this.cartIs = guestcartitems;
      this.globals.cartContent--;
      this.cookie.set("GuestCart",JSON.stringify(guestcartitems))
    }
  }
}
