import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Product } from '../shared/sharedvariables/product';
import { PRODUCTS } from '../shared/sharedvariables/Products';
import { isUndefined } from 'util';
import { ProductService } from '../services/productservices/productservices.service';


@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})
export class ProductpageComponent implements OnInit {

  mainProduct:Product = null
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
    window.scrollTo(0,0)
    activatedRoute.params.subscribe((params)=> 
              productService.getProductById(params['id']).subscribe(p => {this.mainProduct = p;  console.log(p);})
              );
    
  }

  ngOnInit() {
  }
}
