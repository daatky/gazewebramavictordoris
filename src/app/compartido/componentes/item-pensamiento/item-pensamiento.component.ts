import { Component, OnInit, Input} from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

  dobletap(){
    this.configuracionItem.dobleClick();
  }  
  eliminarPensamiento(){
    this.configuracionItem.onclick();
  }
}
