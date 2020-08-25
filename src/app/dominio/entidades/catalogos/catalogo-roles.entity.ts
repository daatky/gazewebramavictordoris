import { CatalogoAccionEntity } from "./catalogo-accion.entity";
import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoRolesEntity {
    id:string,
    codigo:string,
    estado:CatalogoEstadoEntity
    nombre:string,
    descripcion:string,
    acciones:Array<CatalogoAccionEntity>, // CatalogoAcciones,
    fechaCreacion:Date,
    fechaActualizacion:Date
}