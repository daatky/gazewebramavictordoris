import { EstilosDelTexto } from '../enums/estilo-del-texto.enum'
import { TamanoDeTextoConInterlineado } from '../enums/tamano-letra-con-interlineado.enum'
import { ColorDelTexto } from '../enums/color-del-texto.enum'

// Configuracion de cada linea de texto que aparece en el item
export interface LineaDeTexto {
    texto?:string, // Texto a ser mostrado
    tamanoConInterlineado:TamanoDeTextoConInterlineado, // Tamano del texto con interlineado
    color:ColorDelTexto, // Color del texto
    enMayusculas:boolean, // Indica si el texto se debe mostrar todo en mayusculas
    estiloTexto:EstilosDelTexto, // Indica el estilo del texto
}