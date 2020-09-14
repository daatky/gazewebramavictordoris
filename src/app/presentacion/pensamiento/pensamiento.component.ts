import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { BarraInferior } from 'src/app/compartido/diseno/modelos/barra-inferior.interfce';
import { TipoInput } from 'src/app/compartido/diseno/enums/tipo-input.enum';
import { PensamientoNegocio } from 'src/app/dominio/logica-negocio/pensamiento.negocio';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { PensamientoCompartido, ItemPensamiento } from 'src/app/compartido/diseno/modelos/pensamiento';
import { ConfiguracionToast } from 'src/app/compartido/diseno/modelos/toast.interface';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { TipoPensamiento, EstiloItemPensamiento } from 'src/app/compartido/diseno/enums/tipo-pensamiento.enum';
import { ToastComponent } from 'src/app/compartido/componentes/toast/toast.component';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';

@Component({
  selector: 'app-pensamiento',
  templateUrl: './pensamiento.component.html',
  styleUrls: ['./pensamiento.component.scss']
})
export class PensamientoComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: ToastComponent
  configuracionAppBar: ConfiguracionAppbarCompartida //Para enviar la configuracion de para presentar el appBar
  botonPublico: BotonCompartido //Para enviar la configuracion del boton publico
  botonPrivado: BotonCompartido //Para enviar la configuracion del boton privado
  barraInferior: BarraInferior //Barra inferior
  cargando: boolean; //PRESENTAR EL CARGANDO
  pensamientoCompartido: PensamientoCompartido
  dataListaPublico: DatosLista //lISTA DE  
  dataListaPrivado: DatosLista //lISTA DE  
  botonCrearPensamiento: BotonCompartido;
  esPublico: boolean; //Para enviar a la base de datos true o false de acuerdo a lo seleccionado por el usuario
  ejecutarMetodo: true //PARA SABER CUAL DE LOS METODOS SE VAN A EJECUTAR
  configuracionToast: ConfiguracionToast; //Presentar el toats
  perfilSeleccionado: PerfilModel
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,    
    private pensamientoNegocio: PensamientoNegocio,
    private perfilNegocio: PerfilNegocio
  ) {
    this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
    this.esPublico = true
    this.prepararAppBar()
  }

  ngOnInit(): void {
    this.cargando = true
    this.iniciarDatos()
  }
  prepararAppBar() {
    this.cargando = false
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: true,
          llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre
        },
        mostrarSearchBar: true,
        mostrarDivBack: true,
        mostrarTextoHome: true,
        subtitulo: {
          mostrar: true,
          llaveTexto: this.internacionalizacionNegocio.obtenerTextoSincrono('misReflexiones')
          //llaveTexto:"SIDAISDJIJ"
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      }
    }

  }
  iniciarDatos() {
    this.enviarPensamienroCrear(false)
    this.seleccionarPensamientoMostrar(0)
    this.botonPublico = { text: this.internacionalizacionNegocio.obtenerTextoSincrono('publico'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: (param) => this.cambiarEstado(1) }
    this.botonPrivado = { text: this.internacionalizacionNegocio.obtenerTextoSincrono('privado'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.ROJO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: (param) => this.cambiarEstado(2) }    
    this.botonCrearPensamiento = { text: 'Enviar', tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: this.crearPensamiento }
    this.configuracionToast = { cerrarClickOutside: false, mostrarLoader: false, mostrarToast: false, texto: "" }
    //this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}    
  }
  //Cuando se le presenta la pagina principal y tiene que seleccionar un tipo de pensamiento(PensamientoCompartido)
  cambiarEstado(param: number) {
    this.barraInferior.activarBarra = true
    this.enviarPensamienroCrear(true)
    this.seleccionarPensamientoMostrar(param)
  }
  //Selecciona el tipo de diseno del pensamiento que se va a mostrar privado, publico, o por defecto
  seleccionarPensamientoMostrar(data: number) {
    switch (data) {
      case 0:
        this.cargando = false
        this.pensamientoCompartido = { tipoPensamiento: TipoPensamiento.PENSAMIENTO_SIN_SELECCIONAR, configuracionItem: { estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO }, subtitulo: false }
        this.dataListaPublico = { tamanoLista: TamanoLista.TIPO_PENSAMIENTO_GESTIONAR, lista: [], cargarMas: () => this.cargarMasPensamientos() }
        this.dataListaPrivado = { tamanoLista: TamanoLista.TIPO_PENSAMIENTO_GESTIONAR, lista: [], cargarMas: () => this.cargarMasPensamientos() }
        break;
      case 1:
        this.cargando = true
        this.esPublico = true
        this.pensamientoCompartido = { esLista: true, tipoPensamiento: TipoPensamiento.PENSAMIENTO_PUBLICO_CREACION, configuracionItem: { estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO, presentarX: true }, subtitulo: true }
        //this.obtenerPensamientos() 
        this.cargarMasPensamientos()
        break;
      case 2:
        this.cargando = true
        this.esPublico = false
        this.pensamientoCompartido = { esLista: true, tipoPensamiento: TipoPensamiento.PENSAMIENTO_PRIVADO_CREACION, configuracionItem: { estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO, presentarX: true }, subtitulo: true }
        //this.obtenerPensamientos()
        this.cargarMasPensamientos()
        break;
      default:
        this.cargando = false
        this.pensamientoCompartido = { tipoPensamiento: TipoPensamiento.PENSAMIENTO_SIN_SELECCIONAR, configuracionItem: { estilo: EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO }, subtitulo: false }
        break;
    }
  }
  unClick(itemPensamiento: ItemPensamiento) {
    this.eliminarPensamiento(itemPensamiento)
  }

  dobleClick(itemPensamiento: ItemPensamiento) {
    this.enviarPensamientoActualizar(itemPensamiento)
  }
  clickLargo(itemPensamiento?: ItemPensamiento) {
    this.actualizarEstadoPensamiento(itemPensamiento)
  }
  //Metodo que para inicializar la barra inferior y ademas sirve para enviar el meto de crear cuenta
  enviarPensamienroCrear(activar: boolean) {
    this.barraInferior = { input: { maximo: 230, placeholder: "Ingrese un pensamiento", data: { texto: "" }, tipo: TipoInput.TEXTO }, activarBarra: activar, variosIconos: false, enviar: () => this.crearPensamiento() }
  }
  crearPensamiento() {
    this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesando'), true)
    this.pensamientoNegocio.crearPensamiento(this.perfilSeleccionado._id, this.esPublico, this.barraInferior.input.data.texto)
      .subscribe(res => {
        this.toast.cerrarToast()
        if (!this.esPublico) {
          this.dataListaPrivado.lista.unshift(res)
          return
        }
        this.dataListaPublico.lista.unshift(res)
      }, error => {
        this.toast.cerrarToast()
        this.toast.abrirToast(error)
      })
  }
  /*obtenerPensamientos(){
    this.pensamientoNegocio.obtenerPensamientos(this.perfilSeleccionado._id,this.esPublico)
    .subscribe((res:Array<PensamientoModel>)=>{      
      this.cargando=false     
      if(this.esPublico){        
          this.dataListaPublico.lista=res
        return
      }
      this.dataListaPrivado.lista=res
    },error=>{
      this.cargando=false 
      if(this.esPublico){ 
        this.dataListaPublico={tamanoLista:TamanoLista.TIPO_PENSAMIENTO_GESTIONAR,lista:this.dataListaPublico.lista,cargarMas: ()=>this.cargarMasPensamientos(),error:error}  
        return
      } 
      this.dataListaPublico={tamanoLista:TamanoLista.TIPO_PENSAMIENTO_GESTIONAR,lista:this.dataListaPrivado.lista,cargarMas: ()=>this.cargarMasPensamientos(),error:error}  
      //this.toast.abrirToast(error)
    })
  }*/

  //Para enviar el texto para que se presente el input de la barra inferior
  enviarPensamientoActualizar = (itemPensamiento: ItemPensamiento) => {
    this.barraInferior = { input: { maximo: 230, placeholder: "Ingrese un pensamiento", data: { id: itemPensamiento.pensamiento.id, indice: itemPensamiento.indice, texto: itemPensamiento.pensamiento.texto }, tipo: TipoInput.TEXTO }, activarBarra: true, variosIconos: false, enviar: () => this.actualizarPensamiento() }
  }
  actualizarPensamiento() {
    this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesando'), true)
    this.pensamientoNegocio.actualizarPensamiento(this.barraInferior.input.data.id, this.barraInferior.input.data.texto)
      .subscribe(res => {
        this.toast.cerrarToast()
        if (!this.esPublico) {
          this.dataListaPrivado.lista[this.barraInferior.input.data.indice].texto = this.barraInferior.input.data.texto
          this.dataListaPrivado.lista[this.barraInferior.input.data.indice].fechaActualizacion = new Date()
          return
        }
        this.dataListaPublico.lista[this.barraInferior.input.data.indice].texto = this.barraInferior.input.data.texto
        this.dataListaPublico.lista[this.barraInferior.input.data.indice].fechaActualizacion = new Date()
        this.enviarPensamienroCrear(true)
      }, error => {
        this.toast.cerrarToast()
        this.toast.abrirToast(error)
      })
  }
  actualizarEstadoPensamiento = (itemPensamiento: ItemPensamiento) => {
    this.enviarPensamienroCrear(true)
    this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesando'), true)
    this.pensamientoNegocio.actualizarEstadoPensamiento(itemPensamiento.pensamiento.id)
      .subscribe(res => {
        this.toast.cerrarToast()
        this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesoEjecutado'))
        if (!this.esPublico) {
          this.dataListaPrivado.lista.splice(itemPensamiento.indice, 1)
          this.dataListaPublico.lista.unshift(itemPensamiento.pensamiento)
          console.log("Se agrego en lista publica")
          console.log(this.dataListaPublico)
          console.log("sE QUITO EN LA LISTA PRIVADA")
          console.log(this.dataListaPrivado)
          return
        }
        this.dataListaPublico.lista.splice(itemPensamiento.indice, 1)
        this.dataListaPrivado.lista.unshift(itemPensamiento.pensamiento)
        console.log("Se agrego en lista privada")
        console.log(this.dataListaPrivado)
        console.log("sE QUITO EN LA LISTA PUBLICA")
        console.log(this.dataListaPublico)
      }, error => {
        this.toast.cerrarToast()
        this.toast.abrirToast(error)
      })
  }
  eliminarPensamiento = (itemPensamiento: ItemPensamiento) => {
    this.enviarPensamienroCrear(true)
    this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesando'), true)
    this.pensamientoNegocio.eliminarPensamiento(itemPensamiento.pensamiento.id)
      .subscribe(res => {
        this.toast.cerrarToast()
        this.toast.abrirToast(this.internacionalizacionNegocio.obtenerTextoSincrono('procesoEjecutado'))
        if (!this.esPublico) {
          this.dataListaPrivado.lista.splice(itemPensamiento.indice, 1)
          return
        }
        this.dataListaPublico.lista.splice(itemPensamiento.indice, 1)
      }, error => {
        this.toast.cerrarToast()
        this.toast.abrirToast(error)
      })
  }
  cargarMasPensamientos() {
      this.cargando = false
      let listaMomentanea=[]
      this.pensamientoNegocio.cargarMasPensamientos(this.perfilSeleccionado._id, 3, this.esPublico)
        .subscribe(res => {
          console.log(res)
          if(res===null){
            console.log("No tengo MAS que cargar")
          }else{
            if (!this.esPublico) {
              listaMomentanea=this.dataListaPrivado.lista
              //this.dataListaPrivado.lista.push(...res)
              this.dataListaPrivado.lista.push(this.pensamientoNegocio.verificarDuplicidadDatos(listaMomentanea,res,this.esPublico))
              console.log(this.dataListaPrivado.lista)              
              return
            }
            listaMomentanea=this.dataListaPublico.lista
            this.dataListaPublico.lista.push(this.pensamientoNegocio.verificarDuplicidadDatos(listaMomentanea,res,this.esPublico))
            //this.dataListaPublico.lista.push(...res)
            console.log(this.dataListaPublico.lista)    
            this.pensamientoNegocio.verificarDuplicidadDatos(listaMomentanea,res,this.esPublico)        
          }
        }, error => {
          this.cargando = false
        })    
  }
}
