import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoRolModel {
    _id?:string,
    codigo?:string,
    estado?:CatalogoEstadoModel
    nombre?:string,
    fechaCreacion?:Date,     
}