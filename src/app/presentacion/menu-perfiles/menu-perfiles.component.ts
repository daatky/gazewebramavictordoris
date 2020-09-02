import { Component, OnInit } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { TamanoDeAppBar } from 'src/app/compartido/diseno/enums/tamano-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { ColorDelTexto } from 'src/app/compartido/diseno/enums/color-del-texto.enum';
import { EstilosDelTexto } from 'src/app/compartido/diseno/enums/estilo-del-texto.enum';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton, ButtonComponent } from 'src/app/compartido/componentes/button/button.component';
import { AnchoLineaItem } from 'src/app/compartido/diseno/enums/ancho-linea-item.enum';
import { ColorFondoLinea } from 'src/app/compartido/diseno/enums/color-fondo-linea.enum';
import { EspesorLineaItem } from 'src/app/compartido/diseno/enums/espesor-linea-item.enum';
import { PerfilNegocio } from "../../dominio/logica-negocio/perfil.negocio";
import { DatosLista } from 'src/app/compartido/diseno/modelos/datos-lista.interface';
import { ItemMenuComponent, TipoMenu } from 'src/app/compartido/componentes/item-menu/item-menu.component';
import { TamanoItemMenu } from 'src/app/compartido/diseno/enums/tamano-item-menu.enum';
import { ColorFondoItemMenu } from 'src/app/compartido/diseno/enums/color-fondo-item-menu.enum';
import { CatalogoTipoPerfilModel } from 'src/app/dominio/modelo/catalogo-tipo-perfil.model';
import { ItemMenuCompartido } from 'src/app/compartido/diseno/modelos/item-menu.interface';
import { GeneradorId } from 'src/app/nucleo/servicios/generales/generador-id.service'
import { DialogoCompartido } from 'src/app/compartido/diseno/modelos/dialogo.interface';
import { TipoDialogo } from 'src/app/compartido/diseno/enums/tipo-dialogo.enum';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { DialogoServicie } from 'src/app/nucleo/servicios/diseno/dialogo.service';
import { Router } from '@angular/router';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { InformacionModel } from 'src/app/dominio/modelo/informacion.model';
import { InstruccionModel } from 'src/app/dominio/modelo/instruccion.model';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoLista } from 'src/app/compartido/diseno/enums/tamano-lista.enum';
import { RutasLocales } from 'src/app/rutas-locales.enum';


