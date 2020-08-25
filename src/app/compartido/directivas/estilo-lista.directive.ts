import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEstiloLista]'
})
export class EstiloListaDirective {
  @Input() dataConfiguracion: any
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    //console.log(this.datosItem)
    this.renderer.setStyle(this.el.nativeElement,'height',this.dataConfiguracion.altura);
    this.renderer.setStyle(this.el.nativeElement,'overflow-y','auto');
  }
}

