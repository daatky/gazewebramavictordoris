import { LineaDeTexto } from '../modelos/linea-de-texto.interface'
import { TamanoItemMenu } from '../enums/tamano-item-menu.enum'
import { ColorFondoItemMenu } from '../enums/color-fondo-item-menu.enum'
import { LineaCompartida } from './linea.interface'
import { TipoMenu } from '../../../compartido/componentes/item-menu/item-menu.component';
import { ItemMenuModel, ItemAccion } from 'src/app/dominio/modelo/item-menu.model';

// Configuracion del item menu
export interface ItemMenuCompartido {
    id: string, // Id del item
    tamano: TamanoItemMenu, // Indica el tamano del item (altura)
    colorFondo: ColorFondoItemMenu, // El color de fondo que tendra el item
    //lineasTexto: Array<LineaDeTexto>, // Todas las lineas de texto a ser mostradas en el item
    linea: {
        mostrar: boolean, // Indica si se debe mostrar o no la linea
        configuracion?: LineaCompartida // Configuracion de la linea
    },
    gazeAnuncios?: boolean, // Indica si el item es para Gazelook Announcemente, lo hice como variable porque es un caso en particular
    idInterno?: string,
    mostrarDescripcion?: boolean

    onclick?: Function,
    dobleClick?: Function
    clickSostenido?: Function,
    tipoMenu: TipoMenu
    texto1?: string,
    texto2?: string,
    texto3?: string,
    descripcion?: Array<LineaDeTexto> // Cuando se agrega la descripcion, se visualizara el icono de flecha y se omitira el click
    submenus?: ItemMenuModel[]
    acciones?: ItemAccion[]
}

