import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Product } from '../shared/sharedvariables/product';
import { ProductmainComponent } from '../productmain/productmain.component';

@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.scss'],
  
})
export class ProductdialogComponent implements OnInit {

  product:Product;

  constructor(private dialogref:MatDialogRef<ProductmainComponent>, @Inject(MAT_DIALOG_DATA) public passedData ) {
    this.product = passedData.product
    console.log(passedData);
   }

  ngOnInit() {

  }
}
