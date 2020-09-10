import { Component, OnInit, Input} from '@angular/core';
import { EventoTapPersonalizado } from 'src/app/nucleo/servicios/generales/detector-gestos.service';
import { Configuracion } from '../../diseno/modelos/pensamiento';

@Component({
  selector: 'app-item-pensamiento',
  templateUrl: './item-pensamiento.component.html',
  styleUrls: ['./item-pensamiento.component.scss']
})
export class ItemPensamientoComponent implements OnInit {
  @Input() configuracionItem:Configuracion
  @Input() estilo:string

  constructor(
    private gestorEventosTap: EventoTapPersonalizado,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      // Inicializar eventos de tap y doble tap      
      setTimeout(() => {
        if(this.configuracionItem &&(this.configuracionItem.dobleClick ||this.configuracionItem.onclick)){
          const elemento = document.getElementById("itemPensamiento" + this.configuracionItem.data.id) as HTMLElement
          if (elemento) {
            const gestor = this.gestorEventosTap.construirEventosTap(elemento)
            gestor.on('tap', () => {
              console.log('un tap')
              this.configuracionItem.onclick();
            })
            gestor.on('dobletap', () => {
              console.log('dos tap')
              this.configuracionItem.dobleClick();
            })
          }
        }
      })      
  }

}
