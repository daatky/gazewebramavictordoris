import { Component, OnInit } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { BarraInferior } from 'src/app/compartido/diseno/modelos/barra-inferior.interfce';
import { TipoInput } from 'src/app/compartido/diseno/enums/tipo-input.enum';
import { VariablesGlobales } from 'src/app/nucleo/servicios/generales/variables-globales.service';
import { PensamientoNegocio } from 'src/app/dominio/logica-negocio/pensamiento.negocio';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { PensamientoCompartido, ItemPensamiento } from 'src/app/compartido/diseno/modelos/pensamiento';
import { ConfiguracionToast } from 'src/app/compartido/diseno/modelos/toast.interface';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { TipoPensamiento, EstiloItemPensamiento } from 'src/app/compartido/diseno/enums/tipo-pensamiento.enum';
import { PensamientoModel } from 'src/app/dominio/modelo/pensamiento.model';

@Component({
  selector: 'app-pensamiento',
  templateUrl: './pensamiento.component.html',
  styleUrls: ['./pensamiento.component.scss']
})
export class PensamientoComponent implements OnInit {
  //presentarPensamiento:boolean //Para 
  configuracionAppBar: ConfiguracionAppbarCompartida //Para enviar la configuracion de para presentar el appBar
  botonPublico: BotonCompartido //Para enviar la configuracion del boton publico
  botonPrivado: BotonCompartido //Para enviar la configuracion del boton privado
  //crearPensamientoForm: FormGroup;
  //inputPensamiento: InputCompartido; 
  //configuracionToast:ConfiguracionToast;
  barraInferior:BarraInferior //Barra inferior
  cargando:boolean; //PRESENTAR EL CARGANDO
  pensamientoCompartido:PensamientoCompartido
  dataListaPublico:DatosLista //lISTA DE  
  dataListaPrivado:DatosLista //lISTA DE  
  botonCrearPensamiento: BotonCompartido;
  idPerfil="5f3e907015ae58647c0d3e1d" //id MOMENTANEO
  esPublico:boolean; //Para enviar a la base de datos true o false de acuerdo a lo seleccionado por el usuario
  ejecutarMetodo:true //PARA SABER CUAL DE LOS METODOS SE VAN A EJECUTAR
  configuracionToast:ConfiguracionToast; //Presentar el toats
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private variablesGlobales:VariablesGlobales,
    private pensamientoNegocio:PensamientoNegocio,  
    //private formBuilder: FormBuilder, 
  ) { 
    //this.presentarPensamiento=false   
    //this.estadosPensamiento=0
    this.esPublico=true
    this.prepararAppBar() 
    //console.log(this.internacionalizacionNegocio.obtenerIdiomaInternacionalizacion())  
   }

  ngOnInit(): void {  
    this.cargando=true  
    this.iniciarDatos()       
  }
  async prepararAppBar() {
    this.cargando=false   
    /*this.crearPensamientoForm = this.formBuilder.group({
      pensamiento: ['', [Validators.required, Validators.maxLength(230)]],
    });   */
    //this.inputPensamiento = { tipo: 'text', error: false, estilo: {estiloError:EstiloErrorInput.ROJO,estiloInput:EstiloInput.LOGIN}, placeholder: 'Ingrese un pensamiento', data: this.crearPensamientoForm.controls.pensamiento}            
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: true,
          llaveTexto:'PENDIENTE'
        },
        mostrarDivBack: true,
        mostrarTextoHome: true,
        subtitulo: {
          mostrar: true,
          llaveTexto: await this.internacionalizacionNegocio.obtenerTextoLlave('misReflexiones')
          //llaveTexto:"SIDAISDJIJ"
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      }
    }

  }
  async iniciarDatos(){
    this.enviarPensamienroCrear(false)
    this.botonPublico = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('publico'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: (param) => this.cambiarEstado(1) }
    this.botonPrivado = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('privado'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.ROJO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: (param) => this.cambiarEstado(2) }
    this.seleccionarPensamientoMostrar(0)            
    this.botonCrearPensamiento = { text: 'Enviar', tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: this.crearPensamiento }            
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}    
  //this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}    
  }
  //Cuando se le presenta la pagina principal y tiene que seleccionar un tipo de pensamiento(PensamientoCompartido)
  cambiarEstado(param:number){   
    this.barraInferior.activarBarra=true
    this.enviarPensamienroCrear(true)
    this.seleccionarPensamientoMostrar(param)       
  }
  //Selecciona el tipo de diseno del pensamiento que se va a mostrar privado, publico, o por defecto
  seleccionarPensamientoMostrar(data:number){    
    switch (data) {      
      case 0:
        this.cargando=false
        this.pensamientoCompartido={tipoPensamiento:TipoPensamiento.PENSAMIENTO_SIN_SELECCIONAR, configuracionItem:{estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO},subtitulo:false}
        break;
      case 1:
        this.cargando=true  
        this.esPublico=true           
        this.pensamientoCompartido={esLista:true,tipoPensamiento:TipoPensamiento.PENSAMIENTO_PUBLICO_CREACION, configuracionItem:{estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO,presentarX:true},subtitulo:true}        
        this.dataListaPublico={tamanoLista:TamanoLista.TIPO_PENSAMIENTO_GESTIONAR,lista:[],cargarMas: ()=>this.cargarMasPensamientos()}     
        this.obtenerPensamientos() 
        break;
      case 2:
        this.cargando=true  
        this.esPublico=false
        this.pensamientoCompartido={esLista:true,tipoPensamiento:TipoPensamiento.PENSAMIENTO_PRIVADO_CREACION, configuracionItem:{estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO, presentarX:true},subtitulo:true}
        this.dataListaPrivado={tamanoLista:TamanoLista.TIPO_PENSAMIENTO_GESTIONAR,lista:[],cargarMas: ()=>this.cargarMasPensamientos()}              
        this.obtenerPensamientos()
        break;        
      default:
        this.cargando=false
        this.pensamientoCompartido={tipoPensamiento:TipoPensamiento.PENSAMIENTO_SIN_SELECCIONAR, configuracionItem:{estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO},subtitulo:false}
        break;
    }  
  }
    //Escuchando el emit() que vienen de pensamiento compartido
  //Obtener pensamientos 
  /*unClick(itemPensamiento:ItemPensamiento){
    console.log("unClick")
    console.log(itemPensamiento)
    this.eliminarPensamiento(itemPensamiento) 
  }*/
  dobleClick(itemPensamiento:ItemPensamiento){
    console.log("dobleClick")
    this.enviarPensamientoActualizar(itemPensamiento)     
    //return objeto
  }
  clickLargo(itemPensamiento?:ItemPensamiento){
    console.log("clickLargo")
    this.actualizarEstadoPensamiento(itemPensamiento)        
  }
  //Metodo que para inicializar la barra inferior y ademas sirve para enviar el meto de crear cuenta
  enviarPensamienroCrear(activar:boolean){
    this.barraInferior= { input:{maximo:230,placeholder:"Ingrese un pensamiento",data:{texto:""},tipo:TipoInput.TEXTO},activarBarra:activar,variosIconos:false,enviar: () => this.crearPensamiento()}
  }
  crearPensamiento(){
      console.log(this.esPublico)     
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
      this.pensamientoNegocio.crearPensamiento(this.idPerfil,this.esPublico,this.barraInferior.input.data.texto)
      .subscribe(res=>{                
        console.log(res)
        this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
        if(!this.esPublico){
          console.log("ES PRIVADO")
          this.dataListaPrivado.lista.unshift(res)
          return
        }  
        console.log("ES PUBLICO")
        this.dataListaPublico.lista.unshift(res)      
      },error=>{        
        this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
      }) 
  }
  obtenerPensamientos(){
    console.log(this.esPublico)
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    this.pensamientoNegocio.obtenerPensamientos(this.idPerfil,this.esPublico)
    .subscribe((res:Array<PensamientoModel>)=>{      
      this.cargando=false   
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      if(this.esPublico){
          this.dataListaPublico.lista=res
        return
      }
      this.dataListaPrivado.lista=res
    },error=>{
      this.cargando=false  
      this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
    })
  }

  //Para enviar el texto para que se presente el input de la barra inferior
  enviarPensamientoActualizar = (itemPensamiento:ItemPensamiento) =>{ 
    this.barraInferior= { input:{maximo:230,placeholder:"Ingrese un pensamiento",data:{id:itemPensamiento.pensamiento.id,indice:itemPensamiento.indice,texto:itemPensamiento.pensamiento.texto},tipo:TipoInput.TEXTO},activarBarra:true,variosIconos:false,enviar: () => this.actualizarPensamiento()}
  }
  actualizarPensamiento(){
    console.log(this.dataListaPublico)
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
      this.pensamientoNegocio.actualizarPensamiento(this.barraInferior.input.data.id,this.barraInferior.input.data.texto)
      .subscribe(res=>{
        console.log(res)
        this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}        
        if(!this.esPublico){
          console.log("Es privado")
          this.dataListaPrivado.lista[this.barraInferior.input.data.indice].texto=this.barraInferior.input.data.texto
          this.dataListaPrivado.lista[this.barraInferior.input.data.indice].fechaActualizacion=new Date()   
          return     
        }
        console.log("Es publico")
        this.dataListaPublico.lista[this.barraInferior.input.data.indice].texto=this.barraInferior.input.data.texto
        this.dataListaPublico.lista[this.barraInferior.input.data.indice].fechaActualizacion=new Date()     
        this.enviarPensamienroCrear(true)         
      },error=>{
        console.log(error)
        this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
      })
  }
  actualizarEstadoPensamiento = (itemPensamiento:ItemPensamiento) =>{
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    this.pensamientoNegocio.actualizarEstadoPensamiento(itemPensamiento.pensamiento.id)
    .subscribe(res=>{
      console.log('se actualizo estado del pensamiento')
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      console.log(res)
      if(!this.esPublico){
        this.dataListaPrivado.lista.splice(itemPensamiento.indice,1)
        return
      }      
      this.dataListaPublico.lista.splice(itemPensamiento.indice,1)
      //Agregar en la otra lista
    },error=>{
      console.log(error)
      this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
    })
  }
  eliminarPensamiento = (itemPensamiento:ItemPensamiento)=>{
    console.log(itemPensamiento)
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    this.pensamientoNegocio.eliminarPensamiento(itemPensamiento.pensamiento.id)
    .subscribe(res=>{
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      console.log(itemPensamiento)
      console.log(res)      
      if(!this.esPublico){
        this.dataListaPrivado.lista.splice(itemPensamiento.indice,1)
        return
      }      
      this.dataListaPublico.lista.splice(itemPensamiento.indice,1)
      //Agregar en la otra lista
    },error=>{
      console.log(error)
      this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
    })
  }
  cargarMasPensamientos(){
    if(this.variablesGlobales.paginacionPublico.actual!=-1){
      this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
//      this.pensamientoNegocio.cargarMasPensamientos(this.idPerfil,10,this.variablesGlobales.paginacionPublico.actual,this.esPrivado)
      this.pensamientoNegocio.cargarMasPensamientos(this.idPerfil,10,this.variablesGlobales.paginacionPublico.actual,true)
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
