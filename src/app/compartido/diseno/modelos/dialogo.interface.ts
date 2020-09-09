import { TipoDialogo } from './../enums/tipo-dialogo.enum'
import { BotonCompartido } from './boton.interface'

export interface DialogoCompartido {
    mostrarDialogo: boolean // Indica si el dialogo se debe mostrar o no 
    tipo: TipoDialogo // Tipo de dialogo a ser visualizado
    listaAcciones: Array<BotonCompartido> // Botones a mostrarse en el dialogo
    completo: boolean // Si el dialogo debe cubrir la pantalla completa y no permitir clicks fuera de el.
    descripcion?: string // Enunciado sobre que va el dialogo
}