import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { BotonCompartido } from 'src/app/dominio/modelo/boton-compartido';
import { ColorTextoBoton, TipoBoton, ButtonComponent } from 'src/app/compartido/componentes/button/button.component';
import { VariablesGlobales } from 'src/app/nucleo/servicios/generales/variables-globales.service';
import { InputCompartido } from 'src/app/compartido/diseno/modelos/input.interface';
import { EstiloInput } from 'src/app/compartido/diseno/enums/estilo-input.enum';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoPortadaGaze } from 'src/app/compartido/diseno/enums/tamano-portada-gaze.enum';
import { PortadaGazeComponent } from 'src/app/compartido/componentes/portada-gaze/portada-gaze.component';
import { TipoPensamiento, EstiloItemPensamiento } from 'src/app/compartido/diseno/enums/tipo-pensamiento.enum';
import { PensamientoCompartido } from 'src/app/compartido/diseno/modelos/pensamiento';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { CuentaNegocio } from "../../dominio/logica-negocio/cuenta.negocio";
import { PensamientoCompartidoComponent } from 'src/app/compartido/componentes/pensamiento/pensamiento-compartido.component';
import { EstiloErrorInput } from 'src/app/compartido/diseno/enums/estilo-error-input.enum';
import { Router } from '@angular/router';
import { RutasLocales } from 'src/app/rutas-locales.enum';
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  pensamientoCompartido: PensamientoCompartido
  inputEmail: InputCompartido
  inputContrasena: InputCompartido
  botonCompartido: BotonCompartido
  botonSubmit: BotonCompartido
  //configuracion: ConfiguracionToast
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  @ViewChild(PensamientoCompartidoComponent) pensamiento: PensamientoCompartidoComponent
  @ViewChild('portadaGazeComponent') portadaGazeComponent: PortadaGazeComponent
  components = [];

  constructor(
    private formBuilder: FormBuilder,
    private globales: VariablesGlobales,
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    private router: Router,
    private cuentaNegocio: CuentaNegocio,
    private _location: Location,
  ) {

  }
  ngOnInit(): void {
    this.iniciarElementos()
  }

  //Inicia todos los componentes
  async iniciarElementos() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],
    });
    this.inputEmail = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.BLANCO, estiloInput: EstiloInput.LOGIN }, placeholder: 'Lorem ipsum', data: this.loginForm.controls.email }
    this.inputContrasena = { tipo: 'password', error: false, estilo: { estiloError: EstiloErrorInput.BLANCO, estiloInput: EstiloInput.LOGIN }, placeholder: 'Lorem ipsum', data: this.loginForm.controls.contrasena }
    this.botonCompartido = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('sitioWeb'), tamanoTexto: TamanoDeTextoConInterlineado.L6_IGUAL, colorTexto: ColorTextoBoton.BLANCO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.enviarLanding() }
    this.botonSubmit = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('enviar'), tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.iniciarSesion() }
    //SE ENVIA EL TIPO DE PESAMIENTO A CARGA JUNTO CON EL TITULO DEL PENSAMIENTO    
    this.pensamientoCompartido = { tipoPensamiento: TipoPensamiento.PENSAMIENTO_ALEATORIO, tituloPensamiento: await this.internacionalizacionNegocio.obtenerTextoLlave('reflexion'), esLista: false, configuracionItem: { estilo: EstiloItemPensamiento.ITEM_ALEATORIO } }
  }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      this.globales.mostrarMundo = true
      this.portadaGazeComponent.reDibujar({ tamano: TamanoPortadaGaze.PORTADACOMPLETA, espacioDerecha: true })
    })
  }
  enviarLanding() {
    this.router.navigateByUrl(RutasLocales.BIENVENIDO);
  }
  //= () =>
  iniciarSesion() {
    if (this.loginForm.valid) {
      // this.configuracion={cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      //this.botonSubmit.enProgreso=true
      this.cuentaNegocio.iniciarSesion(this.loginForm.value.email, this.loginForm.value.contrasena)
        .subscribe(res => {
          console.log(res)
          this.navegarmenuSeleccionarPerfiles();
          //this.botonSubmit.enProgreso=false
        }, error => {
          //this.botonSubmit.enProgreso=false
          console.log(error)
          // this.configuracion={cerrarClickOutside:true,mostrarLoader:false,mostrarToast:false,texto:error}
        })
    } else {
      this.inputEmail.error = true
      this.inputContrasena.error = true
    }
  }

  navegarmenuSeleccionarPerfiles() {
    this._location.replaceState('/');
    this.router.navigateByUrl(RutasLocales.MENU_SELECCION_PERFILES, { replaceUrl: true })
  }


  //Cuando el usuario cambie de idioma los elemento cambia de idioma
  async cambiarIdioma() {
    this.pensamientoCompartido.tituloPensamiento = await this.internacionalizacionNegocio.obtenerTextoLlave('reflexion')
    this.botonCompartido.text = await this.internacionalizacionNegocio.obtenerTextoLlave('sitioWeb')
    this.botonSubmit.text = await this.internacionalizacionNegocio.obtenerTextoLlave('enviar')
    this.pensamiento.obtenerPensamientoAleatorio()
  }
}

