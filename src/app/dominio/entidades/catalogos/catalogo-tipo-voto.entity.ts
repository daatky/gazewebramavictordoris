import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoVotoEntity{
    id:string,
    codigo:string,
    nombre:string,    
    estado:CatalogoEstadoEntity
    fechaCreacion:Date,
    fechaActualizacion:Date,
    votoAdmin:boolean,
}