import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoIdiomaModel{
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
    nombre?:string
    codNombre?:string
}
