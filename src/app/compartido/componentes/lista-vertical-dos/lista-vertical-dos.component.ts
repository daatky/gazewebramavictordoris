import { Component, OnInit, Input } from '@angular/core'
import { DatosItem, DatosItemTest } from '../../diseno/modelos/datos-item-lista.interface'
//import { DatosLista, DatosListaTest } from '../../diseno/modelos/datos-lista.interface'

@Component({
  selector: 'app-lista-vertical-dos',
  templateUrl: './lista-vertical-dos.component.html',
  styleUrls: ['./lista-vertical-dos.component.scss']
})
export class ListaVerticalDosComponent implements OnInit {

  //@Input() dataListaTest: DatosListaTest

  constructor() {

  }

  ngOnInit(): void {
  }

  asignar(pos:number, componente:any) {
   // this.dataListaTest.items[pos].item = componente
  }
}
