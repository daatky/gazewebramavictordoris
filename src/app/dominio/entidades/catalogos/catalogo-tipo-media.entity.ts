import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoMediaEntity{
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?:string
}