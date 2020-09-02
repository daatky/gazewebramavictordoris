import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoOrigenModel{
    id?:string,
    codigo?:string,
    estado?:CatalogoEstadoModel
    fechaCreacion?:Date,
    fechaActualizacion?:Date,   
    nombre?:string,
    descripcion?:string,
    ingreso?:boolean
}