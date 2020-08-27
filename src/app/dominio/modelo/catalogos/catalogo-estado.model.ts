import { CatalogoEntidadModel } from "./catalogo-entidad.model";
import { CatalogoAccionModel } from "./catalogo-accion.model";

export interface CatalogoEstadoModel {
    id?: String
    codigo?: string
    nombre?: string
    entidad?: CatalogoEntidadModel
    accion?: CatalogoAccionModel
    descripcion?: string
    fechaCreacion?: Date
}