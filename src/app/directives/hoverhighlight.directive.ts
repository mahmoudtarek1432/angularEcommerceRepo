import { Directive, Renderer2, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[appHoverhighlight]'
})
export class HoverhighlightDirective {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
    this.render.addClass(this.el.nativeElement, 'highlight');
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.render.removeClass(this.el.nativeElement, 'highlight');
  }
}
