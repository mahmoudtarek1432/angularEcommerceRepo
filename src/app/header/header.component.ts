import { Component, OnInit } from '@angular/core';
import { dropdown } from '../animations/app.animation'
import { Globals } from '../shared/globals';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { LoginorcreateaccComponent } from '../loginorcreateacc/loginorcreateacc.component';
import { mobileDialog } from '../shared/sharedmethods/mobiledialog';
import { UserInfo } from '../shared/sharedvariables/UserInfo';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { CookieService } from 'ngx-cookie-service';
import { cartItem } from '../shared/sharedvariables/cartItem';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    dropdown()
  ]
})

export class HeaderComponent implements OnInit {

  toggleAcc:string = 'nottoggled';
  toggleSearch:string = 'nottoggled';
  toggleBags:string = 'nottoggled';
  toggleAccessories:string = 'nottoggled';
  toggleShoes:string = 'nottoggled';
  UserInfo: UserInfo;

  LcartContent:number;

  constructor(public globals:Globals, private dialog:MatDialog, private Cookie: CookieService) {
    if(globals.loggedIn){

    }
    else{
      if(Cookie.get("GuestCart") != ""){
        var cart: cartItem[] = JSON.parse(Cookie.get("GuestCart"));
        globals.cartContent = cart.length;

      }
    }
  }

  ngOnInit() {
    this.UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    console.log(this.UserInfo);
  }
  onClickDrop(){
    if(this.toggleAcc == 'nottoggled'){
      this.toggleAcc = 'toggled';
    }else{
      this.toggleAcc = 'nottoggled';
    }
  }

  onClickDropSearch(){
    if(this.toggleSearch == 'nottoggled'){
      this.toggleSearch = 'toggled';
    }else{
      this.toggleSearch = 'nottoggled';
    }
  }

  onMouseOverAccessories(){
      this.toggleAccessories = 'toggled';
      console.log(window.pageXOffset);
    }
  onMouseOutAccessories(){
    this.toggleAccessories = 'nottoggled';
  }


  onMouseOverBags(){
      this.toggleBags = 'toggled';
  }
  onMouseOutBags(){
    this.toggleBags = 'nottoggled';
  }


  onMouseOverShoes(){
    this.toggleShoes = 'toggled';
  }
  onMouseOutShoes(){
      this.toggleShoes = 'nottoggled';
  }

  openAccountDialog(){
    mobileDialog.openResponsiveDialog(this.dialog,LoginorcreateaccComponent,null,'650px')
  }
}
