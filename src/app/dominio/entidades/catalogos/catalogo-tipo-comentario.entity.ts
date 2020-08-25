import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoComentarioEntity{
    id:string,
    codigo:string,
    nombre:string,
    estado:CatalogoEstadoEntity //Catalogo estados
    fechaCreacion:Date,
    fechaActualizacion:Date
}