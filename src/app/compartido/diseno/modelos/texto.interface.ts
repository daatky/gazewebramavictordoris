import { PaddingIzqDerDelTexto } from './../enums/padding-del-texto.enum';
import { TamanoDeTexto } from './../enums/tamano-letra.enum';
import { EstilosDelTexto } from '../enums/estilo-del-texto.enum'
import { TamanoDeTextoConInterlineado } from '../enums/tamano-letra-con-interlineado.enum'
import { ColorDelTexto } from '../enums/color-del-texto.enum'

// Configuracion de cada linea de texto que aparece en el item
export interface ConfiguracionTexto {
    color: ColorDelTexto, // Color del texto
    estiloTexto: EstilosDelTexto, // Indica el estilo del texto
    enMayusculas: boolean, // Indica si el texto se debe mostrar todo en mayusculas
    tamano?: TamanoDeTexto, // Tamano de letra con interlineado por defecto que pone el navegador 
    tamanoConInterlineado?: TamanoDeTextoConInterlineado, // Tamano del texto con interlineado personalizado
    paddingIzqDerDelTexto?: PaddingIzqDerDelTexto, // Indica el valor del padding a la izquierda y derecha del texto
}