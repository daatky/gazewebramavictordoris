import { Component, OnInit, Input } from '@angular/core'
import { DatosItem } from '../../diseno/modelos/datos-item-lista.interface'
import { DatosLista } from '../../diseno/modelos/datos-lista.interface'

@Component({
  selector: 'app-lista-vertical',
  templateUrl: './lista-vertical.component.html',
  styleUrls: ['./lista-vertical.component.scss']
})
export class ListaVerticalComponent implements OnInit {
  /**
   ==========================INFORMACION QUE NECESITA EL COMPONETE ListaVerticalComponent =============================
  Este componente necesita que le llegue la siguiente informacion
  dataLista => Es todo lo que tiene que tener la lista por ejemplo (lista,error,configuraciones de la lista, cargando y funciones 
              con las que se va a comunicar con el componente que la invoque)
              En esta variable tam bien se tiene que enviar la altura que tiene la lista
  dataItem => Es todo lo que tiene que ver con el Item que se va a dibujar por ejemplo 
              (Componente a cargar,configuracion del item (stylos))
  NOTA: La infomacion de cada uno de los modelos Esta en cada una de las interfaces  


  ========================== METODOS QUE SE UTILIZA ListaVerticalComponent PARA INTERACTUAR CON EL PADRE =============================
  reintentar() => Ejecuta el metodo reintentar() del padre para reintentar la consulta cuando salga error al cargar la lista
  cargarMas () => Ejecuta el metodo cargarMas() del padre cuando el usuario necesite que se presente mas item
**/

  //Variable que llega desde el padre
  @Input() dataLista: DatosLista

  constructor() {

  }

  

  ngOnInit(): void {
  }
  //Verifica si presento error al traer los datos de la lista, en caso de llegar a final ejecuta el metodo que envio el padre de reintentar
  reintentar() {
    this.dataLista.reintentar()
  }
  //Verifica si ya llego al final de la lista, en caso de llegar a final ejecuta el metodo que envio el padre de cargas mas
  cargarMas() {
    let element = document.getElementById("scroll");
    if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
      console.log('aqui cargado mas')
      if (this.dataLista.cargarMas) {
        this.dataLista.cargarMas()
      }
    }
  }
}
