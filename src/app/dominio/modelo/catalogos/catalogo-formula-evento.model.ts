import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoFormulaEventoModel{
    id:string,
    codigo:string,      
    estado:CatalogoEstadoModel 
    fechaCreacion:Date,
    fechaActualizacion:Date,
    formula:string,
    descripcion:string
}