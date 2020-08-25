import { TipoDialogo } from './../enums/tipo-dialogo.enum'
import { BotonCompartido } from './boton.interface'

/*
Interface que indica los parametros necesarios para la creacion de un Dialogo compartido.
*/
export interface DialogoCompartido {
    tipo: TipoDialogo // Tipo de dialogo a ser visualizado
    listaAcciones: Array<BotonCompartido> // Botones a mostrarse en el dialogo
    descripcion?: string // Enunciado sobre que va el dialogo
    completo: boolean // Si el dialogo debe cubrir la pantalla completa y no permitir clicks fuera de el.
}