import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProductmainComponent } from '../productmain/productmain.component';
import { ItemsPageComponent } from '../items-page/items-page.component';
import { LoginComponent } from '../login/login.component';
import { LoginorcreateaccComponent } from '../loginorcreateacc/loginorcreateacc.component';
import { ProductpageComponent } from '../productpage/productpage.component';
import { CartComponent } from '../cart/cart.component';
import { AccountComponent } from '../Account/Account.component';
import { OverviewComponent } from '../account/overview/overview.component';
import { AccountEditComponent } from '../account/overview/account-edit/account-edit.component';
import { ChangepasswordComponent } from '../account/overview/changepassword/changepassword.component';
import { OrdersComponent } from '../account/orders/orders.component';
import { OrderDetailsComponent } from '../Account/orders/order-details/order-details.component';
import { SavedItemsComponent } from '../account/saved-items/saved-items.component';
import { RecentlyViewedComponent } from '../account/recently-viewed/recently-viewed.component';

const routes: Routes = [
  {path:'product/:id',component:ProductmainComponent},
  {path:'home',component:HomeComponent},
  {path:'productsList/:category/:orderby/:page',component:ItemsPageComponent},
  {path:'productsList/:category/:orderby',component:ItemsPageComponent},
  {path:'productsList/:category',component:ItemsPageComponent},
  {path:'Login',component:LoginorcreateaccComponent},
  {path:'productPage/:id',component:ProductpageComponent},
  {path:'cart',component:CartComponent},
  {path:'Account',component:AccountComponent,children: [
    {path:'Overview',component:OverviewComponent},
    {path:'Overview/Edit',component:AccountEditComponent},
    {path:'Overview/changepass',component:ChangepasswordComponent},
    {path:'Orders',component:OrdersComponent},
    {path:'Orders/Details/:orderId',component:OrderDetailsComponent},
    {path:'SavedItems', component: SavedItemsComponent},
    {path:'RecentlyViewed', component: RecentlyViewedComponent}
  ]},
  {path:'',component:HomeComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
