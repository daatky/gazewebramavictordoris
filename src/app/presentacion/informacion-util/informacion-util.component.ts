import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataBuscador } from 'src/app/compartido/componentes/buscador/buscador.component';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { EstiloDelTextoServicio } from 'src/app/nucleo/servicios/diseno/estilo-del-texto.service';
import { RutasLocales } from 'src/app/rutas-locales.enum';

@Component({
  selector: 'app-informacion-util',
  templateUrl: './informacion-util.component.html',
  styleUrls: ['./informacion-util.component.scss']
})
export class InformacionUtilComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida;
  perfilSeleccionado: PerfilModel
  datosBuscador: DataBuscador;
  rutaActual: RutasLocales
  informacionUtil: ItemInformacionUtil[]
  constructor
    (
      private cuentaNegocio: CuentaNegocio,
      private perfilNegocio: PerfilNegocio,
      private activatedRoute: ActivatedRoute,
      public estiloTexto: EstiloDelTextoServicio,
  ) { }

  ngOnInit(): void {
    this.obtenerInformacionAMostrar();
    this.obtenerRutaActual()
  }

  obtenerRutaActual() {
    this.activatedRoute.url.subscribe(
      (url) => {
        this.rutaActual = (RutasLocales.INFORMACION_UTIL_PROYECTOS == url[0].path)
          ? RutasLocales.INFORMACION_UTIL_PROYECTOS
          : RutasLocales.MENU_VER_PROYECTOS
        this.inicializarDatos();
      }
    );
  }

  inicializarDatos() {
    if (this.cuentaNegocio.sesionIniciada()) {
      this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
      this.prepararAppBar(true);
    } else {
      this.prepararAppBar(false)
    }
    this.prepararDatosBuscador();
  }

  prepararDatosBuscador() {
    this.datosBuscador = {
      disable: true,
    }
  }

  prepararAppBar(session: boolean) {
    if (session) {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
        searchBarAppBar: {
          mostrarDivBack: {
            icono: true,
            texto: true
          },
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
            llaveTexto: (this.rutaActual == RutasLocales.INFORMACION_UTIL_PROYECTOS) ? "USER INFO PROYECTOS" : "proyectos"
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
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920
        }

      }
    }
  }

  obtenerEstilosTexto(importante: boolean, tamano: string, espacio: boolean) {
    if (espacio) {
      return {
        'espacioPalabra': true
      }
    }

    let tamanoLetra;
    switch (tamano) {
      case 'p':
        tamanoLetra = this.estiloTexto.tamanoDeTextoConInterlineado.L3_I2;
        break;
      case 'g':
        tamanoLetra = this.estiloTexto.tamanoDeTextoConInterlineado.L4_I2;
        break;
    }

    return this.estiloTexto.obtenerEstilosTexto({
      color: this.estiloTexto.colorDelTexto.TEXTOLACRE,
      estiloTexto: (importante) ? this.estiloTexto.estilosDelTexto.BOLD : this.estiloTexto.estilosDelTexto.REGULAR,
      enMayusculas: false,
      tamanoConInterlineado: tamanoLetra
    })
  }

  obtenerInformacionAMostrar() {
    this.informacionUtil = [
      {
        descripcion: "1",
        importante: true,
        tamano: "g"
      },
      {
        descripcion: " 1,78 projects for their likely execution. Those getting to the top are automatically chosen in regard to their dissemination in the web, votes for that have received (YES) and accumulated money in the trust account.",
        importante: false,
        tamano: "p"
      },
      {
        espacio: true
      },
      {
        descripcion: "2",
        importante: true,
        tamano: "g"
      },
      {
        descripcion: "The algorithm has pre-set times:",
        importante: true,
        tamano: "p"
      },
      {
        descripcion: "- Projects are defined every 4 months. They circulate in the web for three months without appearing in the algorithm which remains hidden. Users can vote once per profile and per project (One user with 3 profiles can vote three times the same project). At the beginning of the fourth month, the algorithm is published with a maximum of 50 pre-classified projects. Forums interaction and new voting possibilities are open.",
        importante: false,
        tamano: "p"
      },
      {
        descripcion: " - Our algorithm requires the user to have the postal code registered in any of the chosen profiles. If the votes for one project come from the same locality, the annual fees and money donations will be respected in their geographical context and for a specific project.",
        importante: false,
        tamano: "p"
      },
      {
        espacio: true
      },
      {
        descripcion: "3",
        importante: true,
        tamano: "g"
      },
      {
        descripcion: "- Similar or identical projects are usually born from one or more users. Therefore, they do not have owner, regardless of the date when they were published. We recommend to use the search box to find those similar projects, associate with their authors, and obtain more possibilities to reach to top. In this case, it is preferable to ERASE the different projects that were proposed separately and create one new group; this one guided by the “ideal” chosen user.",
        importante: false,
        tamano: "p"
      },
      {
        descripcion: "- Every project comes with its complete history and beginning date, including authors and co-authors with their opinions and ideas about the topic (Every user who collaborates with any idea in a project is considered a “Co-author”).",
        importante: false,
        tamano: "p"
      }
    ]
  }

}

export interface ItemInformacionUtil {
  descripcion?: string,
  importante?: boolean,
  tamano?: 'p' | 'g',
  espacio?: boolean
}
