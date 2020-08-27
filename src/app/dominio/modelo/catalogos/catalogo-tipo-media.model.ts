import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoMediaModel{
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
}