import { UsoAppBar } from './../enums/uso-appbar.enum';
import { LineaCompartida } from '../modelos/linea.interface';
import { BotonCompartido } from './boton.interface'
import { LineaDeTexto } from './linea-de-texto.interface'
import { TamanoDeAppBar } from "../enums/tamano-appbar.enum"
import { TamanoColorDeFondoAppBar } from "../enums/tamano-color-fondo-appbar.enum"
import { DataBuscador } from '../../componentes/buscador/buscador.component';

export interface TextoAppBar {
    mostrar: boolean, // Indica si mostrar o no el texto
    llaveTexto?: string, // Llave del texto segun las traducciones,

}

export interface DemoAppBar {
    nombrePerfil: TextoAppBar,
    subtitulo: TextoAppBar,
    boton?: BotonCompartido, // Boton custom, en caso no enviar boton, se pondra el boton subscribe   
    mostrarLineaVerde: boolean, // Indica si la linea verde se debe mostrar o no
    tamanoColorFondo: TamanoColorDeFondoAppBar, // Indica el ancho que debe ocupar el color de fondo
}


export interface SearchBarAppBar {
    nombrePerfil: TextoAppBar, // Nombre dle tipo de perfil activo (parte inferior izquierda)
    configuracion: ConfiguracionBarraBusqueda, // Indica si se debe mostrar o no la barra de busqueda
    mostrarDivBack: boolean,
    mostrarTextoHome: boolean,
    subtitulo: TextoAppBar, // Usado para nombre de perfil o titulo debajo del home
    mostrarLineaVerde: boolean, // Indica si la linea verde se debe mostrar o no
    tamanoColorFondo: TamanoColorDeFondoAppBar, // Indica el ancho que debe ocupar el color de fondo
    mostrarBotonXRoja?: boolean, // Indica si se debe mostrar o no el boton de la x roja
}

export interface ConfiguracionBarraBusqueda {
    mostrar: boolean,
    datos: DataBuscador
}

export interface GazeAppBar {
    tituloPrincipal: TextoAppBar, // Para mostrar el titulo princpial, por ejemplo My Profile
    subtituloDemo?: TextoAppBar, // Usado para nombre de perfil o titulo debajo del home
    subtituloNormal?: TextoAppBar, // Usado para nombre de perfil o titulo debajo del home
    mostrarBotonXRoja: boolean, // Indica si se debe mostrar o no el boton de la x roja
    tamanoColorFondo: TamanoColorDeFondoAppBar, // Indica el ancho que debe ocupar el color de fondo
}

export interface SoloTituloAppBar {
    tituloPrincipal: TextoAppBar, // Para mostrar el titulo princpial, por ejemplo My Profile   
    mostrarBotonXRoja: boolean, // Indica si se debe mostrar o no el boton de la x roja
    tamanoColorFondo: TamanoColorDeFondoAppBar, // Indica el ancho que debe ocupar el color de fondo
    mostrarLineaVerde: boolean,
    mostrarDivBack: boolean,
}

// Modelo de configuracion del appbar
export interface ConfiguracionAppbarCompartida {
    usoAppBar: UsoAppBar, // Define el uso del appbar
    demoAppbar?: DemoAppBar, // Enviar en caso el uso de appbar sea DemoAppBar
    searchBarAppBar?: SearchBarAppBar, // Enviar en caso el uso del appbar sea SearchBarAppBar
    gazeAppBar?: GazeAppBar, // Enviar en caso el uso del appbar sea GazeAppBar
    accionAtras?: Function,
    tituloAppbar?: SoloTituloAppBar // si desea personalziar la funcion debe enviar la funcion a realizarce, caso contrario por defecto se retrocedera hacia la interfaz anterior
}