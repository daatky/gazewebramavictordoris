import { CodigosCatalogoTipoProyecto } from './../../nucleo/servicios/remotos/codigos-catalogos/codigos-catalogo-tipo-proyecto.enum';
import { RutasProyectos } from './../proyectos/rutas-proyectos.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { ItemMenuModel, ItemSubMenu, ItemAccion } from '../../dominio/modelo/entidades/item-menu.model';
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
import { Router, ActivatedRoute } from '@angular/router';
import { RutasLocales } from 'src/app/rutas-locales.enum';
import { Catalogo } from 'src/app/nucleo/servicios/remotos/rutas/catalogos.enum';
import { CatalogoTipoPerfilModel } from '../../dominio/modelo/catalogos/catalogo-tipo-perfil.model';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';
import { ignoreElements } from 'rxjs/operators';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { ConfiguracionToast } from 'src/app/compartido/diseno/modelos/toast.interface';
import { ToastComponent } from 'src/app/compartido/componentes/toast/toast.component';
import { AccionProyecto } from '../proyectos/publicar/publicar.component';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  @ViewChild('toast', { static: false }) toast: ToastComponent
  configuracionAppBar: ConfiguracionAppbarCompartida;
  listaMenu: ItemMenuModel[]
  itemSubMenu3Puntos: ItemSubMenu;
  itemMenuMultipleAccion: ItemMenuModel;
  sesionIniciada = false;
  dataLista: DatosLista = {
    cargando: false,
    reintentar: () => { },
    tamanoLista: TamanoLista.TIPO_MENU_PRINCIPAL
  }
  perfilSeleccionado: PerfilModel
  configuracionToast: ConfiguracionToast

  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private perfilNegocio: PerfilNegocio,
    private cuentaNegocio: CuentaNegocio,
  ) {
    this.prepararItemsMenu();
    this.prepararDataSubMenu3puntos();
    this.prepararDatosParaMenuMultipleAccion();
    this.configurarToast()
  }

  ngOnInit(): void {
    this.inicializarDatos();
  }

  inicializarDatos() {
    if (this.cuentaNegocio.sesionIniciada()) {
      this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado();
      this.prepararAppBar(true)
    } else {
      this.prepararAppBar(false)
    }
  }

  configurarToast() {
    this.configuracionToast = {
      cerrarClickOutside: false,
      bloquearPantalla: false,
      mostrarLoader: false,
      mostrarToast: false,
      texto: ""
    }
  }


  async prepararAppBar(session: boolean) {
    if (session) {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_GAZE_BAR,
        gazeAppBar: {
          tituloPrincipal: {
            mostrar: true,
            llaveTexto: "My PROFILE"
          },
          subtituloNormal: {
            mostrar: true,
            llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre
          },
          mostrarBotonXRoja: true,
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920,
          clickTituloPrincipal:()=>this.navigationSubMenu(RutasLocales.PERFIL)
        }
      }
    } else {
      this.configuracionAppBar = {
        usoAppBar: UsoAppBar.USO_GAZE_BAR,
        gazeAppBar: {
          tituloPrincipal: {
            mostrar: true,
            llaveTexto: "My PROFILE"
          },
          subtituloDemo: {
            mostrar: true,
            llaveTexto: "demo"
          },
          mostrarBotonXRoja: false,
          tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920,
          clickTituloPrincipal:()=>this.navigationSubMenu(RutasLocales.PERFIL)
        }
      }
    }

  }
  obtenerTituloPrincipal(profileCreated: boolean) {
    if (profileCreated) {
      return {
        mostrar: true,
        llaveTexto: this.perfilSeleccionado.tipoPerfil.nombre
      }
    } else {
      return {
        mostrar: true,
        llaveTexto: "demo"
      }
    }
  }

  navigationSubMenuParametros(rutasLocales:RutasLocales,paramAntiguo:string,paramNuevo:string){
    let variable=rutasLocales.toString()
    if (rutasLocales) {
      this.router.navigateByUrl(variable.replace(paramAntiguo,paramNuevo));
    } else {
      this.toast.abrirToast("No disponible, estamos construyendo esta sección");
    }
  }

  async prepararItemsMenu() {
    this.listaMenu = [
      {
        id: MenuPrincipal.MIS_PENSAMIENTOS,
        titulo: ["publicar", "mis", "pensamientos"],
        ruta: RutasLocales.MODULO_PENSAMIENTO,
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.MIS_CONTACTOS,
        titulo: ["mis", "contactos"],
        ruta: RutasLocales.MIS_CONTACTOS,
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.PUBLICAR,
        titulo: ["publicar", "mis proyectos", "y noticias"],
        ruta: RutasLocales.MENU_PUBLICAR_PROYECTOS,
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.PROYECTOS,
        titulo: ["usuarios", "proyectos"],
        ruta: RutasLocales.MENU_VER_PROYECTOS,
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.NOTICIAS,
        titulo: ["usuario", "noticias"],
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.COMPRAS,
        titulo: ["purchase", "or exchange"],
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.FINANZAS,
        titulo: ["finanzas"],
        tipo: TipoMenu.ACCION,
      },
      {
        id: MenuPrincipal.ANUNCIOS,
        titulo: ["gazelookAnuncios"],
        tipo: TipoMenu.ANUNCIOS,
      },
    ]
  }

  prepararItemMenu(item: ItemMenuModel): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEM_MENU_GENERAL, // Indica el tamano del item (altura)
      colorFondo: (item.id == MenuPrincipal.ANUNCIOS) ? ColorFondoItemMenu.TRANSPARENTE : ColorFondoItemMenu.PREDETERMINADO,
      texto1: item.titulo[0] ? item.titulo[0].toString() : null,
      texto2: item.titulo[1] ? item.titulo[1].toString() : null,
      texto3: item.titulo[2] ? item.titulo[2].toString() : null,
      tipoMenu: item.tipo,
      linea: {
        mostrar: true,
        configuracion: {
          ancho: (item.id == MenuPrincipal.ANUNCIOS || item.id == MenuPrincipal.FINANZAS) ? AnchoLineaItem.ANCHO6028 : AnchoLineaItem.ANCHO6382,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true,
          cajaGaze: (item.id == MenuPrincipal.ANUNCIOS)
        }
      },
      gazeAnuncios: item.id == MenuPrincipal.ANUNCIOS,
      idInterno: item.id,
      onclick: () => this.navigationSubMenu(item.ruta),
      dobleClick: () => { 
        let ruta = RutasLocales.MODULO_PROYECTOS.toString()
        let publicar = RutasProyectos.PUBLICAR.toString()
        publicar = publicar.replace(':accionProyecto', AccionProyecto.CREAR.toString())
        publicar = publicar.replace(':codigoTipoProyecto', CodigosCatalogoTipoProyecto.PROYECTO_LOCAL.toString())
        this.router.navigateByUrl(ruta + '/' + publicar)
      }
    };
  }

  async prepararDataSubMenu3puntos() {
    this.itemSubMenu3Puntos = {
      id: "puntos",
      titulo: "",
      mostrarDescripcion: false,
      menusInternos: [
        {
          id: "mya",
          titulo: [await this.internacionalizacionNegocio.obtenerTextoLlave("miCuenta")],
          action: () => { },
        },
        {
          id: "he",
          titulo: [await this.internacionalizacionNegocio.obtenerTextoLlave("ayuda")],
          action: () => { },
        },
        {
          id: "faq",
          titulo: ["FAQ"],
          action: () => { },
        },
        {
          id: "our",
          titulo: ["Our Goals"],
          action: () => { },
        },
        {
          id: "web",
          titulo: ["WebSite"],
          action: () => { },
        }
      ]
    }
  }

  navigationSubMenu(ruta: RutasLocales) {
    if (ruta) {
      this.router.navigateByUrl(ruta.toString());
    } else {
      this.toast.abrirToast("No disponible, estamos construyendo esta sección");
    }
  }

  prepararItemSubMenu(item: ItemSubMenu): ItemMenuCompartido {
    return {
      id: '',
      submenus: item.menusInternos ? item.menusInternos : [],
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

  prepararDatosParaMenuMultipleAccion() {
    this.itemMenuMultipleAccion = {
      id: "multip",
      titulo: [
        {
          accion: () => { alert("contactenos") },
          nombre: "contactenos",
          codigo: "g"
        },
        {
          accion: () => { alert("terminos") },
          nombre: "terminos y condiciones",
          codigo: "m"
        },
        {
          accion: () => { alert("politicas") },
          nombre: "politicas de privacidad",
          codigo: "p"
        }

      ],
      tipo: TipoMenu.LEGAL
    }
  }

  prepararItemsParaMenuMultipleAccion(item: ItemMenuModel): ItemMenuCompartido {
    return {
      id: '',
      mostrarDescripcion: false,
      tamano: TamanoItemMenu.ITEM_MENU_CONTENIDO, // Indica el tamano del item (altura)
      colorFondo: ColorFondoItemMenu.PREDETERMINADO,
      acciones: item.titulo as ItemAccion[],
      tipoMenu: TipoMenu.LEGAL,
      linea: {
        mostrar: false,
        configuracion: {
          ancho: AnchoLineaItem.ANCHO6920,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true
        }
      },
      gazeAnuncios: false,
      idInterno: item.id,
      onclick: () => { },
      dobleClick: () => { }
    };

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
