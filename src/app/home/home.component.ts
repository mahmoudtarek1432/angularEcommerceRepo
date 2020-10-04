import { Component, OnInit } from '@angular/core';
import { BANNERS } from '../shared/sharedvariables/banners';
import { Banner } from '../shared//sharedvariables/banner';
import { bannerAnimation, contentAnimation } from '../animations/app.animation';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ProductdialogComponent } from '../productdialog/productdialog.component';
import { PRODUCTS } from '../shared/sharedvariables/Products';
import { Product } from '../shared/sharedvariables/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    bannerAnimation(),
    contentAnimation()
  ]
})
export class HomeComponent implements OnInit {

  homeSlider: Banner[] = BANNERS;
  displayedSlider:Banner = this.homeSlider[0];
  transition:boolean = true
  itrator: number = 0;
  products: Product[]= PRODUCTS;
  constructor( private dialog:MatDialog) { }

  ngOnInit() {
    this.sliderOnDisplay()
  }

  sliderOnDisplay(){
    setTimeout(()=>{
      this.transition = false
      setTimeout(()=>{
        this.transition = true;
        this.itrator++;
        this.displayedSlider = this.homeSlider[this.itrator % this.homeSlider.length];
        console.log(this.homeSlider[0].image)
        this.sliderOnDisplay()
      },800)
    },10000);
  }

  /*openProductDialog(product){
      var positionBottom = null;
      var Width = null;
      if(window.innerWidth < 600){
        Width = window.innerWidth+'px';
        positionBottom = '0px'
        } // if the window is mobile change properties

      this.dialog.open(ProductdialogComponent,{
        maxWidth: Width,
        position:{bottom: positionBottom},
        data:{
      product: product
     }})
  }*/
}
