import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoMonedaEntity{
    id:string,
    codigo:string,
    nombre:string,
    predeterminado:boolean,
    estado:CatalogoEstadoEntity //Catalogo estados
    fechaCreacion:Date,
    fechaActualizacion:Date
}