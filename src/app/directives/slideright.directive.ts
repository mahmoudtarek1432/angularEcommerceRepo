import { Directive, Renderer2, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSlideright]'
})
export class SliderightDirective {

  constructor(private render: Renderer2, private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.render.addClass(this.el.nativeElement,'slide');
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.render.removeClass(this.el.nativeElement,'slide');
    
  }

}
