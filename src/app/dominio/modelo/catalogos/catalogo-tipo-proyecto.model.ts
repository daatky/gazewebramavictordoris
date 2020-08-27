import { CatalogoIdiomaModel } from "./catalogo-idioma.model";
import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoProyectoModel {
    id:string,
    codigo:string,
    estado:CatalogoEstadoModel, 
    fechaCreacion:Date,
    fechaActualizacion:Date,
    nombre:string,
    descripcion:string
}