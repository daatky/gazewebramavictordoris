import { Component, OnInit } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { ItemMenuModel, ItemSubMenu } from '../../dominio/modelo/item-menu.model';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { ItemMenuCompartido } from 'src/app/compartido/diseno/modelos/item-menu.interface';
import { TamanoItemMenu } from 'src/app/compartido/diseno/enums/tamano-item-menu.enum';
import { ColorFondoItemMenu } from 'src/app/compartido/diseno/enums/color-fondo-item-menu.enum';
import { TipoMenu } from 'src/app/compartido/componentes/item-menu/item-menu.component';
import { AnchoLineaItem } from 'src/app/compartido/diseno/enums/ancho-linea-item.enum';
import { EspesorLineaItem } from 'src/app/compartido/diseno/enums/espesor-linea-item.enum';
import { ColorFondoLinea } from 'src/app/compartido/diseno/enums/color-fondo-linea.enum';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RutasLocales } from 'src/app/rutas-locales.enum';



@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida;
  listaMenu: ItemMenuModel[]
  itemSubMenu: ItemSubMenu;
  dataLista: DatosLista = {
    cargando: false,
    reintentar: () => { },
    tamanoLista: TamanoLista.TIPO_MENU_PRINCIPAL
  }
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private _location: Location,
    private router: Router,
  ) {
    this.prepararAppBar();
    this.prepararItemsMenu();
    this.prepararDataSubMenu();
  }

  ngOnInit(): void {

  }



  async prepararAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_GAZE_BAR,
      //accionAtras: () => this.volverAtras(),
      gazeAppBar: {
        tituloPrincipal: {
          mostrar: true,
          llaveTexto: "My PROFILE"
        },
        subtituloDemo: {
          mostrar: true,
          llaveTexto: "DEMO"
        },
        mostrarBotonXRoja: false,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920
      }
    }
  }

  volverAtras() {
    this._location.back();
  }

  async prepararItemsMenu() {
    this.listaMenu = [
      {
        id: MenuPrincipal.MIS_PENSAMIENTOS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("MY PENSAMIENTOS"),
        subtitulo: ""
      },
      {
        id: MenuPrincipal.MIS_CONTACTOS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("misContactos"),
        subtitulo: "",
        ruta: RutasLocales.MIS_CONTACTOS
      },
      {
        id: MenuPrincipal.PUBLICAR,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("publicar"),
        subtitulo: ""
      },
      {
        id: MenuPrincipal.PROYECTOS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("proyectos"),
        subtitulo: ""
      },
      {
        id: MenuPrincipal.NOTICIAS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("noticiasEnlaces"),
        subtitulo: ""
      },
      {
        id: MenuPrincipal.COMPRAS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("comprarPermutar"),
        subtitulo: ""
      },
      {
        id: MenuPrincipal.FINANZAS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("finanzas"),
        subtitulo: ""
      },
      {
        id: MenuPrincipal.ANUNCIOS,
        titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("gazelookAnuncios"),
        subtitulo: ""
      },
    ]
  }

  prepararItemMenu(item: ItemMenuModel): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEM_MENU_GENERAL, // Indica el tamano del item (altura)
      colorFondo: (item.id == MenuPrincipal.ANUNCIOS) ? ColorFondoItemMenu.TRANSPARENTE : ColorFondoItemMenu.PREDETERMINADO,
      texto1: item.titulo,
      tipoMenu: TipoMenu.ACCION,
      linea: {
        mostrar: true,
        configuracion: {
          ancho: (item.id == MenuPrincipal.ANUNCIOS || item.id == MenuPrincipal.FINANZAS) ? AnchoLineaItem.ANCHO6028 : AnchoLineaItem.ANCHO6382,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true
        }
      },
      gazeAnuncios: item.id == MenuPrincipal.ANUNCIOS,
      idInterno: item.id,
      onclick: () => this.navigationSubMenu(item.ruta),
      dobleClick: () => { }
    };
  }

  async prepararDataSubMenu() {
    this.itemSubMenu = {
      id: "puntos",
      titulo: "",
      mostrarDescripcion: false,
      menus: [
        {
          id: "mya",
          titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("miCuenta"),
          action: () => { },
        },
        {
          id: "cont",
          titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("contactenos"),
          action: () => { },
        },
        {
          id: "he",
          titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("ayuda"),
          action: () => { },
        },
        {
          id: "faq",
          titulo: "FAQ",
          action: () => { },
        },
        {
          id: "our",
          titulo: "Our Goals",
          action: () => { },
        },
        {
          id: "web",
          titulo: "WebSite",
          action: () => { },
        },
        {
          id: "mya",
          titulo: "Inverntar 1",
          action: () => { },
        }
      ]
    }
  }

  navigationSubMenu(ruta: RutasLocales) {
    this.router.navigateByUrl(ruta.toString());
  }

  prepararItemSubMenu(item: ItemSubMenu): ItemMenuCompartido {
    return {
      id: '',
      submenus: item.menus ? item.menus : [],
      mostrarDescripcion: item.mostrarDescripcion,
      tamano: TamanoItemMenu.ITEM_MENU_GENERAL, // Indica el tamano del item (altura)
      colorFondo: ColorFondoItemMenu.PREDETERMINADO,
      texto1: item.titulo,
      tipoMenu: TipoMenu.SUBMENU,
      linea: {
        mostrar: true,
        configuracion: {
          ancho: AnchoLineaItem.ANCHO6920,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true
        }
      },
      gazeAnuncios: false,
      idInterno: item.id,
      onclick: () => this.mostrarDescripcion(item),
      dobleClick: () => { }
    };

  }

  mostrarDescripcion(item: any) {
    const elemento: HTMLElement = document.getElementById('flecha' + item.id) as HTMLElement;
    if (item.mostrarDescripcion) {
      item.mostrarDescripcion = false;
      elemento.classList.remove("rotar-flecha")
    } else {
      item.mostrarDescripcion = true;
      elemento.classList.add("rotar-flecha");
    }
  }
}

export enum MenuPrincipal {
  MIS_PENSAMIENTOS,
  MIS_CONTACTOS,
  PUBLICAR,
  PROYECTOS,
  NOTICIAS,
  COMPRAS,
  FINANZAS,
  ANUNCIOS
}
