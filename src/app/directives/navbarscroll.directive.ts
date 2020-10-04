import { Directive, Renderer2, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[appNavbarscroll]'
})
export class NavbarscrollDirective {

  constructor (private rendrer: Renderer2, private el: ElementRef) { }

  @HostListener('window:scroll') scrollHandler(){
    if(window.pageYOffset >= this.el.nativeElement.offsetTop && this.el.nativeElement.offsetTop != '0' &&
        !this.el.nativeElement.getAttribute("class").includes("slideup")  ){
      this.el.nativeElement.setAttribute('data-offsetTop',this.el.nativeElement.offsetTop);
      this.rendrer.addClass(this.el.nativeElement,'scrolled');
    }
    else if(window.pageYOffset < this.el.nativeElement.getAttribute('data-offsetTop')){
      this.rendrer.removeClass(this.el.nativeElement,'scrolled');
    }
    if(this.el.nativeElement.getAttribute("class") == 'slideup' && window.pageYOffset>= 51){
      this.rendrer.addClass(this.el.nativeElement,'shown');
    }else if(window.pageYOffset < 51){
      this.rendrer.removeClass(this.el.nativeElement,'shown');
    }
  }
}
