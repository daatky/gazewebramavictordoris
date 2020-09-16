import { Component, OnInit } from '@angular/core';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.scss']
})
export class VerPerfilComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida //Para enviar la configuracion de para presentar el appBar
  perfilSeleccionado: PerfilModel
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio, 
  ) { }

  ngOnInit(): void {
    this.prepararAppBar()
  }
  prepararAppBar() {   
    console.log("AQUI") 
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: true,
          llaveTexto: "sodkoskodksod"
          //this.perfilSeleccionado.tipoPerfil.nombre
        },
        mostrarSearchBar: true,
        mostrarDivBack: true,
        mostrarTextoHome: true,
        subtitulo: {
          mostrar: true,
          llaveTexto: "sdisjidjs"
          //this.internacionalizacionNegocio.obtenerTextoSincrono('misReflexiones')          
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      }
    }

  }
}
