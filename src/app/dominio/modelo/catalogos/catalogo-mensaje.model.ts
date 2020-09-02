import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoMensajeModel{
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
    codigoPostal?:string
}