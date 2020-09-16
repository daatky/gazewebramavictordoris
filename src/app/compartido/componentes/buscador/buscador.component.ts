import { Component, OnInit, Input } from '@angular/core';
import { CodigosCatalogoEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { DatosLista } from '../../diseno/modelos/datos-lista.interface';
import { TamanoLista } from '../../diseno/enums/tamano-lista.enum';
import { ItemResultadoBusqueda } from "../../../dominio/modelo/item-resultado-busqueda"
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { filter } from 'rxjs/operators';
import { PerfilModel, PerfilModelMapperResultadoBusqueda } from "../../../dominio/modelo/entidades/perfil.model"
import { ProyectoModelMapperResultadoBusqueda } from "../../../dominio/modelo/proyecto.model";
import { NoticiaModelMapperResultadoBusqueda } from "../../../dominio/modelo/noticia.model";

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
  controlBuscador;


  constructor
    (
      private perfilModelMapperResultadoBusqueda: PerfilModelMapperResultadoBusqueda,
      private proyectoModelMapperResultadoBusqueda: ProyectoModelMapperResultadoBusqueda,
      private noticiaModelMapperResultadoBusqueda: NoticiaModelMapperResultadoBusqueda

    ) {
    this.abrir = false
    this.palabra = ''
    this.listaResultados = [];
    this.controlBuscador = new FormControl();
  }

  ngOnInit(): void {
    this.preperarLista()
    this.capturarPalabra()
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

  capturarPalabra() {
    this.controlBuscador.valueChanges.pipe(
      debounceTime(1000),
      filter(data => data != "")
    ).subscribe(data => {
      this.palabra = data
      this.data.capturarPalabra(this.palabra)
    });
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
    this.dataLista.cargando = false;
    this.dataLista.error = error;
  }

  mostrarResultados<T>(items: T[], entidad: CodigosCatalogoEntidad, reiniciar: boolean = false) {
    let resultadoMapeado = this.prepararDatos(items, entidad);
    if (reiniciar) {
      this.listaResultados = []
      this.listaResultados.push(...resultadoMapeado)
    } else {
      this.listaResultados.push(...resultadoMapeado)
    }
    this.mostrarProgreso(false);
  }

  prepararDatos(items: any[], entidad: CodigosCatalogoEntidad): ItemResultadoBusqueda[] {
    switch (entidad) {
      case CodigosCatalogoEntidad.PERFIL: return this.perfilModelMapperResultadoBusqueda.transform(items);
      case CodigosCatalogoEntidad.PROYECTO: return this.proyectoModelMapperResultadoBusqueda.transform(items);
      case CodigosCatalogoEntidad.NOTICIA: return this.noticiaModelMapperResultadoBusqueda.transform(items);
      default: return null;
    }

  }

}





export interface DataBuscador {
  placeholder?: string,
  capturarPalabra?: Function
  reintentar?: Function,
  disable: boolean
}


