import { Component, OnInit } from '@angular/core';
import { ConfiguracionAppbarCompartida } from 'src/app/compartido/diseno/modelos/appbar.interface';
import { UsoAppBar } from 'src/app/compartido/diseno/enums/uso-appbar.enum';
import { TamanoColorDeFondoAppBar } from 'src/app/compartido/diseno/enums/tamano-color-fondo-appbar.enum';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';
import { BotonCompartido } from 'src/app/compartido/diseno/modelos/boton.interface';
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum';
import { ColorTextoBoton, TipoBoton } from 'src/app/compartido/componentes/button/button.component';
import { BarraInferior } from 'src/app/compartido/diseno/modelos/barra-inferior.interfce';
import { TipoInput } from 'src/app/compartido/diseno/enums/tipo-input.enum';

@Component({
  selector: 'app-pensamiento',
  templateUrl: './pensamiento.component.html',
  styleUrls: ['./pensamiento.component.scss']
})
export class PensamientoComponent implements OnInit {
  configuracionAppBar: ConfiguracionAppbarCompartida
  botonPublico: BotonCompartido
  botonPrivado: BotonCompartido
  presentarPensamiento:boolean
  estadosPensamiento:number
  //crearPensamientoForm: FormGroup;
  //inputPensamiento: InputCompartido; 
  //configuracionToast:ConfiguracionToast;
  barraInferior:BarraInferior
  constructor(
    private internacionalizacionNegocio: InternacionalizacionNegocio,
    //private formBuilder: FormBuilder, 
  ) { 
    this.presentarPensamiento=false   
    this.estadosPensamiento=0
    this.prepararAppBar() 
    //console.log(this.internacionalizacionNegocio.obtenerIdiomaInternacionalizacion())  
   }

  ngOnInit(): void {  
    this.iniciarDatos()       
  }
  async prepararAppBar() {
    /*this.crearPensamientoForm = this.formBuilder.group({
      pensamiento: ['', [Validators.required, Validators.maxLength(230)]],
    });   */
    //this.inputPensamiento = { tipo: 'text', error: false, estilo: {estiloError:EstiloErrorInput.ROJO,estiloInput:EstiloInput.LOGIN}, placeholder: 'Ingrese un pensamiento', data: this.crearPensamientoForm.controls.pensamiento}            
    this.configuracionAppBar = {
      usoAppBar: UsoAppBar.USO_SEARCHBAR_APPBAR,
      searchBarAppBar: {
        nombrePerfil: {
          mostrar: true,
          llaveTexto:'PENDIENTE'
        },
        mostrarDivBack: true,
        mostrarTextoHome: true,
        subtitulo: {
          mostrar: true,
          llaveTexto: await this.internacionalizacionNegocio.obtenerTextoLlave('misReflexiones')
          //llaveTexto:"SIDAISDJIJ"
        },
        mostrarLineaVerde: true,
        tamanoColorFondo: TamanoColorDeFondoAppBar.TAMANO100,
      }
    }

  }
  async iniciarDatos(){
    this.barraInferior= { input:{maximo:230,placeholder:"Ingrese un pensamiento",texto:"",tipo:TipoInput.TEXTO},activarBarra:false,variosIconos:false,enviar: (param:string) => this.crearPensamiento(param)}
    this.botonPublico = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('publico'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.AMARRILLO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: (param) => this.cambiarEstado(1) }
    this.botonPrivado = { text: await this.internacionalizacionNegocio.obtenerTextoLlave('privado'), tamanoTexto: TamanoDeTextoConInterlineado.L4_IGUAL, colorTexto: ColorTextoBoton.ROJO, tipoBoton: TipoBoton.TEXTO, enProgreso: false, ejecutar: (param) => this.cambiarEstado(2) }
  //this.configuracionToast = {cerrarClickOutside:false,mostrarLoader:false,mostrarToast:false,texto:""}    
  }
  cambiarEstado(param:number){
    this.estadosPensamiento=param
    this.barraInferior.activarBarra=true
  }
  crearPensamiento (texto:string){
    console.log(texto)
    console.log("VOY A CREAR UN PENSAMIENTO")
  }
  agregarTexto(){
    console.log("AGREGAR TEXTO")
  }
}
