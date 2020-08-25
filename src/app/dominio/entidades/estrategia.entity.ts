import { CatalogoTipoMonedaEntity } from "./catalogos/catalogo-tipo-moneda.entity";
import { MediaEntity } from "./media.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";

export interface EstrategiaEntity{
    id:string,
    estado:CatalogoEstadoEntity,
    fechaCreacion:Date,
    fecaActualizacion:Date,
    fechaCaducidad:Date,
    presupuesto:number,
    justificacion:string,
    adjuntos:Array<MediaEntity>, 
    moneda:CatalogoTipoMonedaEntity
}