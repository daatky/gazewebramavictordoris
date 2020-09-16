import { Component, OnInit, ViewChild } from '@angular/core';
import { AppbarComponent } from 'src/app/compartido/componentes/appbar/appbar.component';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { ItemCirculoComponent } from 'src/app/compartido/componentes/item-circulo/item-circulo.component';
import { PortadaGazeComponent } from 'src/app/compartido/componentes/portada-gaze/portada-gaze.component';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { TamanoPortadaGaze } from 'src/app/compartido/diseno/enums/tamano-portada-gaze.enum';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { UsoItemCircular, UsoItemRectangular } from 'src/app/compartido/diseno/enums/uso-item-cir-rec.enum';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { InfoAccionCirRec } from 'src/app/compartido/diseno/modelos/info-accion-cir-rec.interface';
import { ItemCircularCompartido, ItemRectangularCompartido } from 'src/app/compartido/diseno/modelos/item-cir-rec.interface';
import { PortadaGazeCompartido } from 'src/app/compartido/diseno/modelos/portada-gaze.interface';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { ParticipanteAsociacionModel } from 'src/app/dominio/modelo/participante-asociacion.model';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.scss']
})
export class VerPerfilComponent implements OnInit {
  @ViewChild('portadaGaze', { static: false }) portada: PortadaGazeComponent
  @ViewChild('barra', { static: true }) appBar: AppbarComponent
  botonContactos: BotonCompartido //Para enviar la configuracion del boton publico
  listaContactos:Array<ParticipanteAsociacionModel>
  configuracionAppBar: ConfiguracionAppbarCompartida //Para enviar la configuracion de para presentar el appBar
  perfilSeleccionado: PerfilModel  
  //confPortada: ItemCircularCompartido // Portada del album  
  confItemRec: ItemRectangularCompartido // Configuracion item del rectangulo
  fotoPerfil:UsoItemCircular
  fotoUsers:UsoItemCircular
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private perfilNegocio: PerfilNegocio,
    private generadorId: GeneradorId
  ) { }
  ngOnInit(): void {
    this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
    this.botonContactos = { text: this.internacionalizacionNegocio.obtenerTextoSincrono('misContactos'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.VERDE, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.enviarVistaContactos() }
    this.fotoUsers=UsoItemCircular.CIRCONTACTO
    this.fotoPerfil=UsoItemCircular.CIRPERFIL
    this.listaContactos=[]
    this.prepararAppBar()
    this.configurarAlbumGeneral()
    this.obtenerContactosInvitaciones()
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.portada) {
        this.configurarPortadaGaze()
      }
    })
  }
  prepararAppBar() {
    if (this.perfilSeleccionado) {
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
            llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre
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
    } else {
      console.log("OCURRIO UN ERROR")
    }
  }
  configurarPortada(url:string,usoItem:UsoItemCircular):ItemCircularCompartido {
    return {
      id: '',
      idInterno: this.generadorId.generarIdConSemilla(),
      usoDelItem: usoItem,
      esVisitante: false,
      urlMedia: url,
      /*idInterno: this.generadorId.generarIdConSemilla(),
      usoDelItem: UsoItemCircular.CIRPERFIL,
      esVisitante: false,
      urlMedia: '../../../../assets/recursos/fondos/cruz-negra-borrar.svg',*/
      activarClick: false,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
      //textoBoton: 'Chosen photos',
      eventoEnItem: this.accionItem,
      capaOpacidad: {
        mostrar: false
      },
      //fotoPredeterminadaRamdon:true
    }
  }
  obtenerContactosInvitaciones(){    
    this.listaContactos=[
      {
        perfil:{
          _id:"1",
          nombre:'Mayra Cango',      
          album:[
            {
              portada:{
                miniatura:{
                  url:"../../../../assets/recursos/fondos/fondo-camara-origen-foto.svg"
                }
              }              
            }]
        }
      },
      {
        perfil:{
          _id:"2",
          nombre:'Mayra Cango',
          album:[
            {
              portada:{
                miniatura:{
                  url:"../../../../assets/recursos/fondos/fondo-estrellas-cortado.svg"
                }
              }              
            }]
        }
      },
      {
        perfil:{
          _id:"3",
          nombre:'Mayra Cango',
          album:[
            {
              portada:{
                miniatura:{
                  url:"../../../../assets/recursos/fondos/forma-ambos-pensamientos.svg"
                }
              }              
            }]
        }
      },
      {
        perfil:{
          _id:"4",
          nombre:'Mayra Cango',
          album:[
            {
              portada:{
                miniatura:{
                  url:"../../../../assets/recursos/fondos/forma-mundo.png"
                }
              }              
            }]
        }
      },
      {
        perfil:{
          _id:"5",
          nombre:'Mayra Cango',
          album:[
            {
              portada:{
                miniatura:{
                  url:"../../../../assets/recursos/fondos/portada-gaze-completa.png"
                }
              }              
            }]
        }
      }
    ]
    //this.listaContactosItemCirculo.push({configurarPortada.})
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
  configurarAlbumGeneral() {
    this.confItemRec = {
      id: '',
      //idInterno: this.generadorId.generarIdConSemilla(),
      usoDelItem: UsoItemRectangular.RECPERFIL,
      esVisitante: false,
      //urlMedia: infoPortada.urlMedia,
      urlMedia: '../../../../assets/recursos/fondos/cruz-negra-borrar.svg',
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
      esBotonUpload: false
    }
  }
  capturarPalabrasBuscador(palabra: string) {

  }
  reitentarBusqueda() {

  }
  enviarVistaContactos(){
    console.log("Voy a enviar a la vista de contactos")
  }
}
