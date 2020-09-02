import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoConfiguracionEntity{
    _id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
    nombre?:string
}