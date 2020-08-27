import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoSuscripcionModel{
    id:string,
    codigo:string,
    estado:CatalogoEstadoModel
    fechaCreacion:Date,
    fechaActualizacion:Date,   
    nombre:string,
    duracion:number,
    costo:number
}