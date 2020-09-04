import { Component, OnInit } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';

@Component({
  selector: 'app-pensamiento',
  templateUrl: './pensamiento.component.html',
  styleUrls: ['./pensamiento.component.scss']
})
export class PensamientoComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida
  botonPublico: BotonCompartido
  botonPrivado: BotonCompartido
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {    
    this.prepararAppBar() 
    //console.log(this.internacionalizacionNegocio.obtenerIdiomaInternacionalizacion())  
   }

  ngOnInit(): void {  
    this.iniciarDatos()       
  }
  async prepararAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: true,
          llaveTexto:'PENDIENTE'
        },
        mostrarTextoBack: true,
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
  this.botonPublico = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('publico'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.cambiarEstado() }
  this.botonPrivado = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('privado'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.ROJO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.cambiarEstado() }
  }
  cambiarEstado(){
    console.log("VOY A CAMBIAR LOS ESTADOS")
  }
}
