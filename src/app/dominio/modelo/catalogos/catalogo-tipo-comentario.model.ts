import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoComentarioModel{
    id:string,
    codigo:string,
    nombre:string,
    estado:CatalogoEstadoModel //Catalogo estados
    fechaCreacion:Date,
    fechaActualizacion:Date
}