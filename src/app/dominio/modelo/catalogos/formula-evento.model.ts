import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoEventoModel } from "./catalogo-evento.model";

export interface FormulaEventoModel{
    id?:string,
    codigo?:string,      
    estado?:CatalogoEstadoModel 
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    formula?:string,
    descripcion?:string,
    catalogoEvento?:CatalogoEventoModel
    prioridad?:number
}