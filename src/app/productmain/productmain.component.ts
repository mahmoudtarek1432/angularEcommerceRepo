import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Review } from '../shared/sharedvariables/review'
import { PRODUCTS } from '../shared/sharedvariables/Products'
import { Product } from '../shared/sharedvariables/product'
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { ParamMap, Router } from '@angular/router'
import { ProductService } from '../services/productservices/productservices.service';
import { Globals } from '../shared/globals';
import { CartService } from '../services/cartservices/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { userCartItem } from '../shared/sharedvariables/UserInfo'
import { cartItem } from '../shared/sharedvariables/cartItem';

@Component({
  selector: 'app-productmain',
  templateUrl: './productmain.component.html',
  styleUrls: ['./productmain.component.scss'],
  inputs: ['product']
})
export class ProductmainComponent implements OnInit {
  
  //variables
  product: Product;
  reviewsOver5: boolean;
  showMore:boolean = false;
  mainImage:string= ''
  descriptionAcitve:string= 'active'; //used to toggle active or not
  reviewsActive:string= '';
  currentquantity: number = 1;
  
  @ViewChild('rform') formDirective:FormGroupDirective;
  reviewForm: FormGroup;
  review: Review;
  formError={
    'name': '',
    'comment': ''
  }

  validationMessage={
    'comment':{
      'required':'Comment field is required'
    }
  }





  //functions
  constructor( private fb:FormBuilder, private route:Router, private productService: ProductService,
               private globals: Globals, private cartService: CartService,private Cookie: CookieService) { 
    this.createForm();
  }

  ngOnInit() {
    this.mainImage =  this.product.imagePathsArr[0];
    this.reviewsOver5 = (this.product.reviews.length >= 5)? true : false;
  }

  createForm(){
    this.reviewForm = this.fb.group({
      comment: ['',Validators.required]
    });

    this.reviewForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit(rating:any){
    this.review = this.reviewForm.value;
    this.reviewForm.reset({
      comment: ''
    })
    let rate = 0;
    for(var i = 0; i < rating.length;i++){
      if(rating[i].checked == true){
        rate = rating[i].value;
      }
    }
    this.review.rating = rate;
    var date = new Date();
    this.review.date = date.getMinutes()+':'+date.getUTCHours()+' '+date.getDay()+'/'+date.getMonth()+'/'+date.getUTCFullYear();
    this.review.productId = this.product.id;

    this.productService.addReview(this.review).subscribe();
    this.formDirective.resetForm();
  }

  onValueChanged(data?: any){
    if(!this.reviewForm) {return}
    const form = this.reviewForm;
    for(const field in this.formError){
      if(this.formError.hasOwnProperty(field)){
        this.formError[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessage[field];
          for(const key in control.errors){
            if(control.errors.hasOwnProperty(key)){
              
              this.formError[field] +=  messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  showMoreOrLess(){
    if(this.showMore){
      this.showMore = false;
    }else{
      this.showMore = true;
    }
  }

  changeMainImage(data){
    this.mainImage = data.srcElement.src;
  }

  slideToReviews($el,description,reviews){
    let accel = 2.5;
    let velo = 26;
    let timer = setInterval(()=>{
      window.scrollTo(0,window.pageYOffset + velo);
      if(window.pageYOffset >= $el.offsetTop - 50){
        reviews.setAttribute('class','active');
        description.setAttribute('class','');
        clearInterval(timer);
      }
    },20)
  }

  toggleTitleActive($event: Event,description,reviews){ //for description and reviews
    if($event.srcElement == description){ //if the element from the event is description activate it 
      description.setAttribute('class','active');
      reviews.setAttribute('class','');
    }else{
      reviews.setAttribute('class','active');
      description.setAttribute('class','');
    }
  }

  increaseQuantity(Quantity){
    if(Quantity.innerText < this.product.quantityAvailable){
      Quantity.setAttribute('value',parseInt(Quantity.value) + 1);
      Quantity.innerText = parseInt(Quantity.innerHTML) + 1;
      this.currentquantity =  parseInt(Quantity.innerHTML) + 1
    }
  }
  decreaseQuantity(Quantity){
    console.log(Quantity.innerHTML)
    if(Quantity.innerText > 1){
      Quantity.setAttribute('value',parseInt(Quantity.value) - 1);
      Quantity.innerText = parseInt(Quantity.innerHTML) - 1
      this.currentquantity =  parseInt(Quantity.innerHTML) - 1
    }
  }

  addToCart(){
    if(this.globals.loggedIn){
      this.cartService.addToCart(this.product.id, this.currentquantity)
      .subscribe(result =>{
        this.route.navigateByUrl("cart");
        if(!result.isSuccessful){return;}
      });
    }
    else{
      console.log(this.product.imagePathsArr)
      var cartitem: cartItem[] = [{
        productId : this.product.id,
        inCartQuantity : this.currentquantity,
        itemName: this.product.name,
        image: this.product.imagePathsArr[0],
        unitePrice: this.product.price - (this.product.price * (this.product.salePercent/100))
      }];

      if(this.Cookie.get("GuestCart") == ""){ //cart items for not loggedin users
        var date = new Date();
        date.setDate(date.getDate()+30);
        this.Cookie.set("GuestCart",JSON.stringify(cartitem),date);
        this.globals.cartContent++;
        this.route.navigateByUrl("cart");
      }
      else{
        console.log(this.Cookie.get("GuestCart"))
        var guestCart:cartItem[] = JSON.parse(this.Cookie.get("GuestCart"));
        if(guestCart.filter(i=> i.productId == this.product.id).length > 0){
          guestCart.forEach(i => {
            if(i.productId == this.product.id){
              i.inCartQuantity = this.currentquantity;
            }
          });
        }
        else{
          guestCart.push(cartitem[0]);
          this.globals.cartContent++;
        }
        this.Cookie.set("GuestCart",JSON.stringify(guestCart),date);
        this.route.navigateByUrl("cart");
      }
    }
  }
}
