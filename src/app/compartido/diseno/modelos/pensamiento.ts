import { TipoPensamiento, EstiloItemPensamiento } from "../enums/tipo-pensamiento.enum";
import { PensamientoModel } from 'src/app/dominio/modelo/entidades/pensamiento.model';

export interface PensamientoCompartido {
    //pensamiento:Array<PensamientoEntity>, //PENAMIENTO
    tipoPensamiento:TipoPensamiento //PENSAMIENTO ALEATORIO, DE PEFIL, PARA MODIFICACION Y CREAICON
    tituloPensamiento?:string //Titulo que va tener el pensamiento
    subtitulo?:boolean //Titulo que va dentro del pensamiento o nombre de la persaona 
    esLista?:boolean //Si se va cargar lista o solo item
    configuracionItem?:ConfiguracionItem, //stylo del item
}
export interface ConfiguracionItem{
    estilo?:EstiloItemPensamiento, //Estilo del item
    presentarX?:boolean
}
//SE LO USA PARA ENVIAR LOS EVENTOS DE TAP Y 2 TAP AL ITEM
export interface Configuracion{
    estilo?:EstiloItemPensamiento
    data?: PensamientoModel,
    onclick?: Function,
    dobleClick?: Function,
    clickSostenido?: Function,
    presentarX:boolean,    
}

export interface ItemPensamiento{
    pensamiento:PensamientoModel,
    indice:number
}