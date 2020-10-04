import { Component, OnInit, ElementRef, NgModule } from '@angular/core';
import { PRODUCTS } from '../shared/sharedvariables/Products'
import { ViewChild } from '@angular/core'
import { Product } from '../shared/sharedvariables/product';
import { fromEventPattern } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'
import { ProductdialogComponent } from '../productdialog/productdialog.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isNull, isUndefined } from 'util';
import { FilterComponent } from '../shared/sharedcomponents/filter/filter.component';
import { mobileDialog } from '../shared/sharedmethods/mobiledialog';
import { FormsModule, NgModel } from '@angular/forms';
import { ProductService } from '../services/productservices/productservices.service';

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.scss']
})



export class ItemsPageComponent implements OnInit {
  products :Product[] = [];
  display = 'grid';
  sort = 'A-Z'
  listsize = 15;//temp
  pages = 0;
  pagesNgFor; //itrator

  constructor(private dialog:MatDialog, private activatedroute: ActivatedRoute,private router:Router, private productService: ProductService) {
    
    this.activatedroute.queryParams.subscribe((queryParams)=> {
      this.display = (!isUndefined(queryParams['display']))? queryParams['display'] : "grid";
      this.activatedroute.params.subscribe((params)=>{
        this.getProducts(queryParams,params);
      })
    });
    if(isUndefined(this.display)){this.display = 'grid'}
    this.pages = Math.ceil(this.products.length/this.listsize);
    console.log(this.pages)
    this.pagesNgFor = new Array(this.pages)
    console.log(this.products.filter((pro)=>  pro.salePercent == 10).filter((pro)=> pro.id == 1))
   }

  ngOnInit() {
  }


  toGrid(){
    if(this.display == 'row'){
      let params:Params = {display: 'grid'};
      this.router.navigate([],{
        queryParams: params,
        relativeTo: this.activatedroute,
        queryParamsHandling:'merge'
      });
    }
  }

  toRow(){
    if(this.display == 'grid'){
      let params:Params = {display: 'row'};
      this.router.navigate([],{
        queryParams: params,
        relativeTo:this.activatedroute,
        queryParamsHandling:'merge'
      });
    }
  }

  pageGoTo(test){
    let params:Params = {page: '1'};
    this.router.navigate([],{
      queryParams: params,
      queryParamsHandling:'merge',
      relativeTo:this.activatedroute
    })
  }

  openProductDialog(product){
    let data={
      product : product
    }
    mobileDialog.openResponsiveDialog(this.dialog,ProductdialogComponent,data)
  }

  openFilterDialog(){
    mobileDialog.openResponsiveDialog(this.dialog,FilterComponent)
  }

  normalizeParams(){
    if(isUndefined(this.display)){this.display = 'grid'}
    if(isUndefined(this.listsize)){this.listsize = 15}
    if(isUndefined(this.sort)){this.sort = 'A-Z'}
  }

  //the change methods changes the url params that are then used to process the products.
  changeListParams($event,param:string){ 
    let selected = $event.target.options[$event.target.selectedIndex].innerText; //gets the selected option by the selected index in options array
    let params: Params = {[param]: selected};
    this.router.navigate([],{
      queryParams: params,
      queryParamsHandling: 'merge',
      relativeTo:this.activatedroute
    })
  }
  //still the settings are not complete

  getProducts(queryparams,params){
    var filters = "";
    for(var key in queryparams){
      if(key == "listSize" || key == "display" || key == "orderby"){ console.log("here"); continue; }
      filters = filters+key+";"+queryparams[key]+";";
    }
    if(filters[filters.length-1] == ";"){
      filters = filters.substr(0,filters.length-1)
    }
    console.log();
    var category = (!isUndefined(params["category"]))? params["category"]: "defualt";
    var orderby = (!isUndefined(params["orderby"]))? params["orderby"]: "defualt";
    var page = (!isUndefined(params["page"]))? params["page"]: "1";
    this.products = [];
    this.productService.getProuductList(category,filters,orderby,page).subscribe(productList =>{
      this.products = productList;
      console.log(this.products);
    });
  }
}