/*
  Componente que se encarga de mostrar la lista de perfiles para crearlos por primera vez (registro)
*/
@Component({
  selector: 'app-menu-perfiles',
  templateUrl: './menu-perfiles.component.html',
  styleUrls: ['./menu-perfiles.component.scss']
})
export class MenuPerfilesComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida;
  tipoPerfilSeleccionado: CatalogoTipoPerfilModel;
  listaTipoPerfil: CatalogoTipoPerfilModel[];
  idDialogo = "aviso-tipo-perfil";
  itemInformacion: InformacionModel;
  itemInstrucciones: InstruccionModel;
  itemMenu: any;


  dataLista: DatosLista = {
    cargando: true,
    reintentar: this.obtenerCatalogoTipoPerfil,
    lista: this.listaTipoPerfil,
    tamanoLista: TamanoLista.TIPO_PERFILES
  }

  dataDialogo: DialogoCompartido = {
    completo: true,
    tipo: TipoDialogo.CONFIRMACION,
    descripcion: "SE ELIMINARAN LOS AVANCES ACTUALES",
    listaAcciones: [
      ButtonComponent.crearBotonAfirmativo(() => this.limpiarPerfiles(this.tipoPerfilSeleccionado)),
      ButtonComponent.crearBotonNegativo(() => this.dialogoServicie.close(this.idDialogo))
    ]
  }

  constructor(
    private perfilNegocio: PerfilNegocio,
    private generadorId: GeneradorId,
    private dialogoServicie: DialogoServicie,
    private router: Router,
    private internacionalizacionNegocio: InternacionalizacionNegocio
  ) {
    this.prepararAppBar()
    this.prepararInfoTipoPerfiles();
    this.prepararInstrucciones();
    this.prepareInfoItemPerfil()
  }


  ngOnInit(): void {
    this.obtenerCatalogoTipoPerfil()
  }

  obtenerCatalogoTipoPerfil() {
    this.perfilNegocio.obtenerCatalogoTipoPerfil().subscribe((res: CatalogoTipoPerfilModel[]) => {
      this.listaTipoPerfil = res
      this.dataLista.cargando = false;
    }, error => {
      this.dataLista.error = error;
      this.dataLista.cargando = false;
    })
  }

  prepararItemTipoPerfil(tipoPerfil: CatalogoTipoPerfilModel): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEMMENUCREARPERFIL, // Indica el tamano del item (altura)
      colorFondo: (tipoPerfil.perfil) ? ColorFondoItemMenu.PERFILCREADO : ColorFondoItemMenu.PREDETERMINADO,
      mostrarDescripcion: tipoPerfil.mostrarDescripcion ?? false,
      texto1: this.itemMenu.titulo,
      texto2: tipoPerfil.nombre,
      texto3: this.itemMenu.subtitulo,
      tipoMenu: TipoMenu.CREATE_PROFILE_INFO,
      descripcion: [
        {
          texto: tipoPerfil.descripcion,
          tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_I2,
          color: ColorDelTexto.TEXTOBOTONBLANCO,
          estiloTexto: EstilosDelTexto.BOLD,
          enMayusculas: true
        },
      ],
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
      idInterno: tipoPerfil.codigo,
      onclick: () => this.mostrarDescripcion(tipoPerfil),
      dobleClick: () => this.gestionarPerfil(tipoPerfil)
    };
  }

  gestionarPerfil(tipoPerfil: CatalogoTipoPerfilModel) {
    this.tipoPerfilSeleccionado = tipoPerfil;
    if (this.perfilNegocio.conflictoCrearPerfil(tipoPerfil, this.listaTipoPerfil)) {
      //this.dialogoServicie.open(this.idDialogo);
      this.navegarCrearPerfil(tipoPerfil);
    } else {
      //this.dialogoServicie.open(this.idDialogo);
      this.navegarCrearPerfil(tipoPerfil);
    }
  }

  limpiarPerfiles(tipoPerfil: CatalogoTipoPerfilModel) {
    this.perfilNegocio.limpiarPerfiles(this.listaTipoPerfil);
    this.dialogoServicie.close(this.idDialogo)
    this.navegarCrearPerfil(tipoPerfil);
  }

  navegarCrearPerfil(tipoPerfil: CatalogoTipoPerfilModel) {
    this.router.navigateByUrl(RutasLocales.REGISTRO.replace(":codigoPerfil", tipoPerfil.codigo));
  }

  mostrarDescripcion(item: any) {
    const elemento: HTMLElement = document.getElementById('flecha' + item.codigo) as HTMLElement;
    if (item.mostrarDescripcion) {
      item.mostrarDescripcion = false;
      elemento.classList.remove("rotar-flecha")
    } else {
      item.mostrarDescripcion = true;
      elemento.classList.add("rotar-flecha");
    }
  }

  prepareItemInstrucciones(instrucciones: InstruccionModel): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEMMENUCREARPERFIL, // Indica el tamano del item (altura)
      colorFondo: ColorFondoItemMenu.PREDETERMINADO, // El color de fondo que tendra el item
      mostrarDescripcion: false,
      tipoMenu: TipoMenu.INSTRUCCIONES,
      texto1: instrucciones.titulo,
      texto2: instrucciones.instruccion1,
      texto3: instrucciones.instruccion2,
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


  prepareItemInformacion(informacion: InformacionModel): ItemMenuCompartido {
    try {
      return {
        id: '',
        tamano: TamanoItemMenu.ITEMMENUCREARPERFIL, // Indica el tamano del item (altura)
        colorFondo: ColorFondoItemMenu.PREDETERMINADO, // El color de fondo que tendra el item
        mostrarDescripcion: informacion.mostrarDescripcion ?? false,
        tipoMenu: TipoMenu.ACCION,
        texto1: informacion.nombre,
        descripcion: [
          {
            texto: informacion.descripcion[0],
            tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_I2,
            color: ColorDelTexto.TEXTOBLANCO,
            estiloTexto: EstilosDelTexto.BOLD,
            enMayusculas: true
          },
          {
            texto: informacion.descripcion[1],
            tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_I2,
            color: ColorDelTexto.TEXTOAMARILLOBASE,
            estiloTexto: EstilosDelTexto.BOLD,
            enMayusculas: true
          },
          {
            texto: informacion.descripcion[2],
            tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_I2,
            color: ColorDelTexto.TEXTOBLANCO,
            estiloTexto: EstilosDelTexto.BOLD,
            enMayusculas: true
          },
          {
            texto: informacion.descripcion[3],
            tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_I2,
            color: ColorDelTexto.TEXTOBLANCO,
            estiloTexto: EstilosDelTexto.BOLD,
            enMayusculas: true
          },
          {
            texto: informacion.descripcion[4],
            tamanoConInterlineado: TamanoDeTextoConInterlineado.L3_I2,
            color: ColorDelTexto.TEXTOBLANCO,
            estiloTexto: EstilosDelTexto.BOLD,
            enMayusculas: true
          },
        ],
        linea: {
          mostrar: true,
          configuracion: {
            ancho: AnchoLineaItem.ANCHO100,
            espesor: EspesorLineaItem.ESPESOR071,
            colorFondo: ColorFondoLinea.FONDOLINEAVERDE,
            forzarAlFinal: true
          }
        },
        gazeAnuncios: false,
        idInterno: informacion.codigo,
        onclick: () => this.mostrarDescripcion(informacion),
        dobleClick: () => { }

      };
    } catch (error) {

    }

  }


  async prepararAppBar() {
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: false
        },
        mostrarDivBack: true,
        mostrarTextoHome: false,
        subtitulo: {
          mostrar: true,
          llaveTexto: 'bienvenidos'
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      }
    }

  }

  async prepararInfoTipoPerfiles() {
    this.itemInformacion = {
      codigo: "info",
      nombre: await this.internacionalizacionNegocio.obtenerTextoLlave('sobrePerfiles'),
      descripcion: [
        await this.internacionalizacionNegocio.obtenerTextoLlave('gazelookPlataforma1'),
        await this.internacionalizacionNegocio.obtenerTextoLlave('gazelookPlataforma2'),
        await this.internacionalizacionNegocio.obtenerTextoLlave('gazelookPlataforma3'),
        await this.internacionalizacionNegocio.obtenerTextoLlave('gazelookPlataforma4'),
        await this.internacionalizacionNegocio.obtenerTextoLlave('gazelookPlataforma5')
      ],
    }
  }

  async prepararInstrucciones() {
    this.itemInstrucciones = {
      codigo: "a",
      titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("explicacionSuscripcion"),
      instruccion1: "ONE CLICK: OVERVIEW",
      instruccion2: 'TWO CLICKS, CREATE PROFILE'
    }
  }

  async prepareInfoItemPerfil() {
    this.itemMenu = {
      titulo: await this.internacionalizacionNegocio.obtenerTextoLlave("crear"),
      subtitulo: await this.internacionalizacionNegocio.obtenerTextoLlave("perfil")
    }
  }
}
