import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoTipoMonedaModel } from "../catalogos/catalogo-tipo-moneda.model";

export interface EstrategiaModel{
    id?:string,
    estado?:CatalogoEstadoModel,
    fechaCreacion?:Date,
    fecaActualizacion?:Date,
    fechaCaducidad?:Date,
    presupuesto?:number,
    justificacion?:string,
//    adjuntos:Array<MediaModel>, 
    moneda?:CatalogoTipoMonedaModel
}