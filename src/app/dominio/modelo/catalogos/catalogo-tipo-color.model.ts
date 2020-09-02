import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoColorModel {
    id?:string,
    codigo?:string,
    estado?:CatalogoEstadoModel, // CatalogoEstado
    nombre?:string,
    formula?:string,
    fechaCreacion?:Date,
    fechaActualizacion?:Date
}