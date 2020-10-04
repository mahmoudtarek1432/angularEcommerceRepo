import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBannerscroll]'
})
export class BannerscrollDirective {

  constructor(private render: Renderer2, private el: ElementRef) { }

  @HostListener('window:scroll') scrollHandler(){
    if((window.pageYOffset + window.innerHeight) > this.el.nativeElement.offsetTop){
      var offset = -(window.pageYOffset + window.innerHeight - this.el.nativeElement.offsetTop) * 0.05;
      this.render.setStyle(this.el.nativeElement,'backgroundPositionY',offset+'px')
      console.log(offset)
    }
    else if((window.pageYOffset + window.innerHeight) <= this.el.nativeElement.offsetTop){
      this.render.setStyle(this.el.nativeElement,'backgroundPositionY',0)
    }
  }
}
