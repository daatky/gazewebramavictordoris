import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { FormulaEventoModel } from "./formula-evento.model";
import { ConfiguracionEventoModel } from "./configuracion-evento.model";

export interface CatalogoEventoModel{
    _id?:string,
    codigo?:string,   
    estado?:CatalogoEstadoModel //Catalogo estados
    fechaCreacion?:Date,
    fechaActualizacion?:Date,
    nombre?:string,
    configuraciones?:Array<ConfiguracionEventoModel>,
    formulas?:Array<FormulaEventoModel>
}