import { Component, OnInit } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mis-contactos',
  templateUrl: './mis-contactos.component.html',
  styleUrls: ['./mis-contactos.component.scss']
})
export class MisContactosComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida;


  constructor(private _location: Location) {

  }

  ngOnInit(): void {
    this.prepararAppBar();
  }

  async prepararAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_DEMO_APPBAR,      
      demoAppbar: {        
        mostrarLineaVerde: true,
        subtitulo: {
          mostrar: true,
          llaveTexto: "DEMO"
        },
        nombrePerfil: {
          mostrar: false
        },
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100
      }

    }
  }

}
