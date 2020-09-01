import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { ConfiguracionEventoEntity } from "./configuracion-evento.entity";
import { FormulaEventoEntity } from './formula-evento.entity';

export interface CatalogoEventoEntity{
    _id?:string,
    codigo?:string,   
    estado?:CatalogoEstadoEntity //Catalogo estados
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    nombre?:string,
    configuraciones?:Array<ConfiguracionEventoEntity>,
    formulas?:Array<FormulaEventoEntity>
}