import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoAccionModel } from "./catalogo-accion.model";

export interface CatalogoRolesModel {
    id:string,
    codigo:string,
    estado:CatalogoEstadoModel
    nombre:string,
    descripcion:string,
    acciones:Array<CatalogoAccionModel>, // CatalogoAcciones,
    fechaCreacion:Date,
    fechaActualizacion:Date
}