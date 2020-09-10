import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { Router } from '@angular/router';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { CatalogoTipoPerfilModel } from 'src/app/dominio/modelo/catalogo-tipo-perfil.model';
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { InstruccionModel } from 'src/app/dominio/modelo/instruccion.model';
import { ItemMenuCompartido } from 'src/app/compartido/diseno/modelos/item-menu.interface';
import { TamanoItemMenu } from 'src/app/compartido/diseno/enums/tamano-item-menu.enum';
import { ColorFondoItemMenu } from 'src/app/compartido/diseno/enums/color-fondo-item-menu.enum';
import { TipoMenu } from 'src/app/compartido/componentes/item-menu/item-menu.component';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorDelTexto } from 'src/app/compartido/diseno/enums/color-del-texto.enum';
import { EstilosDelTexto } from 'src/app/compartido/diseno/enums/estilo-del-texto.enum';
import { AnchoLineaItem } from 'src/app/compartido/diseno/enums/ancho-linea-item.enum';
import { EspesorLineaItem } from 'src/app/compartido/diseno/enums/espesor-linea-item.enum';
import { ColorFondoLinea } from 'src/app/compartido/diseno/enums/color-fondo-linea.enum';
import { PerfilModel } from 'src/app/dominio/modelo/perfil.model';
import { CodigosCatalogosEstadoPerfiles } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-estado-perfiles.enun';
import { CodigosCatalogoTipoPerfil } from 'src/app/nucleo/servicios/remotos/codigos-catalogos/catalogo-tipo-perfiles.enum';
import { RutasLocales } from 'src/app/rutas-locales.enum';

@Component({
  selector: 'app-menu-seleccion-perfiles',
  templateUrl: './menu-seleccion-perfiles.component.html',
  styleUrls: ['./menu-seleccion-perfiles.component.scss']
})
export class MenuSeleccionPerfilesComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida;
  listaTipoPerfil: CatalogoTipoPerfilModel[];
  dataLista: DatosLista;

  constructor
    (
      private perfilNegocio: PerfilNegocio,
      private router: Router,
      private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {
    this.prepararAppBar();
    this.preperarListaTipoPerfiles()
  }

  ngOnInit(): void {
    this.obtenerCatalogoTipoPerfil()
  }

  obtenerCatalogoTipoPerfil() {
    this.perfilNegocio.obtenerCatalogoTipoPerfilConPerfil().subscribe((res: CatalogoTipoPerfilModel[]) => {
      this.listaTipoPerfil = res
      this.dataLista.cargando = false;
    }, error => {
      this.dataLista.error = error;
      this.dataLista.cargando = false;
    })
  }

  preperarListaTipoPerfiles() {
    this.dataLista = {
      cargando: true,
      reintentar: this.obtenerCatalogoTipoPerfil,
      lista: this.listaTipoPerfil,
      tamanoLista: TamanoLista.TIPO_PERFILES
    }
  }
  async prepararAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.SOLO_TITULO,
      tituloAppbar: {
        mostrarBotonXRoja: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920,
        tituloPrincipal: {
          mostrar: true,
          llaveTexto: 'escojaPerfil'
        },
        mostrarLineaVerde: true,
        mostrarDivBack: false
      }
    }

  }

  prepararItemTipoPerfil(tipoPerfil: CatalogoTipoPerfilModel): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEM_MENU_ELEGIR_PERFIL, // Indica el tamano del item (altura)
      colorFondo: this.obtenerColorPerfil(tipoPerfil.perfil),
      mostrarDescripcion: tipoPerfil.mostrarDescripcion ?? false,
      texto1: this.obtenerEstadoPerfil(tipoPerfil.perfil),
      texto2: tipoPerfil.nombre,
      texto3: "perfil",
      tipoMenu: TipoMenu.GESTION_PROFILE,
      linea: {
        mostrar: true,
        configuracion: {
          ancho: (tipoPerfil.codigo == CodigosCatalogoTipoPerfil.GROUP) ? AnchoLineaItem.ANCHO6920 : AnchoLineaItem.ANCHO6386,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true
        }
      },
      gazeAnuncios: false,
      idInterno: tipoPerfil.codigo,
      onclick: () => this.navegarMenuPrincipal(tipoPerfil),
      dobleClick: () => this.navegarCrearEditarPerfil(tipoPerfil)
    };
  }

  navegarMenuPrincipal(tipoPerfil: CatalogoTipoPerfilModel) {
    if (tipoPerfil.perfil) {
      this.router.navigate([RutasLocales.MENU_PRINCIPAL], { queryParams: { codigoPerfil: tipoPerfil.codigo } });
    } else {
      this.navegarCrearEditarPerfil(tipoPerfil);
    }
  }

  navegarCrearEditarPerfil(tipoPerfil: CatalogoTipoPerfilModel) {
    this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", tipoPerfil.codigo));
  }

  obtenerEstadoPerfil(perfil: PerfilModel) {
    if (perfil) {
      // return "crear";//codigo temporal
      switch (perfil.estado.codigo) {
        case CodigosCatalogosEstadoPerfiles.PERFIL_ACTIVO:
          return "creado"
        case CodigosCatalogosEstadoPerfiles.PERFIL_HIBERNADO:
          return "hibernar"
      }
    }
    return "crear";
  }

  obtenerColorPerfil(perfil: PerfilModel) {
    if (perfil) {
      // return ColorFondoItemMenu.PERFILHIBERNADO; //codigo temporal
      switch (perfil.estado.codigo) {
        case CodigosCatalogosEstadoPerfiles.PERFIL_ACTIVO:
          return ColorFondoItemMenu.PERFILCREADO
        case CodigosCatalogosEstadoPerfiles.PERFIL_HIBERNADO:
          return ColorFondoItemMenu.PERFILHIBERNADO

      }
    }
    return ColorFondoItemMenu.PREDETERMINADO
  }

  prepareItemInstrucciones(): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEM_MENU_ELEGIR_PERFIL_INFO, // Indica el tamano del item (altura)
      colorFondo: ColorFondoItemMenu.PREDETERMINADO, // El color de fondo que tendra el item
      mostrarDescripcion: false,
      tipoMenu: TipoMenu.INSTRUCCIONES,
      texto1: null,
      texto2: "unClick",
      texto3: "dobleClick",
      descripcion: null,
      linea: {
        mostrar: true,
        configuracion: {
          ancho: AnchoLineaItem.ANCHO6386,
          espesor: EspesorLineaItem.ESPESOR071,
          colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
          forzarAlFinal: true
        }
      },
      gazeAnuncios: false,
      idInterno: "",
      onclick: () => { },
      dobleClick: () => { }

    };
  }

}
