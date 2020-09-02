import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoRolEntity {
    _id?:string,
    codigo?:string,
    estado?:CatalogoEstadoEntity
    nombre?:string,
    fechaCreacion?:Date,    
}