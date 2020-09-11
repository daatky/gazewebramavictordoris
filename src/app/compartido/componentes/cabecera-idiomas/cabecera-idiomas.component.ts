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
import { ConfiguracionToast } from '../../diseno/modelos/toast.interface';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-cabecera-idiomas',
  templateUrl: './cabecera-idiomas.component.html',
  styleUrls: ['./cabecera-idiomas.component.scss']
})
export class CabeceraIdiomasComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: ToastComponent
  idiomas: Array<CatalogoIdiomaEntity>
  idiomaEstilo: LineaDeTexto
  idiomaSeleccionado:string
  @Output() cambiarIdioma=new EventEmitter()  
  configuracionToast:ConfiguracionToast
  constructor(
    private idiomaNegocio: IdiomaNegocio,  
    //private localStorageNegocio:LocalStorageNegocio,
    private internacionalizacionNegocio:InternacionalizacionNegocio,        
  ) {     
  }

  ngOnInit(): void {  
    this.caragarDatos()
  }
  caragarDatos(){
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
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
      
      //this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesando'),true)         
      this.idiomaNegocio.obtenerCatalogoIdiomas()
        .subscribe(res => { 
          //this.toast.cerrarToast()                   
          if(res){
            console.log("DATOS")
            this.idiomas = res
          }else{
            console.log("NO TRAJE NADA DE DATOS")
            this.idiomas=[] 
            //this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('problemaObtenerDatos'))           
          }
          //this.idiomaNegocio.ordenarIdioma()
        }, error => {
          //this.toast.cerrarToast()
          //this.toast.abrirToast(error)
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
    this.idiomaNegocio.eliminarVarablesStorage()
    this.cambiarIdioma.emit('')
  }
}
