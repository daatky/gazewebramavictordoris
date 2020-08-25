import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoFormulaEventoEntity{
    id:string,
    codigo:string,      
    estado:CatalogoEstadoEntity 
    fechaCreacion:Date,
    fechaActualizacion:Date,
    formula:string,
    descripcion:string
}