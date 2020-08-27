import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoMonedaModel{
    id:string,
    codigo:string,
    nombre:string,
    predeterminado:boolean,
    estado:CatalogoEstadoModel //Catalogo estados
    fechaCreacion:Date,
    fechaActualizacion:Date
}