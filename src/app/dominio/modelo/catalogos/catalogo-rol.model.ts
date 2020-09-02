import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoTipoRolModel } from "./catalogo-tipo-rol.model";

export interface CatalogoRolModel {
    _id?:string,
    codigo?:string,
    estado?:CatalogoEstadoModel
    nombre?:string,
    fechaCreacion?:Date,    
    tipo?:CatalogoTipoRolModel,
    descripcion:string
}