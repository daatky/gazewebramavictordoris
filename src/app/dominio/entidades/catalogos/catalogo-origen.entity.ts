import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoOrigenEntity{
    id:string,
    codigo:string,
    estado:CatalogoEstadoEntity
    fechaCreacion:Date,
    fechaActualizacion:Date,   
    nombre:string,
    descripcion:string,
    ingreso:boolean
}