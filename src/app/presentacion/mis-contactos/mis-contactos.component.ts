import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { Location } from '@angular/common';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { AppbarComponent } from 'src/app/compartido/componentes/appbar/appbar.component';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { DataBuscador } from 'src/app/compartido/componentes/buscador/buscador.component';
import { ItemResultadoBusqueda } from "../../dominio/modelo/item-resultado-busqueda"
import { CodigosCatalogoEntidad } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum';
import { pipe } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-mis-contactos',
  templateUrl: './mis-contactos.component.html',
  styleUrls: ['./mis-contactos.component.scss']
})
export class MisContactosComponent implements OnInit {
  @ViewChild('barra', { static: true }) appBar: AppbarComponent
  configuracionAppBar: ConfiguracionAppbarCompartida;
  perfilSeleccionado: PerfilModel
  datosBuscador: DataBuscador;


  constructor(
    private _location: Location,
    private cuentaNegocio: CuentaNegocio,
    private perfilNegocio: PerfilNegocio
  ) {

  }

  ngOnInit(): void {
    this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
    this.prepararDatosBuscador();
    this.appBar;
    this.prepararAppBar(this.cuentaNegocio.sesionIniciada());
  }

  prepararDatosBuscador() {
    this.datosBuscador = {
      disable: false,
      placeholder: "BUSCAR CONTACTOS",
      capturarPalabra: (palabra) => this.capturarPalabrasBuscador(palabra),
      reintentar: this.reitentarBusqueda
    }
  }

  buscarContactos(palabra: string) {
    this.appBar.buscador.mostrarProgreso(true);

    this.perfilNegocio.buscarPerfiles(palabra)
      .subscribe((res: PerfilModel[]) => {
        console.log(res)
        this.appBar.buscador.mostrarResultados<PerfilModel>(res, CodigosCatalogoEntidad.PERFIL);
      }, error => {
        this.appBar.buscador.mostrarError(error)
        console.log(error)
      })
  }

  capturarPalabrasBuscador(palabra: string) {
    console.log("la palabra es ", palabra)
    this.buscarContactos(palabra)
    //this.appBar.buscador.mostrarResultados(this.resultados);    
  }

  reitentarBusqueda() {
    console.log("voy a reintentar")
  }

  prepararAppBar(session: boolean) {
    if (session) {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
        searchBarAppBar: {
          mostrarDivBack: true,
          mostrarLineaVerde: true,
          mostrarTextoHome: true,
          mostrarBotonXRoja: false,
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
          nombrePerfil: {
            mostrar: true,
            llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre
          },
          configuracion: {
            mostrar: true,
            datos: this.datosBuscador
          },
          subtitulo: {
            mostrar: true,
            llaveTexto: "CONTACTOS " + this.perfilSeleccionado.nombreContacto
          }
        }
      }
    } else {
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

}
