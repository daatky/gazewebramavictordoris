import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoColorEntity {
    id:string,
    codigo:string,
    estado:CatalogoEstadoEntity, // CatalogoEstado
    nombre:string,
    formula:string,
    fechaCreacion:Date,
    fechaActualizacion:Date
}