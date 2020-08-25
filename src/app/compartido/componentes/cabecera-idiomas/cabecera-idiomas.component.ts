import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { CatalogoIdiomaEntity } from 'src/app/dominio/entidades/catalogos/catalogo-idioma.entity';
import { LineaDeTexto } from '../../diseno/modelos/linea-de-texto.interface';
import { EstilosDelTexto } from '../../diseno/enums/estilo-del-texto.enum';
import { TamanoDeTextoConInterlineado } from '../../diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorDelTexto } from '../../diseno/enums/color-del-texto.enum';
import { PortadaGazeComponent } from '../portada-gaze/portada-gaze.component';
import { IdiomaNegocio } from 'src/app/dominio/logica-negocio/idioma.negocio';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { TamanoPortadaGaze } from '../../diseno/enums/tamano-portada-gaze.enum';

@Component({
  selector: 'app-cabecera-idiomas',
  templateUrl: './cabecera-idiomas.component.html',
  styleUrls: ['./cabecera-idiomas.component.scss']
})
export class CabeceraIdiomasComponent implements OnInit {
  idiomas: Array<CatalogoIdiomaEntity>
  idiomaEstilo: LineaDeTexto
  idiomaSeleccionado:string
  @Output() cambiarIdioma=new EventEmitter()  
  constructor(
    private idiomaNegocio: IdiomaNegocio,  
    //private localStorageNegocio:LocalStorageNegocio,
    private internacionalizacionNegocio:InternacionalizacionNegocio,    
  ) { }

  ngOnInit(): void {
    //VERIFICAR SI ESTA GUARDADO UN IDIOMA EN LOCALSTORAGE    
    this.idiomaSeleccionado=this.internacionalizacionNegocio.obtenerIdiomaInternacionalizacion()
    this.idiomaEstilo = {
      texto: 'idioma',
      enMayusculas: true,
      estiloTexto: EstilosDelTexto.BOLD,
      tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_IGUAL,
      color: ColorDelTexto.TEXTOBLANCO
    }    
    this.obtenerCatalogoIdiomas()    
  }

    //OBTENER EL CATALOGO DE IDIOMAS
    obtenerCatalogoIdiomas(){
      this.idiomaNegocio.obtenerCatalogoIdiomas()
        .subscribe(res => {
          this.idiomas = res
          //this.idiomaNegocio.ordenarIdioma()
        }, error => {
          console.log(error)
        })
    }
  // Obtener clases lineas texto 
  obtenerClasesLineasTexto(linea: LineaDeTexto,idioma?:string) {
    const clases = {}    
    clases[linea.color.toString()] = true
    clases[linea.estiloTexto.toString()] = true
    clases[linea.tamanoConInterlineado.toString()] = true
    clases['enMayusculas'] = linea.enMayusculas
    if((linea.texto==='idioma')&&(this.idiomaSeleccionado===idioma)){
      clases['amarilloIdioma']=true
    }
    return clases
  }
  seleccionarIdioma(idioma:CatalogoIdiomaEntity){
    console.log(idioma)
    this.idiomaSeleccionado=idioma.codNombre    
    this.internacionalizacionNegocio.usarIidoma(idioma.codNombre)    
    this.idiomaNegocio.guardarIdiomaSeleccionado(idioma)
    this.cambiarIdioma.emit('')
  }
}
