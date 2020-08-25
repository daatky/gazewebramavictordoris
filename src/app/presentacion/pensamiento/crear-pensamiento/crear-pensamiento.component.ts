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
    this.dataLista={tamanoLista:TamanoLista.TIPO_PENSAMIENTO_GESTIONAR,lista:[],cargarMas: ()=>this.cargarPensamientosPrivados()}             
    this.botonCrearPensamiento = { text: 'Enviar', tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: this.actualizarPensamiento }    
    this.obtenerPensamientosPublicos()
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
  // FIN  DE ESCUCHADORES EMIT
  obtenerPensamientosPublicos(){
    //5f3afaea066f133b9003d2ff
    /*this.dataLista.lista.push({id:'123123',fechaActualizacion:new Date(),texto:'HOLA 1'})
    this.dataLista.lista.push({id:'123123',fechaActualizacion:new Date(),texto:'HOLA 2'})
    this.dataLista.lista.push({id:'123123',fechaActualizacion:new Date(),texto:'HOLA 3'})
    this.dataLista.lista.push({id:'123123',fechaActualizacion:new Date(),texto:'HOLA 4'})
    return*/
    console.log("VOY A OBTENER PENSAMIENTOS PRIVADOS")
    this.pensamientoNegocio.obtenerPensamientoPublicos('5f3e907015ae58647c0d3e1d')
    .subscribe((res:Array<PensamientoModel>)=>{ 
      console.log("+++++++++++++")
      this.dataLista.lista=res
    },error=>{
      console.log(error)
    })
  }
  obtenerPensamientosPrivados(){
    this.pensamientoNegocio.obtenerPensamientosPrivados('5f3e907015ae58647c0d3e1d')
    .subscribe(res=>{
      console.log("PENSAMIENTOS PRIVADOS") 
      console.log(res)
    },error=>{
      console.log(error)
    })
  }
  crearPensamiento = () =>{
    if(this.crearPensamientoForm.valid){
      console.log('CORRECTO')
      this.pensamientoNegocio.crearPensamiento('5f3e907015ae58647c0d3e1d',true,this.crearPensamientoForm.value.pensamiento)
      .subscribe(res=>{
        console.log(res)
        this.dataLista.lista.unshift(res)
      },error=>{
        console.log(error)
      })
    }else{
      this.inputPensamiento.error = true
    }
  }

  actualizarPensamiento = (objeto:object) =>{ 
    console.log(objeto)
    if(this.crearPensamientoForm.valid){
      this.pensamientoNegocio.actualizarPensamiento(objeto['pensamientoModel']['id'],this.crearPensamientoForm.value.pensamiento)
      .subscribe(res=>{
        console.log(objeto)
        console.log(res)
        this.dataLista.lista[objeto['index']].texto=this.crearPensamientoForm.value.pensamiento
        this.dataLista.lista[objeto['index']].fechaActualizacion=new Date()
      },error=>{
        console.log(error)
      })
    }else{
      this.inputPensamiento.error = true
    }
  }

  actualizarEstadoPensamiento = (objeto:object) =>{
    console.log(objeto)
    this.pensamientoNegocio.actualizarEstadoPensamiento(objeto['pensamientoModel']['id'])
    .subscribe(res=>{
      console.log('se actualizo estado del pensamiento')
      console.log(objeto)
      console.log(res)
      this.dataLista.lista.splice(objeto['index'],1)
      //Agregar en la otra lista
    },error=>{
      console.log(error)
    })
  }
  eliminarPensamiento = (objeto:object)=>{
    console.log(objeto)
    this.pensamientoNegocio.eliminarPensamiento(objeto['pensamientoModel']['id'])
    .subscribe(res=>{
      console.log(objeto)
      console.log(res)
      this.dataLista.lista.splice(objeto['index'],1)
      //Agregar en la otra lista
    },error=>{
      console.log(error)
    })
  }
  cargarMasPensamientos(esPrivado:boolean){
    if(this.variablesGlobales.paginacionPublico.actual!=-1){
      this.pensamientoNegocio.cargarMasPensamientos('5f3e907015ae58647c0d3e1d',10,this.variablesGlobales.paginacionPublico.actual,esPrivado)
      .subscribe(res=>{
        console.log("PENSAMIENTOS PRIVADOS") 
        console.log(res)    
      },error=>{
        console.log(error)
      })
    }
  }
  //cargar mas: Se envia este metodo para que se ejecute cuando en la lista se da mas scrol
  //Hay que controlar cuando ya no existan mas datos no mandar a cargar mas
  cargarPensamientosPrivados(){    
    //Leer de la cabezera los datos que viene    
    console.log(this.variablesGlobales.paginacionPublico)
    console.log(this.variablesGlobales.paginacionPublico.actual++)
    if(this.variablesGlobales.paginacionPublico.actual!=-1){
      this.pensamientoNegocio.cargarPensamientosPrivados('5f3e907015ae58647c0d3e1d',10,this.variablesGlobales.paginacionPublico.actual)
      .subscribe(res=>{
        console.log("PENSAMIENTOS PRIVADOS") 
        console.log(res)    
      },error=>{
        console.log(error)
      })
    }
  }
  cargarPensamientosPublico(){
    
  }
}