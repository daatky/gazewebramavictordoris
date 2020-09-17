import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataBuscador } from 'src/app/compartido/componentes/buscador/buscador.component';
import { TipoMenu } from 'src/app/compartido/componentes/item-menu/item-menu.component';
import { ListaVerticalComponent } from 'src/app/compartido/componentes/lista-vertical/lista-vertical.component';
import { AnchoLineaItem } from 'src/app/compartido/diseno/enums/ancho-linea-item.enum';
import { ColorFondoItemMenu } from 'src/app/compartido/diseno/enums/color-fondo-item-menu.enum';
import { ColorFondoLinea } from 'src/app/compartido/diseno/enums/color-fondo-linea.enum';
import { EspesorLineaItem } from 'src/app/compartido/diseno/enums/espesor-linea-item.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { TamanoItemMenu } from 'src/app/compartido/diseno/enums/tamano-item-menu.enum';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { ItemMenuCompartido } from 'src/app/compartido/diseno/modelos/item-menu.interface';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { ItemMenuModel } from 'src/app/dominio/modelo/entidades/item-menu.model';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { RutasLocales } from 'src/app/rutas-locales.enum';
import { CatalogoTipoProyecto } from '../../nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-proyecto';

@Component({
  selector: 'app-menu-publicar-proyectos',
  templateUrl: './menu-publicar-proyectos.component.html',
  styleUrls: ['./menu-publicar-proyectos.component.scss']
})
export class MenuPublicarProyectosComponent implements OnInit {
  @ViewChild('listaVertical', { static: true }) listaVertical: ListaVerticalComponent
  configuracionAppBar: ConfiguracionAppbarCompartida;
  perfilSeleccionado: PerfilModel
  datosBuscador: DataBuscador;
  listaMenu: ItemMenuModel[]
  constructor(
    private cuentaNegocio: CuentaNegocio,
    private perfilNegocio: PerfilNegocio,
    private router: Router,
  ) {
    this.prepararItemsMenu();
  }

  ngOnInit(): void {
    this.inicializarDatos();
  }

  inicializarDatos() {
    if (this.cuentaNegocio.sesionIniciada()) {
      this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
      this.prepararAppBar(true);
    } else {
      this.prepararAppBar(false)
    }
    this.prepararDatosBuscador();
    this.listaVertical.configurarLista()
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
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920,
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
            llaveTexto: "publicar"
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

  prepararItemsMenu() {
    this.listaMenu = []

    this.listaMenu.push({
      id: CatalogoTipoProyecto.LOCAL,
      titulo: ["proyectos", "local"],
      //ruta: RutasLocales.MIS_CONTACTOS,
      tipo: TipoMenu.PUBLICAR_PROYECTOS,
    })
    this.listaMenu.push({
      id: CatalogoTipoProyecto.MUNDIAL,
      titulo: ["proyectos", "mundial"],
      //ruta: RutasLocales.MIS_CONTACTOS,
      tipo: TipoMenu.PUBLICAR_PROYECTOS,
    })
    this.listaMenu.push({
      id: CatalogoTipoProyecto.PAIS,
      titulo: ["proyectos", "pais"],
      //ruta: RutasLocales.MENU_PUBLICAR_PROYECTOS,
      tipo: TipoMenu.PUBLICAR_PROYECTOS,
    })
    this.listaMenu.push({
      id: CatalogoTipoProyecto.RED,
      titulo: ["proyectos", "red"],
      //ruta: RutasLocales.MODULO_PENSAMIENTO,
      tipo: TipoMenu.PUBLICAR_PROYECTOS,
    })

    //Agregar el ultimo item para informacion de proyectos.
    this.listaMenu.push(
      {
        id: MenuPublicarProyectos.PROYECTOS_INFORMACION,
        titulo: ["INFORMACION", "DE", "PROYECTOS"],
        tipo: TipoMenu.INFORMATION_PROYECTOS,
      }
    )
  }

  configurarItemMenu(item: ItemMenuModel): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEMMENUCREARPERFIL, // Indica el tamano del item (altura)
      colorFondo: ColorFondoItemMenu.PREDETERMINADO,
      texto1: item.titulo[0] ? item.titulo[0].toString() : null,
      texto2: item.titulo[1] ? item.titulo[1].toString() : null,
      texto3: item.titulo[2] ? item.titulo[2].toString() : null,
      tipoMenu: item.tipo,
      linea: {
        mostrar: true,
        configuracion: {
          ancho: (item.tipo == TipoMenu.INFORMATION_PROYECTOS) ? AnchoLineaItem.ANCHO6920 : AnchoLineaItem.ANCHO6382,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true,
          cajaGaze: false
        }
      },
      gazeAnuncios: false,
      idInterno: item.id,
      onclick: () => this.navegarSeccion(item.ruta),
      dobleClick: () => { }
    };
  }

  navegarSeccion(ruta: RutasLocales) {
    if (ruta) {
      this.router.navigateByUrl(ruta.toString());
    } else {
      //this.toast.abrirToast("No disponible, estamos construyendo esta sección");
      alert("no hay ruta");
    }
  }


}

export enum MenuPublicarProyectos {
  PROYECTOS_INFORMACION
}
