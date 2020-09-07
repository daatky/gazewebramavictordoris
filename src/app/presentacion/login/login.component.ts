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
import { ConfiguracionToast } from 'src/app/compartido/diseno/modelos/toast.interface';

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
  configuracionToast:ConfiguracionToast;
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
    this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
    this.inputEmail = { tipo: 'text', error: false, estilo: { estiloError: EstiloErrorInput.BLANCO, estiloInput: EstiloInput.LOGIN }, placeholder: 'Lorem ipsum', data: this.loginForm.controls.email }
    this.inputContrasena = { tipo: 'password', error: false, estilo: { estiloError: EstiloErrorInput.BLANCO, estiloInput: EstiloInput.LOGIN }, placeholder: 'Lorem ipsum', data: this.loginForm.controls.contrasena }
    this.botonCompartido = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('sitioWeb'), tamanoTexto: TamanoDeTextoConInterlineado.L6_IGUAL, colorTexto: ColorTextoBoton.BLANCO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.enviarLanding() }
    this.botonSubmit = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('enviar'), tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.iniciarSesion() }        
    //SE ENVIA EL TIPO DE PESAMIENTO A CARGA JUNTO CON EL TITULO DEL PENSAMIENTO    
    this.pensamientoCompartido = { tipoPensamiento: TipoPensamiento.PENSAMIENTO_ALEATORIO, tituloPensamiento: await this.internacionalizacionNegocio.obtenerTextoLlave('reflexion'), esLista: false, configuracionItem:{estilo:EstiloItemPensamiento.ITEM_ALEATORIO} }
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
    this.botonSubmit.enProgreso=true
    //this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:true,mostrarToast:true,texto:"Procesando ......"}
    if (this.loginForm.valid) {  
      this.cuentaNegocio.iniciarSesion(this.loginForm.value.email,this.loginForm.value.contrasena)
      .subscribe(async res=>{
        //this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
        this.botonSubmit = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('enviar'), tamanoTexto: TamanoDeTextoConInterlineado.L7_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: () => this.iniciarSesion() }  
        console.log(res)
        this.loginForm.reset()
      },error=>{
        this.configuracionToast = {cerrarClickOutside:true,mostrarLoader:false,mostrarToast:true,texto:error}
        this.botonSubmit.enProgreso=false        
        console.log(error)
      })
    } else {
      //this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}
      this.botonSubmit.enProgreso=false
      this.inputEmail.error = true
      this.inputContrasena.error = true
    }
  }

  navegarmenuSeleccionarPerfiles() {
    this.router.navigateByUrl(RutasLocales.MENU_SELECCION_PERFILES)
  }


  //Cuando el usuario cambie de idioma los elemento cambia de idioma
  async cambiarIdioma() {
    this.pensamientoCompartido.tituloPensamiento = await this.internacionalizacionNegocio.obtenerTextoLlave('reflexion')
    this.botonCompartido.text = await this.internacionalizacionNegocio.obtenerTextoLlave('sitioWeb')
    this.botonSubmit.text = await this.internacionalizacionNegocio.obtenerTextoLlave('enviar')
    this.pensamiento.obtenerPensamientoAleatorio()
  }
}

