import { Component, OnInit, Input } from '@angular/core';
import { CodigosCatalogoEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { DatosLista } from '../../diseno/modelos/datos-lista.interface';
import { TamanoLista } from '../../diseno/enums/tamano-lista.enum';
import { ItemResultadoBusqueda } from "../../../dominio/modelo/item-resultado-busqueda"

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  @Input() data: DataBuscador
  abrir: boolean
  listaResultados: ItemResultadoBusqueda[];
  dataLista: DatosLista;
  palabra: string
  tipo = CodigosCatalogoEntidad


  constructor() {
    this.abrir = false
    this.palabra = ''
    this.listaResultados = [];
  }

  ngOnInit(): void {
    this.preperarLista()
  }

  focusPerdido() {
    console.log("perdi foco")
    this.abrir = false;
    this.palabra = ''
  }

  focusGanado() {
    console.log("gane foco")
    this.abrir = true
  }

  obtenerPlaceholder() {
    if (this.data) {
      if (this.data.disable) {
        return ""
      } else {
        if (this.data.placeholder) {
          return this.data.placeholder
        } else {
          return " "
        }
      }
    } else {
      return ""
    }
  }

  capturarPalabra(event: any) {
    this.palabra = event.target.value;
    console.log("buscando", this.palabra)
    if (this.data) {
      this.data.capturarPalabra(this.palabra)
    }
  }

  preperarLista() {
    this.dataLista = {
      cargando: false,
      reintentar: this.data ? this.data.reintentar : () => { },
      tamanoLista: TamanoLista.BUSCADOR
    }
  }

  mostrarProgreso(mostrar: boolean) {
    this.dataLista.cargando = mostrar;
  }

  mostrarError(error: string) {
    this.dataLista.error = error;
  }

  mostrarResultados(items: ItemResultadoBusqueda[], reiniciar: boolean = false) {
    if (reiniciar) {
      this.listaResultados = items
    } else {
      this.listaResultados.push(...items)
    }
    this.mostrarProgreso(false);
  }

}

export interface DataBuscador {
  placeholder?: string,
  capturarPalabra?: Function
  reintentar?: Function,
  disable: boolean
}


