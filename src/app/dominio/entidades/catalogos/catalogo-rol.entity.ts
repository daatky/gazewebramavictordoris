import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoTipoRolEntity } from "./catalogo-tipo-rol.entity";

export interface CatalogoRolEntity {
    _id:string,
    codigo:string,
    estado:CatalogoEstadoEntity
    nombre:string,
    fechaCreacion:Date,    
    tipo:CatalogoTipoRolEntity,
    descripcion:string
}