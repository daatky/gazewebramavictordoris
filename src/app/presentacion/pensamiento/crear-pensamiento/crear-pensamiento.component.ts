import { Component, OnInit } from '@angular/core';
import { PensamientoCompartido } from 'src/app/compartido/diseno/modelos/pensamiento';
import { TipoPensamiento, EstiloItemPensamiento } from 'src/app/compartido/diseno/enums/tipo-pensamiento.enum';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { PensamientoModel } from 'src/app/dominio/modelo/pensamiento.model';
import { PensamientoNegocio } from 'src/app/dominio/logica-negocio/pensamiento.negocio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface';
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum';
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { VariablesGlobales } from 'src/app/nucleo/servicios/generales/variables-globales.service';
import { ConfiguracionToast } from 'src/app/compartido/diseno/modelos/toast.interface';

@Component({
  selector: 'app-crear-pensamiento',
  templateUrl: './crear-pensamiento.component.html',
  styleUrls: ['./crear-pensamiento.component.scss']
})
export class CrearPensamientoComponent implements OnInit {
  pensamientoCompartido:PensamientoCompartido
  dataLista:DatosLista
  crearPensamientoForm: FormGroup;
  inputPensamiento: InputCompartido;  
  botonCrearPensamiento: BotonCompartido;  
  idPerfil="5f3e907015ae58647c0d3e1d"
  esPrivado:boolean=false
  configuracionToast:ConfiguracionToast
  constructor(
    private variablesGlobales:VariablesGlobales,
    private pensamientoNegocio:PensamientoNegocio,
    private formBuilder: FormBuilder,   
  ) {  
    this.iniciarDatos()
    //this.pensamientoCompartido = { tipoPensamiento: TipoPensamiento.PENSAMIENTO_ALEATORIO, tituloPensamiento: 'Titulo', esLista: false, configuracionItem: EstiloItemPensamiento.ITEM_ALEATORIO }    
  }

  ngOnInit(): void {       
  }
  iniciarDatos(){
    this.crearPensamientoForm = this.formBuilder.group({
      pensamiento: ['', [Validators.required, Validators.maxLength(230)]],
    });      
    this.inputPensamiento = { tipo: 'text', error: false, estilo: {estiloError:EstiloErrorInput.ROJO,estiloInput:EstiloInput.LOGIN}, placeholder: 'Ingrese un pensamiento', data: this.crearPensamientoForm.controls.pensamiento}        

    this.pensamientoCompartido={esLista:true,tipoPensamiento:TipoPensamiento.PENSAMIENTO_PUBLICO_CREACION,subtitulo:'Subtitulo', configuracionItem:{estilo: EstiloItemPensamiento.ITEM_ALEATORIO}}
    this.dataLista={tamanoLista:TamanoLista.TIPO_PENSAMIENTO_GESTIONAR,lista:[],cargarMas: ()=>this.cargarMasPensamientos()}             
    this.botonCrearPensamiento = { text: 'Enviar', tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: this.crearPensamiento }            
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
    this.obtenerPensamientos()
  }
    //Escuchando el emit() que vienen de pensamiento compartido
  //Obtener pensamientos 
  unClick(objeto?:object){
    console.log("unClick")
    //Primero se carga un dialogo
    this.actualizarPensamiento(objeto)
    return objeto
  }
  dobleClick(objeto:object){
    console.log("dobleClick")
    this.actualizarEstadoPensamiento(objeto)  
    return objeto
  }
  clickLargo(objeto?:object){
    console.log("clickLargo")
    this.eliminarPensamiento(objeto)
    return objeto
  }
  
  obtenerPensamientos(){
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    this.pensamientoNegocio.obtenerPensamientos(this.idPerfil,this.esPrivado)
    .subscribe((res:Array<PensamientoModel>)=>{ 
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      this.dataLista.lista=res
    },error=>{
      this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
    })
  }
  crearPensamiento = () =>{
    if(this.crearPensamientoForm.valid){
      console.log('CORRECTO')
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
      this.pensamientoNegocio.crearPensamiento(this.idPerfil,true,this.crearPensamientoForm.value.pensamiento)
      .subscribe(res=>{
        this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
        this.dataLista.lista.unshift(res)
      },error=>{        
        this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
      })
    }else{
      this.inputPensamiento.error = true
    }
  }

  actualizarPensamiento = (objeto:object) =>{ 
    if(this.crearPensamientoForm.valid){
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
      this.pensamientoNegocio.actualizarPensamiento(objeto['pensamientoModel']['id'],this.crearPensamientoForm.value.pensamiento)
      .subscribe(res=>{
        console.log(res)
        this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
        this.dataLista.lista[objeto['index']].texto=this.crearPensamientoForm.value.pensamiento
        this.dataLista.lista[objeto['index']].fechaActualizacion=new Date()
      },error=>{
        console.log(error)
        this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
      })
    }else{
      this.inputPensamiento.error = true
    }
  }

  actualizarEstadoPensamiento = (objeto:object) =>{
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    this.pensamientoNegocio.actualizarEstadoPensamiento(objeto['pensamientoModel']['id'])
    .subscribe(res=>{
      console.log('se actualizo estado del pensamiento')
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      console.log(res)
      this.dataLista.lista.splice(objeto['index'],1)
      //Agregar en la otra lista
    },error=>{
      console.log(error)
      this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
    })
  }
  eliminarPensamiento = (objeto:object)=>{
    console.log(objeto)
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    this.pensamientoNegocio.eliminarPensamiento(objeto['pensamientoModel']['id'])
    .subscribe(res=>{
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      console.log(objeto)
      console.log(res)
      this.dataLista.lista.splice(objeto['index'],1)
      //Agregar en la otra lista
    },error=>{
      console.log(error)
      this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
    })
  }
  cargarMasPensamientos(){
    if(this.variablesGlobales.paginacionPublico.actual!=-1){
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
      this.pensamientoNegocio.cargarMasPensamientos(this.idPerfil,10,this.variablesGlobales.paginacionPublico.actual,this.esPrivado)
      .subscribe(res=>{
        this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
        console.log("PENSAMIENTOS PRIVADOS") 
        console.log(res)    
        //agregar a la lista de pensamientos
      },error=>{
        console.log(error)
        this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
      })
    }
  }
}