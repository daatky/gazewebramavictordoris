import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoVotoModel{
    id?:string,
    codigo?:string,
    nombre?:string,    
    estado?:CatalogoEstadoModel
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    votoAdmin?:boolean,
}