import { CatalogoEntidadEntity } from "./catalogo-entidad.entity";
import { CatalogoAccionEntity } from "./catalogo-accion.entity";

export interface CatalogoEstadoEntity {
    id?: String
    codigo?: string
    nombre?: string
    entidad?: CatalogoEntidadEntity
    accion?: CatalogoAccionEntity
    descripcion?: string
    fechaCreacion?: Date
}