import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoEventoEntity } from './catalogo-evento.entity';

export interface FormulaEventoEntity{
    _id?:string,
    codigo?:string,      
    estado?:CatalogoEstadoEntity 
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    formula?:string,
    descripcion?:string,
    catalogoEvento?:CatalogoEventoEntity
    prioridad?:number
}