import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppbarComponent } from 'src/app/compartido/componentes/appbar/appbar.component';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { ItemCirculoComponent } from 'src/app/compartido/componentes/item-circulo/item-circulo.component';
import { PortadaGazeComponent } from 'src/app/compartido/componentes/portada-gaze/portada-gaze.component';
import { ColorDeBorde, ColorDeFondo } from 'src/app/compartido/diseno/enums/item-cir-rec-colores.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { TamanoPortadaGaze } from 'src/app/compartido/diseno/enums/tamano-portada-gaze.enum';
import { EstiloItemPensamiento, TipoPensamiento } from 'src/app/compartido/diseno/enums/tipo-pensamiento.enum';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { UsoItemCircular, UsoItemRectangular } from 'src/app/compartido/diseno/enums/uso-item-cir-rec.enum';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { InfoAccionCirRec } from 'src/app/compartido/diseno/modelos/info-accion-cir-rec.interface';
import { ItemCircularCompartido, ItemRectangularCompartido } from 'src/app/compartido/diseno/modelos/item-cir-rec.interface';
import { PensamientoCompartido } from 'src/app/compartido/diseno/modelos/pensamiento';
import { PortadaGazeCompartido } from 'src/app/compartido/diseno/modelos/portada-gaze.interface';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { PensamientoModel } from 'src/app/dominio/modelo/entidades/pensamiento.model';
import { NoticiaModel } from 'src/app/dominio/modelo/noticia.model';
import { ParticipanteAsociacionModel } from 'src/app/dominio/modelo/participante-asociacion.model';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { ProyectoModel } from 'src/app/dominio/modelo/proyecto.model';
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service';
import { CodigosCatalogoTipoMedia } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalago-tipo-media.enum';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.scss']
})
export class VerPerfilComponent implements OnInit {
  @ViewChild('portadaGaze', { static: false }) portada: PortadaGazeComponent
  @ViewChild('barra', { static: true }) appBar: AppbarComponent
  botonContactos: BotonCompartido //Para enviar la configuracion del boton publico
  //listaContactos:Array<ParticipanteAsociacionModel>
  listaContactosItemCirdular:Array<ItemCircularCompartido>
  listaNoticiasItenRectangular:Array<ItemRectangularCompartido>
  listaProyectosItenRectangular:Array<ItemRectangularCompartido>
  configuracionAppBar: ConfiguracionAppbarCompartida //Para enviar la configuracion de para presentar el appBar
  perfilSeleccionado: PerfilModel  
  //confPortada: ItemCircularCompartido // Portada del album  
  //confItemRec: ItemRectangularCompartido // Configuracion item del rectangulo
  fotoPerfil:UsoItemCircular
  tipoItemRectangular:UsoItemRectangular
  pensamientoCompartido: PensamientoCompartido
  dataListaPensamientos: DatosLista
  idPerfil:string
  //listaPensamiento:Array<PensamientoModel>
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private perfilNegocio: PerfilNegocio,
    public generadorId: GeneradorId,
    private activatedRoute:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.iniciarDatos()    
    this.obtenerContactosInvitaciones()
    this.obtenerNoticias()
    this.obtenerProyectos()
    this.obtenerPensamientos()
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.portada) {
        this.configurarPortadaGaze()
      }
    })
  }
  iniciarDatos(){
    let tipoPerfil=""
    this.idPerfil=this.activatedRoute.snapshot.params.id
    if(!this.idPerfil){
      this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
      tipoPerfil=this.perfilSeleccionado.tipoPerfil.nombre
    }else{
      tipoPerfil="grupo"
      console.log("Parametro",this.idPerfil)
    }        
    this.botonContactos = { text: this.internacionalizacionNegocio.obtenerTextoSincrono('misContactos'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.VERDE, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.enviarVistaContactos() }
    this.pensamientoCompartido = { tipoPensamiento: TipoPensamiento.PENSAMIENTO_PERFIL, esLista: true, configuracionItem:{estilo:EstiloItemPensamiento.ITEM_CREAR_PENSAMIENTO} }
    //this.listaPensamiento=[]
    //this.dataListaPrivado = { tamanoLista: TamanoLista.TIPO_PENSAMIENTO_GESTIONAR, lista: [], cargarMas: () => this.cargarMasPensamientos(true) }
    this.dataListaPensamientos={lista:[],tamanoLista: TamanoLista.PENSAMIENTO_PERFIL}
    //this.fotoUsers=UsoItemCircular.CIRCONTACTO
    this.fotoPerfil=UsoItemCircular.CIRPERFIL
    this.tipoItemRectangular=UsoItemRectangular.RECPERFIL
    this.listaContactosItemCirdular=[]
    this.listaNoticiasItenRectangular=[]
    this.listaProyectosItenRectangular=[]  
    this.prepararAppBar(tipoPerfil)
  }
  prepararAppBar(tipoPerfil:string) {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
        searchBarAppBar: {
          mostrarDivBack: {
            icono: true,
            texto: true
          },
          mostrarTextoHome: true,
          mostrarLineaVerde: true,
          mostrarBotonXRoja: false,
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
          nombrePerfil: {
            mostrar: true,
            llaveTexto: tipoPerfil
          },
          configuracion: {
            mostrar: true,
            datos: {
              disable: true,
              placeholder: "BUSCAR CONTACTOS",
              capturarPalabra: (palabra) => this.capturarPalabrasBuscador(palabra),
              reintentar: this.reitentarBusqueda
            }
          },
          subtitulo: {
            mostrar: true,
            llaveTexto: this.internacionalizacionNegocio.obtenerTextoSincrono('miPerfil')
            //llaveTexto:"SIDAISDJIJ"
          },
        }
      }
  }
  configurarPortada<T>(url:string,usoItem:UsoItemCircular,id:string,data:T):ItemCircularCompartido {
    return {
      id: '',
      idInterno: id,
      usoDelItem: usoItem,
      esVisitante: false,      
      urlMedia: url,
      esBotonUpload:false,
      colorBorde:ColorDeBorde.BORDER_ROJO,
      colorDeFondo:ColorDeFondo.FONDO_BLANCO,
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
      //textoBoton: 'Chosen photos',
      eventoEnItem: this.accionItem,
      capaOpacidad: {
        mostrar: false
      },
      data:data
      //fotoPredeterminadaRamdon:true
    }
  }

  llenarListaContactosItemCircular(lista:Array<ParticipanteAsociacionModel>){
    if(lista){
     for (let i = 0; i < lista.length; i++) {        
        this.listaContactosItemCirdular.push(this.configurarPortada<ParticipanteAsociacionModel>(lista[i].perfil.album[0].portada.miniatura.url,UsoItemCircular.CIRCONTACTO,lista[i].perfil.id,lista[i]))
     } 
    }    
  }
  llenarListaNoticiasItemRectangular(lista:Array<NoticiaModel>){
    let esconderEsquina=false
    if(lista){
      for (let i = 0; i < lista.length; i++) {     
        if(lista[i].adjuntos[0] && lista[i].adjuntos[0].portada.tipo===CodigosCatalogoTipoMedia.TIPO_LINK.toString()){
          console.log("=====NOTICIA======")
          esconderEsquina=true
        }        
        this.listaNoticiasItenRectangular.push(this.configurarItemRectangular<NoticiaModel>(lista[i].adjuntos[0].portada.miniatura.url,UsoItemRectangular.RECPERFIL,lista[i].id,lista[i],esconderEsquina))
      }   
    } 
  }
  llenarListaProyectosItemRectangular(lista:Array<ProyectoModel>){
    let esconderEsquina=false
    if(lista){
      for (let i = 0; i < lista.length; i++) {
        //console.log(CodigosCatalogoTipoMedia.TIPO_LINK.toString())
        console.log(lista[i].adjuntos[0])
        if(lista[i].adjuntos[0] && lista[i].adjuntos[0].portada.tipo===CodigosCatalogoTipoMedia.TIPO_LINK.toString()){
          console.log("=====PROYECTO======")
          esconderEsquina=true
        }
        this.listaProyectosItenRectangular.push(this.configurarItemRectangular<ProyectoModel>(lista[i].adjuntos[0].portada.miniatura.url,UsoItemRectangular.RECPERFIL,lista[i].id,lista[i],esconderEsquina))
      }   
    }
  }
  //Para obtener los contactos o las initaciones de acuerdo a si un user entro a su perfikl o esta vinedo el perfil de alguien mas
  obtenerContactosInvitaciones(){    
    let listaContactos:Array<ParticipanteAsociacionModel>=[
      {
        perfil:{id:"1",nombre:'Mayra Cango',album:[{portada:{miniatura:{url:"../../../../assets/recursos/fondos/fondo-camara-origen-foto.svg"}}}]}
      },
      {
        perfil:{id:"2",nombre:'Mayra Cango',album:[{portada:{miniatura:{url:"../../../../assets/recursos/fondos/fondo-estrellas-cortado.svg"}}}]}
      },
      {
        perfil:{id:"3",nombre:'Mayra Cango',album:[{portada:{miniatura:{url:"../../../../assets/recursos/fondos/forma-ambos-pensamientos.svg"}}}]}
      },
      {
        perfil:{id:"4",nombre:'Mayra Cango',album:[{portada:{miniatura:{url:"../../../../assets/recursos/fondos/forma-mundo.png"}}}]}
      },
      {
        perfil:{id:"5",nombre:'Mayra Cango',album:[{portada:{miniatura:{url:"../../../../assets/recursos/fondos/portada-gaze-completa.png"}}}]}
      }
    ]
    this.llenarListaContactosItemCircular(listaContactos)
    //this.listaContactosItemCirculo.push({configurarPortada.})
  }
  obtenerNoticias(){
    let listaNoticias:Array<NoticiaModel>=[
      {
        id:'1', adjuntos:[{ portada:{miniatura:{url:'../../../../assets/recursos/fondos/fondo-camara-origen-foto.svg'},tipo:{codigo:'CATMED_1'}}}], tituloCorto:'TituloCorto1',fechaActualizacion:new Date()
      },
      {
        id:'2', adjuntos:[{portada:{miniatura:{url:'../../../../assets/recursos/fondos/portada-gaze-completa.png'}}}], tituloCorto:'TituloCorto2',fechaActualizacion:new Date()
      },
      {
        id:'3', adjuntos:[{portada:{miniatura:{url:'../../../../assets/recursos/fondos/fondo-camara-origen-foto.svg'}}}], tituloCorto:'TituloCorto3',fechaActualizacion:new Date()
      },      
    ]
    this.llenarListaNoticiasItemRectangular(listaNoticias)
  }
  obtenerProyectos(){
    let listaProyectos:Array<ProyectoModel>=[
      {                
        id:'1', adjuntos:[{ portada:{miniatura:{url:'../../../../assets/recursos/fondos/forma-ambos-pensamientos.svg'}}}], tituloCorto:'Proyecto1',fechaActualizacion:new Date()
      },
      {
        id:'2', adjuntos:[{ portada:{miniatura:{url:"../../../../assets/recursos/fondos/forma-mundo.png"},tipo:{codigo:'CATMED_1'}}}], tituloCorto:'Proyecto2',fechaActualizacion:new Date()
      },
      {
        id:'3', adjuntos:[{ portada:{miniatura:{url:'../../../../assets/recursos/fondos/forma-ambos-pensamientos.svg'}}}], tituloCorto:'Proyecto3',fechaActualizacion:new Date()
      },      
    ]
    this.llenarListaProyectosItemRectangular(listaProyectos)
  }
  obtenerPensamientos(){
    let listaPensamiento:Array<PensamientoModel>=[
      {
        id:'1',fechaActualizacion:new Date(),texto:'Pensamient publico para msx64si',
      },
      {
        id:'2',fechaActualizacion:new Date(),texto:'Pensamient publico para msax889ax',
      },
      {
        id:'3',fechaActualizacion:new Date(),texto:'Pensamient publico para mxaxsa56xi',
      },
      {
        id:'4',fechaActualizacion:new Date(),texto:'Pensamient publico para mxasxa2424i',
      }
    ]
    this.dataListaPensamientos.lista=listaPensamiento
  }
  accionItem() {
    console.log("Este es una accion")
  }
  eventoEnItem(data: InfoAccionCirRec) {
    console.log("Esta es la accion del rectangulo")
  }
  // Configurar portada
  configurarPortadaGaze() {
    const configuracion: PortadaGazeCompartido = {
      tamano: TamanoPortadaGaze.PORTADACORTADA
    }
    this.portada.configuracionPortada = configuracion
  }
  configurarItemRectangular<T>(url:string,usoItem:UsoItemRectangular,id:string,data:T,esconderEsquina:boolean):ItemRectangularCompartido {
    return {
      id: '',
      idInterno:id,
      usoDelItem: usoItem,
      esVisitante: false,
      colorBorde:ColorDeBorde.BORDER_NEGRO,
      colorDeFondo:ColorDeFondo.FONDO_BLANCO,
      //urlMedia: infoPortada.urlMedia,
      urlMedia: url,
      activarClick: true,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
      textoBoton: '',
      descripcion: '',
      mostrarIconoExpandirFoto: false,
      textoCerrarEditarDescripcion: '',
      mostrarCapaImagenSeleccionadaConBorde: false,
      eventoEnItem: (data: InfoAccionCirRec) => {
        this.eventoEnItem(data)
      },
      capaOpacidad: {
        mostrar: false
      },
      esBotonUpload: false,
      data:data,
      esconderEsquina:esconderEsquina
    }
  }
  capturarPalabrasBuscador(palabra: string) {

  }
  reitentarBusqueda() {

  }
  enviarVistaContactos(){
    console.log("Voy a enviar a la vista de contactos")
  }
  seleccionarPerfil(index:number){
    console.log(index)
  }
}
