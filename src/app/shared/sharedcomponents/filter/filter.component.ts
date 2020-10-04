import { Component, OnInit, ViewChildren, ViewChild, ElementRef, ContentChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from 'src/app/services/productservices/productservices.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  filters:object;//if the fillter is null the router will remove the param
  highlightedFilters:object = {};
  filterKeys: string[] = []; //to use in ngFor

  constructor( private activatedRoute: ActivatedRoute, private route:Router,private el:ElementRef, private productService: ProductService) { 
    this.activatedRoute.params.subscribe((params)=>{
      productService.getProductFilters(params["category"]).subscribe(filter =>
        {
          this.filters = filter
          this.fillFilterKeys();
          this.activatedRoute.queryParams.subscribe((queryparams)=>{
            for(let key in queryparams){
              this.highlightedFilters[key] = queryparams[key]
             }
           });
      });
    });
  }
  
  ngOnInit() {
    this.onCreate()
  }

  onApply(){
    let params = this.highlightedFilters;
    this.route.navigate([],{
      queryParams: params,
      queryParamsHandling: 'merge',
      relativeTo:this.activatedRoute
    })
  }

  changeProperty(key,$event){
    this.resetProperty(key)
    let value =  $event.target.innerText;
    if(this.highlightedFilters[key] == value){
      this.highlightedFilters[key] =  null;
      $event.target.setAttribute('class','')
    }
    else{
      this.highlightedFilters[key] = value;
      $event.target.setAttribute('class','active')
    }
    console.log(this.highlightedFilters);
  }

  changePropertyRating(key,rating){
    if(key == 'rating'){ this.resetRating(true) }
    if((this.highlightedFilters[key] == rating)){
      this.highlightedFilters[key] =  null;
    }
    else{
      this.highlightedFilters[key] =  rating;
      let children = this.el.nativeElement.querySelector('.' + 'rating' + 'Options').children;
      console.log( Math.abs(this.highlightedFilters[key]))
      children[( 5 - Math.abs(rating - 1)-1)].setAttribute('class','stars active')
    }
  }

  resetProperty(key){ //the key is the genre
    console.log(key)
    let children = this.el.nativeElement.querySelector('.' + key).children;
    for(let i = 0; i < children.length; i++){
      if(children[i].innerText == this.highlightedFilters[key]){
        children[i].setAttribute('class','')
      }
    }
  }

  resetRating(fromChangeProperty:boolean = false){
    let children = this.el.nativeElement.querySelector('.' + 'rating' + 'Options').children;
    let index = 0
    for(let i = 0; i < children.length; i++){
      if(children[i].getAttribute('class') == 'stars active'){ index = i}
    }
    children[index].setAttribute('class','stars');
    if(fromChangeProperty == false){ //reset button is clicked
      this.filters['rating'] =  null;
      this.route.navigate([],{
        queryParams: {rating : null},
        queryParamsHandling: 'merge',
        relativeTo:this.activatedRoute
      })
    }
  }

  onCreate(){ //highlight the choosen params
    console.log(this.highlightedFilters)
    for(let itrator in this.highlightedFilters){
      
      if(this.highlightedFilters[itrator] == null){ continue }
      let children = this.el.nativeElement.querySelector('.' + itrator.toUpperCase).children;
      
      if(itrator == 'rating'){
        children[( 5 - Math.abs(this.highlightedFilters[itrator] - 1))-1].setAttribute('class','stars active')
      }
      for(let j = 0; j < children.length; j++){
        if(children[j].innerText == this.highlightedFilters[itrator]){
          children[j].setAttribute('class' ,'active')
        }
      }
    }
  }
  
  fillFilterKeys(){
    for(var i in this.filters){
      if(this.filters.hasOwnProperty(i)){
        this.filterKeys.push(i);
        this.highlightedFilters[i] = null;
      }
    }
  }
}
