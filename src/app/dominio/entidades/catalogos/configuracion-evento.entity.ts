import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoEventoEntity } from "./catalogo-evento.entity";
import { FormulaEventoEntity } from "./formula-evento.entity";

export interface ConfiguracionEventoEntity {
    _id?: string,
    codigo?: string,
    estado?: CatalogoEstadoEntity, // CatalogoEstado
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    intervalo?:number,
    duracion?:number,
    ciclico?:boolean
    catalogoEvento?:CatalogoEventoEntity,
    formulas?:Array<FormulaEventoEntity>    
}