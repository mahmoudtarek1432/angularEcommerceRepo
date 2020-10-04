import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule} from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HoverhighlightDirective } from './directives/hoverhighlight.directive';
import { FooterComponent } from './footer/footer.component';
import { SliderightDirective } from './directives/slideright.directive';
import { NavbarscrollDirective } from './directives/navbarscroll.directive';
import { MainbodyComponent } from './mainbody/mainbody.component';
import { ModalComponent } from './modal/modal.component';
import { Globals} from './shared/globals';
import { HomeComponent } from './home/home.component';
import { BannerscrollDirective } from './directives/bannerscroll.directive';
import { ProductmainComponent } from './productmain/productmain.component';
import { ProductdialogComponent } from './productdialog/productdialog.component'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ItemsPageComponent } from './items-page/items-page.component';
import { ListItemModuleComponent } from './shared/sharedcomponents/list-item-module/list-item-module.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginorcreateaccComponent } from './loginorcreateacc/loginorcreateacc.component';
import { FilterComponent } from './shared/sharedcomponents/filter/filter.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { CartComponent } from './cart/cart.component';
import { ProductService } from './services/productservices/productservices.service';
import { UserService } from './services/userservices/User.service';
import { AccountComponent } from './Account/Account.component';
import { OverviewComponent } from './account/overview/overview.component';
import { OrdersComponent } from './account/orders/orders.component';
import { ReviewsComponent } from './account/reviews/reviews.component';
import { SavedItemsComponent } from './account/saved-items/saved-items.component';
import { RecentlyViewedComponent } from './account/recently-viewed/recently-viewed.component';
import { AccountEditComponent } from './account/overview/account-edit/account-edit.component';
import { ChangepasswordComponent } from './account/overview/changepassword/changepassword.component';
import { OrderDetailsComponent } from './Account/orders/order-details/order-details.component';
import { Orderservice } from './services/orderservices/orderservices.service'
import { RecentlyviewedService } from './services/recentlyviewed/recentlyviewed.service'
import { SaveditemsService } from './services/saveditems/saveditems.service'
import { CartService } from './services/cartservices/cart.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HoverhighlightDirective,
    FooterComponent,
    SliderightDirective,
    NavbarscrollDirective,
    MainbodyComponent,
    ModalComponent,
    HomeComponent,
    BannerscrollDirective,
    ProductmainComponent,
    ProductdialogComponent,
    ItemsPageComponent,
    ListItemModuleComponent,
    LoginComponent,
    RegisterComponent,
    LoginorcreateaccComponent,
    FilterComponent,
    ProductpageComponent,
    CartComponent,
    AccountComponent,
    OverviewComponent,
    OrdersComponent,
    ReviewsComponent,
    SavedItemsComponent,
    RecentlyViewedComponent,
    AccountEditComponent,
    ChangepasswordComponent,
    OrderDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    Globals,
    ProductService,
    UserService,
    Orderservice,
    SaveditemsService,
    RecentlyviewedService,
    CookieService,
    CartService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductdialogComponent,
    FilterComponent
  ]
})
  
export class AppModule { }
