import { Component, OnInit } from '@angular/core';
import { Product } from '../../sharedvariables/product';
import { MatDialog } from '@angular/material/dialog'
import { ProductdialogComponent } from '../../../productdialog/productdialog.component';
import { mobileDialog } from '../../sharedmethods/mobiledialog';
import { Router, ActivatedRoute } from '@angular/router';
import { SaveditemsService } from 'src/app/services/saveditems/saveditems.service';
import { CartService } from 'src/app/services/cartservices/cart.service';
import { Globals } from '../../globals';
import { cartItem } from '../../sharedvariables/cartItem';
import { CookieService } from 'ngx-cookie-service';
import { global } from '@angular/compiler/src/util';



@Component({
  selector: 'appListItemModule',
  templateUrl: './list-item-module.component.html',
  styleUrls: ['./list-item-module.component.scss'],
  inputs: ['product']
})
export class ListItemModuleComponent implements OnInit {

  product: Product;
  constructor( private dialog: MatDialog, private router: Router,private activatedRoute: ActivatedRoute, private globals: Globals,
     private savedItemService: SaveditemsService, private cartService: CartService, private Cookie: CookieService) { 
    
  }

  ngOnInit() {

  }

  goToProudctPage(){
    console.log(this.activatedRoute)
    this.router.navigate(['/productPage'],
      {
        queryParams: {id : this.product.id},
        replaceUrl: true,
        relativeTo: this.activatedRoute
      })
  }

  openProductDialog(product){
    let data = {
      product: product
    }
    mobileDialog.openResponsiveDialog(this.dialog,ProductdialogComponent,data);
  }

  addToSavedItems(){
    this.savedItemService.addToSavedItems(this.product.id).subscribe();
  }
  addToCart(){
    if(this.globals.loggedIn){
      this.cartService.addToCart(this.product.id, 1)
      .subscribe(result =>{
        if(!result.isSuccessful){return;}
      });
    }
    else{
      console.log(this.product)
      var cartitem: cartItem[] = [{
        productId : this.product.id,
        inCartQuantity : 1,
        itemName: this.product.name,
        image: this.product.imagePathsArr[0],
        unitePrice: this.product.price - (this.product.price * (this.product.salePercent/100))
      }];

      if(this.Cookie.get("GuestCart") == ""){ //cart items for not loggedin users
        var date = new Date();
        date.setDate(date.getDate()+30);
        this.Cookie.set("GuestCart",JSON.stringify(cartitem),date);
        this.globals.cartContent++;
      }
      else{
        console.log(this.Cookie.get("GuestCart"))
        var guestCart:cartItem[] = JSON.parse(this.Cookie.get("GuestCart"));
        if(guestCart.filter(i=> i.productId == this.product.id).length > 0){
          guestCart.forEach(i => {
            if(i.productId == this.product.id){
              i.inCartQuantity = 1;
            }
          });
        }
        else{
          guestCart.push(cartitem[0]);
        }
        this.Cookie.set("GuestCart",JSON.stringify(guestCart),date);
        this.globals.cartContent++;
      }
    }
  }
}
