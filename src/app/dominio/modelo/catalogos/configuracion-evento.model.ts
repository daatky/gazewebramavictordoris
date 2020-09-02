import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { FormulaEventoModel } from "./formula-evento.model";
import { CatalogoEventoModel } from "./catalogo-evento.model";
export interface ConfiguracionEventoModel {
    id?: string,
    codigo?: string,
    estado?: CatalogoEstadoModel, // CatalogoEstado
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    intervalo?:number,
    duracion?:number,
    ciclico?:boolean
    catalogoEvento?:CatalogoEventoModel,
    formulas?:Array<FormulaEventoModel>    
}