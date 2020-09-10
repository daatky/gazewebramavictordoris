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
    async obtenerCatalogoIdiomas(){   
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:await this.internacionalizacionNegocio.obtenerTextoLlave('procesando')}   
      this.idiomaNegocio.obtenerCatalogoIdiomas()
        .subscribe(res => {                    
          if(res){
            console.log("DATOS")
            this.idiomas = res
            this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}          
          }else{
            //this.internacionalizacionNegocio.obtenerTextoSincrono('problemaObtenerDatos')
            console.log("NO TRAJE NADA DE DATOS")
            this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:this.internacionalizacionNegocio.obtenerTextoSincrono('problemaObtenerDatos')}            
            this.idiomas=[]            
          }
          //this.idiomaNegocio.ordenarIdioma()
        }, error => {
          this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
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
