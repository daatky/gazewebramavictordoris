import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemCirculoComponent } from 'src/app/compartido/componentes/item-circulo/item-circulo.component';
import { PortadaGazeComponent } from 'src/app/compartido/componentes/portada-gaze/portada-gaze.component';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { TamanoPortadaGaze } from 'src/app/compartido/diseno/enums/tamano-portada-gaze.enum';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { UsoItemCircular } from 'src/app/compartido/diseno/enums/uso-item-cir-rec.enum';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { ItemCircularCompartido } from 'src/app/compartido/diseno/modelos/item-cir-rec.interface';
import { PortadaGazeCompartido } from 'src/app/compartido/diseno/modelos/portada-gaze.interface';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { PerfilModel } from 'src/app/dominio/modelo/entidades/perfil.model';
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.scss']
})
export class VerPerfilComponent implements OnInit {
  @ViewChild('portadaGaze', { static: false }) portada: PortadaGazeComponent
  configuracionAppBar: ConfiguracionAppbarCompartida //Para enviar la configuracion de para presentar el appBar
  perfilSeleccionado: PerfilModel
  generadorId: GeneradorId
  confPortada: ItemCircularCompartido // Portada del album
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio, 
    private perfilNegocio: PerfilNegocio
  ) { }
  ngOnInit(): void {
    this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
    this.prepararAppBar()
    this.configurarPortada()
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.portada) {
        this.configurarPortadaGaze()
      }
    })
  }
  prepararAppBar() {   
    if(this.perfilSeleccionado){
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
        searchBarAppBar: {
          nombrePerfil: {
            mostrar: true,
            llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre
          },
          configuracion: {
            mostrar: true,
            datos: {
              disable: true
            }
          },
          mostrarDivBack:{
            icono:true,
            texto:true
          },
          mostrarTextoHome: true,
          subtitulo: {
            mostrar: true,
            llaveTexto: this.internacionalizacionNegocio.obtenerTextoSincrono('miPerfil')
            //llaveTexto:"SIDAISDJIJ"
          },
          mostrarLineaVerde: true,
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
        }
      }
    }else{
      console.log("OCURRIO UN ERROR")
    }
  }
  configurarPortada() {
    this.confPortada = {
      id: '',
      //idInterno: this.generadorId.generarIdConSemilla(),
      usoDelItem: UsoItemCircular.CIRPERFIL,
      esVisitante: false,
      urlMedia: '../../../../assets/recursos/fondos/cruz-negra-borrar.svg',
      activarClick: false,
      activarDobleClick: false,
      activarLongPress: false,
      mostrarBoton: true,
      mostrarLoader: false,
      textoBoton: 'Chosen photos',
      eventoEnItem: this.accionItem,
      capaOpacidad: {
        mostrar: false
      },
      //fotoPredeterminadaRamdon:true
    }
  }
    // Configurar portada
    configurarPortadaGaze() {
      const configuracion: PortadaGazeCompartido = {
        tamano: TamanoPortadaGaze.PORTADACORTADA
      }
      this.portada.configuracionPortada = configuracion
    }
  accionItem(){
    console.log("Este es una accion")
  }
}
