import { ColorDeBorde, ColorDeFondo } from './../enums/item-cir-rec-colores.enum';
import { ColorCapaOpacidadItem } from './../enums/item-cir-rec-capa-opacidad.enum';
import { UsoItemCircular, UsoItemRectangular } from "./../enums/uso-item-cir-rec.enum";

export interface CapaOpacidad {
    mostrar: boolean,
    colorOpacidad?: ColorCapaOpacidadItem,
}

export interface ItemCompartido{
    id: any, // el id puede ser la pos del elemento en la lista de items o el id de la foto por ejemplo
    idInterno?: string, // Usado para logica interna del item, es generado de forma automatica, en caso de se necesario inicializar en '', el componenete cuando se dibuja lo crea por si solo
    esVisitante: boolean, // Indica si el usuario que visualiza el item es propietario o no
    urlMedia: string, // Url de la imagen que contiene el item
    activarClick: boolean, // Indica si tiene o no evento de click
    activarDobleClick: boolean, // Indica si tiene o no evento de doble click
    activarLongPress: boolean, // Indica si tiene o no evento de long press
    mostrarBoton: boolean, // Indica si se debe mostrar el boton de upload photos, 
    mostrarLoader: boolean, // Indica si mostrar el loader del item
    textoBoton?: string, // Texto del boton que se muestra en el item
    capaOpacidad: CapaOpacidad, // Indica la capa de opcacidad que se va a utilizar en el item -  Item en fotos por defecto
    colorBorde?: ColorDeBorde, // Indica el color de borde a usar en el item
    colorDeFondo: ColorDeFondo, // Indica el color de fondo a usar en el item
    esBotonUpload: boolean, // El evento de click cambia segun esta variable
    eventoEnItem?: Function, // Funcion a ejecutar cuando se dispare algun evento en el item, recibe la accions a ejecutar
    data?:any//Informacion que contiene el item    
}

export interface ItemCircularCompartido extends ItemCompartido {
    usoDelItem: UsoItemCircular, // Indica el uso del item
    fotoPredeterminadaRamdon?: boolean, // Indica si el item predeterminado es de origen ramdon o con accion de doble click en el mismo
}

export interface ItemRectangularCompartido extends ItemCompartido {
    usoDelItem: UsoItemRectangular, // Indica el uso del item
    descripcion?: string, // Descripcion de la imagen que contiene el item
    textoCerrarEditarDescripcion?: string, // Texto que se muestra para indicar al usuario que debe hacer para dejar de editar la descripcion
    mostrarIconoExpandirFoto?: boolean, // Indica si se debe mostrar la capa con el icono de expandir a pantalla completa la foto
    mostrarCapaImagenSeleccionadaConBorde?: boolean, // Indica si se debe mostrar la capa con borde rojo de editar descripcion
    esconderEsquina?:boolean
}
