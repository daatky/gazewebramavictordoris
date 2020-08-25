import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoIdiomaEntity{
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
    nombre?:string
    codNombre?:string
}
