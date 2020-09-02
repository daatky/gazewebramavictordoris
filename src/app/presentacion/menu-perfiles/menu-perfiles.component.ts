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
import { DialogoContenido } from 'src/app/compartido/componentes/dialogo-contenido/dialogo-contenido.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface';
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum';
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum';
import { CuentaNegocio } from 'src/app/dominio/logica-negocio/cuenta.negocio';


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
  idPerfilIncompatibleDialogo = "aviso-tipo-perfil";
  idMenorEdadDialogo = "menor-edad-dia";
  itemInformacion: InformacionModel;
  dataBoton: BotonCompartido;
  dataBotonGuardarInfoMenorEdad: BotonCompartido;
  dataPerfilIncompatibleDialogo: DialogoContenido;
  dataMenorEdadDialogo: DialogoContenido;
  menorEdadForm: FormGroup;
  inputFechaNacimiento: InputCompartido
  inputNombresResponsable: InputCompartido
  inputCorreoResponsable: InputCompartido


  dataLista: DatosLista = {
    cargando: true,
    reintentar: this.obtenerCatalogoTipoPerfil,
    lista: this.listaTipoPerfil,
    tamanoLista: TamanoLista.TIPO_PERFILES
  }

  constructor(
    private perfilNegocio: PerfilNegocio,
    private dialogoServicie: DialogoServicie,
    private router: Router,
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private formBuilder: FormBuilder,
    private cuentaNegocio: CuentaNegocio
  ) {
    this.configurarBotonAceptar();
    this.configurarBotonGuardarInfoMenorEdad();
    this.prepararAppBar()
    this.prepararInfoTipoPerfiles();
    this.configurarDialogoContenido();
    this.iniciarFormMenorEdad();
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
      texto1: "crear",
      texto2: tipoPerfil.nombre,
      texto3: "perfil",
      tipoMenu: TipoMenu.GESTION_PROFILE,
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
    this.dialogoServicie.close(this.idPerfilIncompatibleDialogo)
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

  prepareItemInstrucciones(): ItemMenuCompartido {
    return {
      id: '',
      tamano: TamanoItemMenu.ITEMMENUCREARPERFIL, // Indica el tamano del item (altura)
      colorFondo: ColorFondoItemMenu.PREDETERMINADO, // El color de fondo que tendra el item
      mostrarDescripcion: false,
      tipoMenu: TipoMenu.INSTRUCCIONES,
      texto1: "explicacionSuscripcion",
      texto2: "ONE CLICK: OVERVIEW",
      texto3: 'TWO CLICKS, CREATE PROFILE',
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
      onclick: () => { this.dialogoServicie.open(this.idMenorEdadDialogo) },
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
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO6920,
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

  configurarBotonAceptar() {
    this.dataBoton = {
      colorTexto: ColorTextoBoton.AMARRILLO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      text: "ACEPTAR",
      ejecutar: () => this.dialogoServicie.close(this.idMenorEdadDialogo),
      enProgreso: false,
      tipoBoton: TipoBoton.TEXTO
    }
  }

  configurarBotonGuardarInfoMenorEdad() {
    this.dataBotonGuardarInfoMenorEdad = {
      colorTexto: ColorTextoBoton.AMARRILLO,
      tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL,
      text: "ACEPTAR",
      ejecutar: () => this.aceptarTerminosCondicionesMenorEdad(),
      enProgreso: false,
      tipoBoton: TipoBoton.TEXTO
    }
  }

  aceptarTerminosCondicionesMenorEdad() {
    if (this.menorEdadForm.valid) {
      this.dialogoServicie.close(this.idMenorEdadDialogo)
      this.cuentaNegocio.guardarAceptacionMenorEdad
        (
          this.menorEdadForm.value.correoResponsable,
          this.menorEdadForm.value.nombreResposanble,
          this.menorEdadForm.value.fechaNacimiento
        );
    }
  }

  configurarDialogoContenido() {
    this.dataPerfilIncompatibleDialogo = {
      titulo: "PERFIL INCOMPATIBLE",
    }
    this.dataMenorEdadDialogo = {
      titulo: "MENOR DE EDAD"
    };
  }

  async iniciarFormMenorEdad() {
    this.menorEdadForm = this.formBuilder.group({
      fechaNacimiento: ['', [Validators.required]],
      nombreResposanble: ['', [Validators.required, Validators.minLength(5)]],
      correoResponsable: ['', [Validators.required, Validators.email]],
    });
    this.inputFechaNacimiento = { tipo: 'date', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'Tu fecha de nacimiento', data: this.menorEdadForm.controls.fechaNacimiento }
    this.inputNombresResponsable = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'Nombres Responsable', data: this.menorEdadForm.controls.nombreResposanble }
    this.inputCorreoResponsable = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.ROJO, estiloInput: EstiloInput.REGISTRO }, placeholder: 'Correo Responsable', data: this.menorEdadForm.controls.correoResponsable }
  }

}
