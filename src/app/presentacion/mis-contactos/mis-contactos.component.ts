import { Component, OnInit, ViewChild } from "@angular/core";
import { ConfiguracionAppbarCompartida } from "src/app/compartido/diseno/modelos/appbar.interface";
import { UsoAppBar } from "src/app/compartido/diseno/enums/uso-appbar.enum";
import { TamanoColorDeFondoAppBar } from "src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum";
import { Location } from "@angular/common";
import { CuentaNegocio } from "src/app/dominio/logica-negocio/cuenta.negocio";
import { AppbarComponent } from "src/app/compartido/componentes/appbar/appbar.component";
import { PerfilModel } from "src/app/dominio/modelo/perfil.model";
import { PerfilNegocio } from "src/app/dominio/logica-negocio/perfil.negocio";
import { DataBuscador } from "src/app/compartido/componentes/buscador/buscador.component";
import { ItemResultadoBusqueda } from "../../dominio/modelo/item-resultado-busqueda";
import { CodigosCatalogoEntidad } from "src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum";
import { pipe } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { DatosLista } from "src/app/compartido/diseno/modelos/datos-lista.interface";
import { TamanoLista } from "src/app/compartido/diseno/enums/tamano-lista.enum";
import {
  ParticipanteAsociacionModel,
  ParticipanteAsosiacionMapperResultadoBusqueda,
} from "src/app/dominio/modelo/participante-asociacion.model";
import { AsociacionNegocio } from "../../dominio/logica-negocio/asociacion.negocio";
import {
  ItemCircularComponent,
  ItemCirularCompartido,
} from "src/app/compartido/componentes/item-circular/item-circular.component";
import { ItemContactoCompartido } from "src/app/compartido/componentes/item-contacto/item-contacto.component";

@Component({
  selector: "app-mis-contactos",
  templateUrl: "./mis-contactos.component.html",
  styleUrls: ["./mis-contactos.component.scss"],
})
export class MisContactosComponent implements OnInit {
  @ViewChild("barra", { static: true })
  appBar: AppbarComponent;
  configuracionAppBar: ConfiguracionAppbarCompartida;
  perfilSeleccionado: PerfilModel;
  datosBuscador: DataBuscador;
  dataListaMisContacto: DatosLista;
  misContactoLista: ParticipanteAsociacionModel[];
  listaItemContacto: ItemContactoCompartido[];

  constructor(
    private _location: Location,
    private cuentaNegocio: CuentaNegocio,
    private perfilNegocio: PerfilNegocio,
    private asociacionNegocio: AsociacionNegocio,
  ) {
  }

  ngOnInit(): void {
    this.inicializarDatos();
  }

  inicializarDatos() {
    if (this.cuentaNegocio.sesionIniciada()) {
      this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado();
      this.prepararAppBar(true);
      this.obtenerMisContactos();
    } else {
      this.prepararAppBar(false);
    }
    this.prepararDatosBuscador();
    this.preperarListaMisContactos();
  }

  //Obtener mis contactos
  obtenerMisContactos() {
    this.asociacionNegocio.obtenerMisContactos(this.perfilSeleccionado.id)
      .subscribe(
        (res) => {
          this.misContactoLista = res;
          this.preprarConfiguracionContacto(this.misContactoLista);
        },
        (error) => {
          console.log("error contactos", error);
        },
      );
  }

  obtenerConfiguracionContacto(idContacto: string) {
    return this.listaItemContacto.find((it) => it.contacto.id = idContacto);
  }

  preprarConfiguracionContacto(contactos: ParticipanteAsociacionModel[]) {
    this.listaItemContacto = [];
    for (let contacto of contactos) {
      this.listaItemContacto.push({
        contacto: contacto,
        cargando: true,
      });
    }
  }

  preperarListaMisContactos() {
    this.dataListaMisContacto = {
      cargando: false,
      reintentar: () => {},
      tamanoLista: TamanoLista.CONTACTOS,
    };
  }

  prepararDatosBuscador() {
    this.datosBuscador = {
      disable: false,
      placeholder: "BUSCAR CONTACTOS",
      capturarPalabra: (palabra) => this.capturarPalabrasBuscador(palabra),
      reintentar: this.reitentarBusqueda,
    };
  }

  buscarContactos(palabra: string) {
    this.appBar.buscador.mostrarProgreso(true);

    this.perfilNegocio.buscarPerfiles(palabra)
      .subscribe((res: PerfilModel[]) => {
        console.log(res);
        this.appBar.buscador.mostrarResultados<PerfilModel>(
          res,
          CodigosCatalogoEntidad.PERFIL,
          true,
        );
      }, (error) => {
        this.appBar.buscador.mostrarError(error);
        console.log(error);
      });
  }

  capturarPalabrasBuscador(palabra: string) {
    console.log("la palabra es ", palabra);
    this.buscarContactos(palabra);
    //this.appBar.buscador.mostrarResultados(this.resultados);
  }

  reitentarBusqueda() {
    console.log("voy a reintentar");
  }

  prepararAppBar(session: boolean) {
    if (session) {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
        searchBarAppBar: {
          mostrarDivBack: {
            icono: true,
            texto: true,
          },
          mostrarLineaVerde: true,
          mostrarTextoHome: true,
          mostrarBotonXRoja: false,
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
          nombrePerfil: {
            mostrar: true,
            llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre,
          },
          configuracion: {
            mostrar: true,
            datos: this.datosBuscador,
          },
          subtitulo: {
            mostrar: true,
            llaveTexto: "CONTACTOS " + this.perfilSeleccionado.nombreContacto,
          },
        },
      };
    } else {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_DEMO_APPBAR,
        demoAppbar: {
          mostrarLineaVerde: true,
          subtitulo: {
            mostrar: true,
            llaveTexto: "DEMO",
          },
          nombrePerfil: {
            mostrar: false,
          },
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
        },
      };
    }
  }
}
