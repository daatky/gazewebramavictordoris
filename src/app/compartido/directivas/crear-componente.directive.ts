import { Directive, ComponentRef, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core'
import { DatosItem } from '../diseno/modelos/datos-item-lista.interface'


@Directive({
  selector: '[crearComponente]',
  //inputs:['otro1']
})
export class CrearComponenteDirective {
  private componentInstance: ComponentRef<any> = null;
  /*@Input() 
  set crearComponente(datosItem:DatosItem){
    this.data=datosItem
    this.cargarComponete(datosItem)
  }*/
  @Input() dataConfiguracion: number

  @Input() componente: number
  @Input() unClick: Function
  @Input() dobleClick: Function
  @Input() clickSostenido: Function

  @Input() itemInformacion: any
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  ngOnInit(): void {
    this.cargarComponete(
      {
        dataConfiguracion: this.dataConfiguracion,
        componente: this.componente,
        dataComponente: this.itemInformacion,
        unClick: this.unClick,
        dobleClick: this.dobleClick,
        clickSostenido: this.clickSostenido
      })
  }


  cargarComponete(datosItem: DatosItem) {

    //  console.log(this.otro1)  
    if (!this.componentInstance) {
      this.createLoaderComponent(datosItem);
      this.makeComponentAChild();
    }
    this.componentInstance.instance.datosItem = datosItem;
  }

  //Crea componente
  private async createLoaderComponent(datosItem: DatosItem) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(datosItem.componente);
    this.componentInstance = this.viewContainerRef.createComponent(componentFactory);
  }

  //Agrega el componente hijo a la vista
  private async makeComponentAChild() {
    console.log(this.componentInstance)
    const loaderComponentElement = await this.componentInstance.location.nativeElement;
    console.log(loaderComponentElement)
    const sibling: HTMLElement = await loaderComponentElement.previousSibling;
    console.log(sibling)
    sibling.insertBefore(loaderComponentElement, sibling.firstChild);
  }

  ngOnDestroy(): void {
    if (this.componentInstance) {
      this.componentInstance.destroy();
    }
  }
}

