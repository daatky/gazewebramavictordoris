import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoSuscripcionEntity{
    id:string,
    codigo:string,
    estado:CatalogoEstadoEntity 
    fechaCreacion:Date,
    fechaActualizacion:Date,   
    nombre:string,
    duracion:number,
    costo:number
}